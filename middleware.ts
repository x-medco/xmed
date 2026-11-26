import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyHumanSession, HUMAN_COOKIE_NAME } from '@/lib/security/session';

// Known AI crawler and automated scraping User-Agents
const BLOCKED_USER_AGENTS = [
  'gptbot',
  'chatgpt-user',
  'oai-searchbot',
  'claudebot',
  'claude-user',
  'claude-searchbot',
  'perplexitybot',
  'google-extended',
  'bytespider',
  'ccbot',
  'diffbot',
  'facebookexternalhit',
  'meta-externalagent',
  'amazonbot',
  'cohere-ai',
  'applebot-extended',
  'scrapy',
  'wget',
  'python-requests',
  'aiohttp',
  'httpx',
  'httpclient',
  'go-http-client',
];

// Minimal exemptions strictly required for authentication & challenge rendering
const EXEMPT_PATHS = [
  '/verify',
  '/api/verify-human',
  '/robots.txt',
  '/manifest.json',
  '/manifest-mail.json',
  '/favicon.ico',
];

/**
 * Apply anti-indexing and security headers to any outgoing response
 */
function applySecurityHeaders(res: NextResponse): NextResponse {
  res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return res;
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();

  // ==========================================
  // 1. LAYER 1: BLOCK UNWANTED AI BOTS & SCRAPERS
  // ==========================================
  const isBlockedBot = BLOCKED_USER_AGENTS.some((bot) => userAgent.includes(bot));
  if (isBlockedBot) {
    return applySecurityHeaders(
      new NextResponse('Forbidden: Automated access prohibited.', { status: 403 })
    );
  }

  // ==========================================
  // 2. LAYER 2: EXEMPTIONS CHECK
  // ==========================================
  const isExempt = 
    EXEMPT_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`)) ||
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/_next/image');

  if (isExempt) {
    return applySecurityHeaders(NextResponse.next());
  }

  // ==========================================
  // 3. LAYER 3: SUBDOMAIN & ADMIN/MAIL ROUTING
  // (Always accessible to administrators via their own authentication)
  // ==========================================
  const isAdminSubdomain = hostname.startsWith('admin.x-med.pro') || hostname.startsWith('admin.localhost');
  const isMailSubdomain = hostname.startsWith('mail.x-med.pro') || hostname.startsWith('mail.localhost');

  // Allow admin and mail APIs through to their own handlers
  if (pathname.startsWith('/api/admin') || pathname.startsWith('/api/mail')) {
    return applySecurityHeaders(NextResponse.next());
  }

  // --- MAIL SUBDOMAIN ---
  if (isMailSubdomain) {
    if (pathname === '/manifest.json') {
      return applySecurityHeaders(NextResponse.rewrite(new URL('/manifest-mail.json', request.url)));
    }

    if (pathname.startsWith('/api') || pathname.includes('.')) {
      return applySecurityHeaders(NextResponse.next());
    }

    if (pathname === '/') {
      const adminAuth = request.cookies.get('admin_auth')?.value;
      if (adminAuth !== 'true') {
        return applySecurityHeaders(NextResponse.rewrite(new URL('/mail/login', request.url)));
      }
      return applySecurityHeaders(NextResponse.rewrite(new URL('/mail', request.url)));
    }

    if (pathname === '/login') {
      return applySecurityHeaders(NextResponse.rewrite(new URL('/mail/login', request.url)));
    }

    if (pathname.startsWith('/mail')) {
      if (pathname === '/mail/login') {
        return applySecurityHeaders(NextResponse.next());
      }
      const adminAuth = request.cookies.get('admin_auth')?.value;
      if (adminAuth !== 'true') {
        return applySecurityHeaders(NextResponse.redirect(new URL('/login', request.url)));
      }
      return applySecurityHeaders(NextResponse.next());
    }

    return applySecurityHeaders(NextResponse.redirect(new URL('/', request.url)));
  }

  // --- ADMIN SUBDOMAIN ---
  if (isAdminSubdomain) {
    if (pathname.startsWith('/api') || pathname.includes('.')) {
      return applySecurityHeaders(NextResponse.next());
    }

    if (pathname === '/') {
      const adminAuth = request.cookies.get('admin_auth')?.value;
      if (adminAuth !== 'true') {
        return applySecurityHeaders(NextResponse.rewrite(new URL('/admin/login', request.url)));
      }
      return applySecurityHeaders(NextResponse.rewrite(new URL('/admin', request.url)));
    }

    if (pathname === '/login') {
      return applySecurityHeaders(NextResponse.rewrite(new URL('/admin/login', request.url)));
    }

    if (pathname.startsWith('/admin')) {
      if (pathname === '/admin/login') {
        return applySecurityHeaders(NextResponse.next());
      }
      const adminAuth = request.cookies.get('admin_auth')?.value;
      if (adminAuth !== 'true') {
        return applySecurityHeaders(NextResponse.redirect(new URL('/login', request.url)));
      }
      return applySecurityHeaders(NextResponse.next());
    }

    return applySecurityHeaders(NextResponse.redirect(new URL('/', request.url)));
  }

  // --- MAIN DOMAIN DIRECT /admin PATH ---
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      return applySecurityHeaders(NextResponse.next());
    }
    const adminAuth = request.cookies.get('admin_auth')?.value;
    if (adminAuth !== 'true') {
      return applySecurityHeaders(NextResponse.redirect(new URL('/admin/login', request.url)));
    }
    return applySecurityHeaders(NextResponse.next());
  }

  // --- MAIN DOMAIN DIRECT /mail PATH ---
  if (pathname.startsWith('/mail')) {
    if (pathname === '/mail/login') {
      return applySecurityHeaders(NextResponse.next());
    }
    const adminAuth = request.cookies.get('admin_auth')?.value;
    if (adminAuth !== 'true') {
      return applySecurityHeaders(NextResponse.redirect(new URL('/mail/login', request.url)));
    }
    return applySecurityHeaders(NextResponse.next());
  }

  // ==========================================
  // 4. LAYER 4: HUMAN SESSION VERIFICATION
  // (Active when TURNSTILE_ENABLED is 'true' in environment)
  // ==========================================
  const isTurnstileEnabled = process.env.TURNSTILE_ENABLED === 'true';

  if (isTurnstileEnabled) {
    const humanToken = request.cookies.get(HUMAN_COOKIE_NAME)?.value;
    const isVerifiedHuman = await verifyHumanSession(humanToken);

    if (!isVerifiedHuman) {
      // If request is an API endpoint, reject with HTTP 403
      if (pathname.startsWith('/api')) {
        return applySecurityHeaders(
          NextResponse.json(
            { error: 'Human verification required' },
            { status: 403 }
          )
        );
      }

      // If request is a media asset or file, reject with HTTP 403
      if (pathname.startsWith('/images/') || pathname.endsWith('.png') || pathname.endsWith('.jpg') || pathname.endsWith('.webp') || pathname.endsWith('.pdf')) {
        return applySecurityHeaders(
          new NextResponse('Forbidden: Human verification required to access assets.', { status: 403 })
        );
      }

      // Normal storefront page request: redirect to minimal verification gate
      const targetUrl = encodeURIComponent(`${pathname}${search}`);
      const verifyUrl = new URL(`/verify?next=${targetUrl}`, request.url);
      return applySecurityHeaders(NextResponse.redirect(verifyUrl));
    }
  }

  // ==========================================
  // 5. MAINTENANCE MODE GUARD
  // ==========================================
  const isPublicPage = 
    !pathname.startsWith('/api') && 
    !pathname.includes('.') && 
    pathname !== '/maintenance';

  if (isPublicPage) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vhqzdmucrbcdubscyrpl.supabase.co';
      const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
      
      const restUrl = `${supabaseUrl}/rest/v1/site_settings?key=eq.maintenance_mode&select=value`;
      const res = await fetch(restUrl, {
        headers: {
          'apikey': anonKey,
          'Authorization': `Bearer ${anonKey}`
        },
        next: { revalidate: 15 }
      });

      if (res.ok) {
        const data = await res.json();
        const isMaintenance = data[0]?.value === 'true';

        if (isMaintenance) {
          const maintenanceUrl = new URL('/maintenance', request.url);
          return applySecurityHeaders(NextResponse.rewrite(maintenanceUrl));
        }
      }
    } catch (err) {
      console.error('Maintenance middleware check error:', err);
    }
  }

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static JS/CSS)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
