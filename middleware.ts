import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'
import {
  DEVICE_COOKIE, DESKTOP_TO_MWEB, MWEB_TO_DESKTOP, ROUTE_MWEB,
  MWEB_LANG_PARAM, DEFAULT_LOCALE,
} from './constants'

const intlMiddleware = createMiddleware(routing)

function isMwebPath(pathname: string): boolean {
  return pathname === ROUTE_MWEB || pathname.startsWith(`${ROUTE_MWEB}/`)
}

// Desktop path -> { bareRoute, locale }. Desktop routes are /<locale>/<route>.
function splitDesktop(pathname: string): { locale: string; rest: string } {
  const seg = pathname.split('/').filter(Boolean)
  if (routing.locales.includes(seg[0] as never)) {
    return { locale: seg[0], rest: '/' + seg.slice(1).join('/') }
  }
  return { locale: routing.defaultLocale, rest: pathname }
}

export default function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl
  const device = req.cookies.get(DEVICE_COOKIE)?.value // 'mobile' | 'desktop' | undefined

  // ---- mweb branch: do NOT run next-intl here (locale is ?lang=, not a path) ----
  if (isMwebPath(pathname)) {
    if (device === 'desktop') {
      const dest = MWEB_TO_DESKTOP[pathname]
      if (dest) {
        const lang = searchParams.get(MWEB_LANG_PARAM) ?? DEFAULT_LOCALE
        const url = req.nextUrl.clone()
        url.pathname = `/${lang}${dest}`
        url.search = ''
        return NextResponse.redirect(url)
      }
    }
    return NextResponse.next()
  }

  // ---- desktop branch ----
  if (device === 'mobile') {
    const { locale, rest } = splitDesktop(pathname)
    const dest = rest === '/' ? ROUTE_MWEB : DESKTOP_TO_MWEB[rest]
    if (dest) {
      const url = req.nextUrl.clone()
      url.pathname = dest
      url.searchParams.set(MWEB_LANG_PARAM, locale)
      return NextResponse.redirect(url)
    }
  }

  return intlMiddleware(req)
}

export const config = {
  // Match everything except api, static assets, and files with an extension.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
