import { redirect } from 'next/navigation';

export default function DesktopLocalePage({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/dashboard`);
}
