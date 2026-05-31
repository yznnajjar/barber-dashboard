'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { MWEB_LANG_PARAM } from '@/constants'
import { mwebHref, normalizeLocale, type AppLocale } from '@/lib/mwebNav'

/**
 * mweb navigation that keeps the `?lang=` param sticky.
 * Use INSTEAD of next-intl's router inside the mweb tree (mweb is outside the
 * /[locale] segment, so next-intl navigation doesn't apply here).
 */
export function useMwebRouter() {
  const router = useRouter()
  const params = useSearchParams()
  const locale = normalizeLocale(params.get(MWEB_LANG_PARAM))

  const push = useCallback((path: string) => router.push(mwebHref(path, locale)), [router, locale])
  const replace = useCallback((path: string) => router.replace(mwebHref(path, locale)), [router, locale])
  const switchLocale = useCallback(
    (next: AppLocale, currentPath: string) => router.replace(mwebHref(currentPath, next)),
    [router],
  )

  return { locale, push, replace, switchLocale }
}
