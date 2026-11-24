/**
 * Edge-compatible Web Crypto session management for X-Med human verification.
 * Runs in both Next.js Edge Middleware and Node.js server environments.
 */

export const HUMAN_COOKIE_NAME = 'xmed_human_token';
export const DEFAULT_SESSION_DURATION = 3600; // 60 minutes in seconds

const DEFAULT_DEV_SECRET = 'x-med-turnstile-secret-session-key-dev-environment-secure-token-64b';

function getSessionSecret(): string {
  return process.env.SESSION_SECRET || DEFAULT_DEV_SECRET;
}

/**
 * Convert string or buffer to ArrayBuffer
 */
function stringToArrayBuffer(str: string): BufferSource {
  return new TextEncoder().encode(str) as unknown as BufferSource;
}

/**
 * Convert ArrayBuffer to Hex string
 */
function bufferToHex(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Import the secret key into Web Crypto HMAC-SHA256
 */
async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const keyData = stringToArrayBuffer(secret);
  return crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/**
 * Sign a human session and return a tamper-proof session token.
 * Format: <issuedAt>.<expiresAt>.<nonce>.<signatureHex>
 */
export async function signHumanSession(durationSeconds: number = DEFAULT_SESSION_DURATION): Promise<string> {
  const secret = getSessionSecret();
  const key = await getCryptoKey(secret);

  const now = Date.now();
  const expiresAt = now + durationSeconds * 1000;
  
  // Generate random 16-byte nonce
  const nonceBytes = new Uint8Array(16);
  crypto.getRandomValues(nonceBytes);
  const nonce = bufferToHex(nonceBytes);

  const payload = `${now}.${expiresAt}.${nonce}`;
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    stringToArrayBuffer(payload)
  );
  const signature = bufferToHex(signatureBuffer);

  return `${payload}.${signature}`;
}

/**
 * Verify an incoming session token.
 * Returns true if the token is authentic, unexpired, and tamper-free.
 */
export async function verifyHumanSession(token: string | undefined | null): Promise<boolean> {
  if (!token || typeof token !== 'string') {
    return false;
  }

  const parts = token.split('.');
  if (parts.length !== 4) {
    return false;
  }

  const [issuedAtStr, expiresAtStr, nonce, signature] = parts;
  const issuedAt = parseInt(issuedAtStr, 10);
  const expiresAt = parseInt(expiresAtStr, 10);

  if (isNaN(issuedAt) || isNaN(expiresAt)) {
    return false;
  }

  const now = Date.now();

  // Check expiration
  if (now > expiresAt) {
    return false;
  }

  // Sanity check: allow up to 1 minute clock skew into future
  if (issuedAt > now + 60000) {
    return false;
  }

  try {
    const secret = getSessionSecret();
    const key = await getCryptoKey(secret);
    const payload = `${issuedAtStr}.${expiresAtStr}.${nonce}`;

    const expectedSigBuffer = await crypto.subtle.sign(
      'HMAC',
      key,
      stringToArrayBuffer(payload)
    );
    const expectedSig = bufferToHex(expectedSigBuffer);

    // Constant-time comparison to prevent timing attacks
    if (signature.length !== expectedSig.length) {
      return false;
    }

    let mismatch = 0;
    for (let i = 0; i < signature.length; i++) {
      mismatch |= signature.charCodeAt(i) ^ expectedSig.charCodeAt(i);
    }

    return mismatch === 0;
  } catch (err) {
    console.error('Session verification error:', err);
    return false;
  }
}

/**
 * Standard cookie configuration for the human verification session
 */
export function getHumanSessionCookieOptions(durationSeconds: number = DEFAULT_SESSION_DURATION) {
  return {
    name: HUMAN_COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: durationSeconds,
  };
}
