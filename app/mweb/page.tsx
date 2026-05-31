import { redirect } from 'next/navigation'
import { ROUTE_MWEB_DASHBOARD } from '@/constants'
import { mwebHref, normalizeLocale } from '@/lib/mwebNav'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const { lang } = await searchParams
  redirect(mwebHref(ROUTE_MWEB_DASHBOARD, normalizeLocale(lang)))
}
