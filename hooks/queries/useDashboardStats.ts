import { useQuery } from '@tanstack/react-query'
import { mockApi } from '@/lib/mockApi'
import { QUERY_KEY_DASHBOARD_STATS, STALE_TIME_STATS } from '@/constants'

export const useDashboardStats = (salonId: string) =>
  useQuery({
    queryKey: [QUERY_KEY_DASHBOARD_STATS, salonId],
    queryFn: () => mockApi.getDashboardStats(),
    enabled: !!salonId,
    staleTime: STALE_TIME_STATS,
  })
