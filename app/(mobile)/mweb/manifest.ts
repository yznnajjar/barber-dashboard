import type { MetadataRoute } from 'next';
import { COLORS } from '@/design-system';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Barber Dashboard',
    short_name: 'Barber',
    description: 'Manage your salon, staff, bookings, and live queue.',
    start_url: '/mweb/dashboard',
    display: 'standalone',
    orientation: 'portrait',
    background_color: COLORS.BG,
    theme_color: COLORS.PRIMARY,
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
