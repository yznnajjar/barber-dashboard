import { LOCALE_EN, LOCALE_AR, DEFAULT_LOCALE, MWEB_LANG_PARAM } from '@/constants'

export type AppLocale = typeof LOCALE_EN | typeof LOCALE_AR

const SUPPORTED: AppLocale[] = [LOCALE_EN, LOCALE_AR]

/** Narrow an arbitrary string to a supported locale, falling back to default. */
export function normalizeLocale(value: string | null | undefined): AppLocale {
  return SUPPORTED.includes(value as AppLocale) ? (value as AppLocale) : DEFAULT_LOCALE
}

/** Extract locale and bare route from a desktop path like /en/calendar → { locale: 'en', bare: '/calendar' } */
export function parseDesktopPath(pathname: string, locales: readonly string[]): { locale: string; bare: string } {
  const segs = pathname.split('/').filter(Boolean)
  const hasLocale = locales.includes(segs[0])
  return {
    locale: hasLocale ? segs[0] : DEFAULT_LOCALE,
    bare: '/' + (hasLocale ? segs.slice(1) : segs).join('/'),
  }
}

/** Build an mweb href that carries the locale as `?lang=`: /mweb/login?lang=en */
export function mwebHref(path: string, locale: string): string {
  const lang = normalizeLocale(locale)
  const sep = path.includes('?') ? '&' : '?'
  return `${path}${sep}${MWEB_LANG_PARAM}=${lang}`
}

/** Text direction for a locale. */
export function dirForLocale(locale: string): 'ltr' | 'rtl' {
  return normalizeLocale(locale) === LOCALE_AR ? 'rtl' : 'ltr'
}
