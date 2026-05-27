import type { Metadata, Viewport } from 'next';

export const dynamic = 'force-dynamic';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  userScalable: false,
};

export const metadata: Metadata = {
  title: { template: '%s — Barber', default: 'Barber' },
  description: 'Salon management on the go.',
  manifest: '/mweb/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Barber',
  },
};

export default function MwebLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
