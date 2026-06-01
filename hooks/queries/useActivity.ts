import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { QUERY_KEY_DASHBOARD_STATS } from '@/constants'

export const useActivity = () => {
  const salonId = useAuthStore((s) => s.salonId)
  return useQuery({
    queryKey: [QUERY_KEY_DASHBOARD_STATS, 'activity', salonId],
    queryFn: () => dashboardApi.getOverview().then((r) => r.activity),
    enabled: !!salonId,
  })
}
