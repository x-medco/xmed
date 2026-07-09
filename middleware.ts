import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Define admin subdomain conditions (supports localhost for local testing)
  const isAdminSubdomain = hostname.startsWith('admin.x-med.co') || hostname.startsWith('admin.localhost:3000');
  
  // Define mail subdomain conditions
  const isMailSubdomain = hostname.startsWith('mail.x-med.co') || hostname.startsWith('mail.localhost:3000');

  // ==========================================
  // A. MAIL SUBDOMAIN ROUTING CONTROL
  // ==========================================
  if (isMailSubdomain) {
    // Route manifest request for mail subdomain to correct manifest config
    if (pathname === '/manifest.json') {
      return NextResponse.rewrite(new URL('/manifest-mail.json', request.url));
    }

    // Allow static files, assets, images and API routes to load normally
    const isAssetOrApi = 
      pathname.startsWith('/api') || 
      pathname.startsWith('/_next') || 
      pathname.includes('.');
      
    if (isAssetOrApi) {
      return NextResponse.next();
    }

    // Root mapping (mail.x-med.co/)
    if (pathname === '/') {
      const adminAuth = request.cookies.get('admin_auth')?.value;
      if (adminAuth !== 'true') {
        // Rewrite to login page internally to keep clean subdomain URL structure
        return NextResponse.rewrite(new URL('/mail/login', request.url));
      }
      return NextResponse.rewrite(new URL('/mail', request.url));
    }

    // Login page mapping (mail.x-med.co/login)
    if (pathname === '/login') {
      return NextResponse.rewrite(new URL('/mail/login', request.url));
    }

    // Handle standard /mail paths, enforcing auth rules
    if (pathname.startsWith('/mail')) {
      if (pathname === '/mail/login') {
        return NextResponse.next();
      }
      const adminAuth = request.cookies.get('admin_auth')?.value;
      if (adminAuth !== 'true') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      return NextResponse.next();
    }

    // Strict isolation: Block access to customer storefront pages on mail subdomain
    return NextResponse.redirect(new URL('/', request.url));
  }

  // ==========================================
  // B. ADMIN SUBDOMAIN ROUTING CONTROL
  // ==========================================
  if (isAdminSubdomain) {
    // Allow static files, assets, images and API routes to load normally
    const isAssetOrApi = 
      pathname.startsWith('/api') || 
      pathname.startsWith('/_next') || 
      pathname.includes('.');
      
    if (isAssetOrApi) {
      return NextResponse.next();
    }

    // Root mapping (admin.x-med.co/)
    if (pathname === '/') {
      const adminAuth = request.cookies.get('admin_auth')?.value;
      if (adminAuth !== 'true') {
        // Rewrite to login page internally to keep clean subdomain URL structure
        return NextResponse.rewrite(new URL('/admin/login', request.url));
      }
      return NextResponse.rewrite(new URL('/admin', request.url));
    }

    // Login page mapping (admin.x-med.co/login)
    if (pathname === '/login') {
      return NextResponse.rewrite(new URL('/admin/login', request.url));
    }

    // Handle standard /admin paths, enforcing auth rules
    if (pathname.startsWith('/admin')) {
      if (pathname === '/admin/login') {
        return NextResponse.next();
      }
      const adminAuth = request.cookies.get('admin_auth')?.value;
      if (adminAuth !== 'true') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      return NextResponse.next();
    }

    // Strict isolation: Block access to customer storefront pages on admin subdomain
    // Redirect customer pages (like /products, /cart, /checkout) back to dashboard root
    return NextResponse.redirect(new URL('/', request.url));
  }

  // ==========================================
  // C. MAIN STOREFRONT DOMAIN ROUTING CONTROL
  // ==========================================
  
  // Enforce redirection from /mail subpaths to the dedicated mail subdomain
  if (pathname.startsWith('/mail')) {
    const protocol = request.nextUrl.protocol;
    const targetSubdomain = hostname.startsWith('localhost:3000') 
      ? 'mail.localhost:3000' 
      : 'mail.x-med.co';
      
    return NextResponse.redirect(`${protocol}//${targetSubdomain}/login`);
  }

  // Enforce redirection from /admin subpaths to the dedicated admin subdomain
  if (pathname.startsWith('/admin')) {
    const protocol = request.nextUrl.protocol;
    const targetSubdomain = hostname.startsWith('localhost:3000') 
      ? 'admin.localhost:3000' 
      : 'admin.x-med.co';
      
    return NextResponse.redirect(`${protocol}//${targetSubdomain}/login`);
  }

  // MAINTENANCE MODE GUARD FOR PUBLIC PAGES
  const isPublicPage = 
    !pathname.startsWith('/api') && 
    !pathname.startsWith('/_next') && 
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
        next: { revalidate: 15 } // Cache check for 15 seconds to avoid DB pounding
      });

      if (res.ok) {
        const data = await res.json();
        const isMaintenance = data[0]?.value === 'true';

        if (isMaintenance) {
          const maintenanceUrl = new URL('/maintenance', request.url);
          return NextResponse.rewrite(maintenanceUrl);
        }
      }
    } catch (err) {
      console.error("Maintenance middleware check failed:", err);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
