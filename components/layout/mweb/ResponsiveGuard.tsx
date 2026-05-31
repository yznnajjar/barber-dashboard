'use client'
import { useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useIsMobile } from '@/hooks/shared/useMediaQuery'
import {
  DEVICE_COOKIE, DESKTOP_TO_MWEB, MWEB_TO_DESKTOP, MWEB_LANG_PARAM, DEFAULT_LOCALE,
} from '@/constants'
import { mwebHref, normalizeLocale } from '@/lib/mwebNav'
import { routing } from '@/i18n/routing'

/**
 * Keeps viewport and route family in sync across the two URL shapes:
 *   desktop  ->  /<locale>/<route>          (next-intl path locale)
 *   mweb     ->  /mweb/<route>?lang=<locale> (query-param locale)
 *
 * - target="desktop": dropped in the desktop shell. A phone viewport gets sent
 *   to the matching /mweb route, carrying the locale into ?lang=.
 * - target="mweb": dropped in the mweb shell. A desktop viewport gets sent to
 *   the matching /<locale>/<route>.
 *
 * Also writes the device cookie so middleware can fix the FIRST request.
 */
export default function ResponsiveGuard({ target }: { target: 'mweb' | 'desktop' }) {
  const isMobile = useIsMobile()
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  useEffect(() => {
    document.cookie = `${DEVICE_COOKIE}=${isMobile ? 'mobile' : 'desktop'}; path=/; max-age=31536000; samesite=lax`

    if (target === 'desktop' && isMobile) {
      // strip leading /<locale> to get the bare desktop route + remember locale
      const seg = pathname.split('/').filter(Boolean)
      const hasLocale = routing.locales.includes(seg[0] as never)
      const locale = hasLocale ? seg[0] : DEFAULT_LOCALE
      const bare = '/' + (hasLocale ? seg.slice(1) : seg).join('/')
      const dest = DESKTOP_TO_MWEB[bare]
      if (dest) router.replace(mwebHref(dest, locale))
    } else if (target === 'mweb' && !isMobile) {
      const locale = normalizeLocale(params.get(MWEB_LANG_PARAM))
      const dest = MWEB_TO_DESKTOP[pathname]
      if (dest) router.replace(`/${locale}${dest}`)
    }
  }, [isMobile, target, pathname, params, router])

  return null
}
