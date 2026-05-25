import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import '../globals.css'

export default function App({ Component, pageProps }: AppProps) {
  // Register service worker
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => console.log('[SW] Registered:', reg.scope))
          .catch((err) => console.log('[SW] Failed:', err))
      })
    }
  }, [])

  return (
    <>
      <Head>
        {/* ── Core ── */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>BarberApp — Salon Dashboard</title>
        <meta name="description" content="Manage your salon bookings, walk-in queue, staff and analytics" />

        {/* ── PWA ── */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1A1A18" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="BarberApp" />

        {/* ── Apple / iOS ── */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="BarberApp" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />

        {/* ── Icons ── */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-72x72.png" />
        <link rel="shortcut icon" href="/icons/icon-192x192.png" />

        {/* ── Windows / Microsoft ── */}
        <meta name="msapplication-TileColor" content="#1A1A18" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* ── OG / Social ── */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BarberApp — Salon Dashboard" />
        <meta property="og:description" content="Manage your salon from anywhere" />
        <meta property="og:image" content="/icons/icon-512x512.png" />

        {/* ── Splash screens for iOS (key sizes) ── */}
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)"
          href="/splash/iphone14.png"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
