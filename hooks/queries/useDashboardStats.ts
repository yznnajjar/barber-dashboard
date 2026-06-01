import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { QUERY_KEY_DASHBOARD_STATS, STALE_TIME_STATS } from '@/constants'

export const useDashboardStats = () => {
  const salonId = useAuthStore((s) => s.salonId)
  return useQuery({
    queryKey: [QUERY_KEY_DASHBOARD_STATS, salonId],
    queryFn: () => dashboardApi.getOverview().then((r) => r.stats),
    enabled: !!salonId,
    staleTime: STALE_TIME_STATS,
  })
}
