'use client'
import { useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useIsMobile } from '@/hooks/shared/useMediaQuery'
import {
  DEVICE_COOKIE, DEVICE_MOBILE, DEVICE_DESKTOP,
  SHELL_DESKTOP, SHELL_MWEB,
  DESKTOP_TO_MWEB, MWEB_TO_DESKTOP,
  MWEB_LANG_PARAM, ROUTE_MWEB_DASHBOARD,
} from '@/constants'
import { mwebHref, normalizeLocale, parseDesktopPath } from '@/lib/mwebNav'
import { routing } from '@/i18n/routing'

type ShellTarget = typeof SHELL_DESKTOP | typeof SHELL_MWEB

export default function ResponsiveGuard({ target }: { target: ShellTarget }) {
  const isMobile = useIsMobile()
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  useEffect(() => {
    document.cookie = `${DEVICE_COOKIE}=${isMobile ? DEVICE_MOBILE : DEVICE_DESKTOP}; path=/; max-age=31536000; samesite=lax`

    if (target === SHELL_DESKTOP && isMobile) {
      const { locale, bare } = parseDesktopPath(pathname, routing.locales)
      router.replace(mwebHref(DESKTOP_TO_MWEB[bare] ?? ROUTE_MWEB_DASHBOARD, locale))
    }

    if (target === SHELL_MWEB && !isMobile) {
      const locale = normalizeLocale(params.get(MWEB_LANG_PARAM))
      const dest = MWEB_TO_DESKTOP[pathname]
      if (dest) router.replace(`/${locale}${dest}`)
    }
  }, [isMobile, target, pathname, params, router])

  return null
}
