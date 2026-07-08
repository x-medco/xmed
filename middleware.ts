import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. ADMIN PANEL ROUTE PROTECTION
  if (pathname.startsWith('/admin')) {
    // Allow admin login page and API calls
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    const adminAuth = request.cookies.get('admin_auth')?.value;
    if (adminAuth !== 'true') {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 2. MAINTENANCE MODE GUARD FOR PUBLIC PAGES
  // Ignore API routes, Next.js internal files, assets, static assets, and admin console
  const isPublicPage = 
    !pathname.startsWith('/api') && 
    !pathname.startsWith('/_next') && 
    !pathname.startsWith('/admin') &&
    !pathname.includes('.') && // ignore file requests (.png, .jpg, .ico, etc)
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
          // Rewrite internally to the maintenance screen without changing the URL
          const maintenanceUrl = new URL('/maintenance', request.url);
          return NextResponse.rewrite(maintenanceUrl);
        }
      }
    } catch (err) {
      console.error("Maintenance middleware check failed:", err);
      // Fail-open: keep site active if check fails
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
