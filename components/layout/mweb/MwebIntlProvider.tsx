'use client'
import { useEffect } from 'react'
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { MWEB_LANG_PARAM } from '@/constants'
import { normalizeLocale, dirForLocale } from '@/lib/mwebNav'
import Providers from '@/components/providers/Providers'
import enMessages from '@/translations/en.json'
import arMessages from '@/translations/ar.json'

const MESSAGES: Record<string, AbstractIntlMessages> = {
  en: enMessages as AbstractIntlMessages,
  ar: arMessages as AbstractIntlMessages,
}

export default function MwebIntlProvider({ children }: { children: React.ReactNode }) {
  const params = useSearchParams()
  const locale = normalizeLocale(params.get(MWEB_LANG_PARAM))
  const dir = dirForLocale(locale)

  // Keep <html lang/dir> in sync with ?lang= (layout's <html> renders statically).
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = dir
  }, [locale, dir])

  return (
    <NextIntlClientProvider locale={locale} messages={MESSAGES[locale]}>
      <Providers dir={dir}>{children}</Providers>
    </NextIntlClientProvider>
  )
}
