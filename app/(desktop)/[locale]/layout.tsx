import type { Metadata } from 'next';
import { BRAND } from '@/constants/text';
import { SUPPORTED_LOCALES, direction } from '@/constants/locale';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: { template: `%s — ${BRAND.NAME}`, default: BRAND.NAME },
  description: BRAND.TAGLINE,
};

export default function DesktopLocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <div dir={direction(params.locale)} lang={params.locale}>
      {children}
    </div>
  );
}
