import type { Metadata } from 'next';
import StyledComponentsRegistry from './styled-components-registry';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: { template: '%s — Barber Dashboard', default: 'Barber Dashboard' },
  description: 'Manage your salon, staff, bookings, and live queue.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">{/* Default lang; overridden per-locale in desktop layout */}
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&family=Cairo:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
