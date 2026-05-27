import { NextRequest, NextResponse } from 'next/server';

const MOBILE_REGEX = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
const DEFAULT_LOCALE = 'en' as const;
const MWEB_DASHBOARD = '/mweb/dashboard' as const;
const DESKTOP_DASHBOARD = '/dashboard' as const;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/icons') ||
    pathname.endsWith('.json') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.png')
  ) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith('/mweb') ||
    pathname.startsWith('/login') ||
    /^\/[a-z]{2}(\/|$)/.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === '/') {
    const ua = request.headers.get('user-agent') || '';
    const isMobile = MOBILE_REGEX.test(ua);
    if (isMobile) {
      return NextResponse.redirect(new URL(MWEB_DASHBOARD, request.url));
    }
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${DESKTOP_DASHBOARD}`, request.url));
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|icons|manifest\\.json|sw\\.js|offline\\.html|favicon\\.ico).*)'],
};
