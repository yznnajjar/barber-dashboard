import { useQuery } from '@tanstack/react-query'
import { analyticsApi } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { QUERY_KEY_ANALYTICS } from '@/constants'
import type { AnalyticsPeriod } from '@/types'

export const useAnalytics = (period: AnalyticsPeriod = 'week') => {
  const salonId = useAuthStore((s) => s.salonId)
  return useQuery({
    queryKey: [QUERY_KEY_ANALYTICS, salonId, period],
    queryFn: () => analyticsApi.get(period),
    enabled: !!salonId,
  })
}
