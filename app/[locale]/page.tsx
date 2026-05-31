import { redirect } from '@/i18n/routing'
import { ROUTE_DASHBOARD } from '@/constants'

export default async function LocaleIndex({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  redirect({ href: ROUTE_DASHBOARD, locale })
}
