import { Suspense } from 'react'
import MwebIntlProvider from '@/components/layout/mweb/MwebIntlProvider'

/**
 * mweb lives OUTSIDE the desktop /[locale] tree (CLAUDE-code.md §13); locale is
 * carried as `?lang=`. App-Router layouts don't receive searchParams and can't
 * re-render on query change, so locale handling is delegated to a client
 * provider that reads `?lang=` and sets messages + <html dir/lang>.
 */
export default function MwebRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Suspense>
          <MwebIntlProvider>{children}</MwebIntlProvider>
        </Suspense>
      </body>
    </html>
  )
}
