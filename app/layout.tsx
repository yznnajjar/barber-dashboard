import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Barber — Salon Owner Dashboard',
  description: 'Manage bookings, queue, staff and revenue for your salon.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Barber',
  },
}

export const viewport: Viewport = {
  themeColor: '#060911',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

// Root layout is a thin pass-through; the real <html> lives in [locale]/layout.tsx
// so we can set lang/dir per locale.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
