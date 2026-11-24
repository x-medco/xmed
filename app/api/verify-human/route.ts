import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { signHumanSession, getHumanSessionCookieOptions, DEFAULT_SESSION_DURATION } from '@/lib/security/session';

// Official Cloudflare Turnstile always-pass test secret key as fallback for dev
const CLOUDFLARE_SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const DEFAULT_TEST_SECRET_KEY = '1x0000000000000000000000000000000AA';

// Simple in-memory rate limiting map for this endpoint: IP -> { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string, limit = 20, windowMs = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (record.count >= limit) {
    return true;
  }

  record.count += 1;
  return false;
}

/**
 * Sanitize destination URL to prevent open redirect vulnerabilities
 */
function sanitizeRedirectUrl(urlStr?: string | null): string {
  if (!urlStr || typeof urlStr !== 'string') {
    return '/';
  }

  // Must begin with a single slash, not double slash (//evil.com) and cannot contain scheme (http:)
  if (urlStr.startsWith('/') && !urlStr.startsWith('//') && !urlStr.includes(':')) {
    // Avoid redirect loops back to verify
    if (urlStr.startsWith('/verify')) {
      return '/';
    }
    return urlStr;
  }

  return '/';
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
               request.headers.get('cf-connecting-ip') ||
               '127.0.0.1';

    // Rate limit: max 20 attempts per minute per IP
    if (isRateLimited(ip, 20, 60000)) {
      return NextResponse.json(
        { success: false, error: 'Too many verification attempts. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || !body.token || typeof body.token !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Verification token is required.' },
        { status: 400 }
      );
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY || DEFAULT_TEST_SECRET_KEY;

    // Send verification request to Cloudflare Turnstile
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', body.token);
    if (ip && ip !== '127.0.0.1') {
      formData.append('remoteip', ip);
    }

    const cfResponse = await fetch(CLOUDFLARE_SITEVERIFY_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!cfResponse.ok) {
      console.error('Cloudflare Turnstile HTTP error:', cfResponse.status, cfResponse.statusText);
      return NextResponse.json(
        { success: false, error: 'Failed to contact verification service.' },
        { status: 502 }
      );
    }

    const cfResult = await cfResponse.json();

    if (!cfResult.success) {
      console.warn('Turnstile verification rejected:', cfResult['error-codes']);
      return NextResponse.json(
        {
          success: false,
          error: 'Turnstile verification failed. Please try again.',
          codes: cfResult['error-codes'],
        },
        { status: 400 }
      );
    }

    // Verification succeeded: Issue signed HMAC-SHA256 session token
    const durationSeconds = parseInt(
      process.env.SESSION_DURATION_SECONDS || String(DEFAULT_SESSION_DURATION),
      10
    );
    const sessionToken = await signHumanSession(durationSeconds);
    const safeRedirect = sanitizeRedirectUrl(body.next);

    const cookieOptions = getHumanSessionCookieOptions(durationSeconds);

    const response = NextResponse.json({
      success: true,
      redirect: safeRedirect,
    });

    response.cookies.set({
      name: cookieOptions.name,
      value: sessionToken,
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      path: cookieOptions.path,
      maxAge: cookieOptions.maxAge,
    });

    return response;
  } catch (error) {
    console.error('Verify human handler unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected security verification error occurred.' },
      { status: 500 }
    );
  }
}
