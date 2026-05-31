import { useQuery } from '@tanstack/react-query'
import { mockApi } from '@/lib/mockApi'
import { QUERY_KEY_ANALYTICS } from '@/constants'
import type { AnalyticsPeriod } from '@/types'

export const useAnalytics = (salonId: string, period: AnalyticsPeriod) =>
  useQuery({
    queryKey: [QUERY_KEY_ANALYTICS, salonId, period],
    queryFn: () => mockApi.getAnalytics(period),
    enabled: !!salonId,
  })
