import { useQuery } from '@tanstack/react-query'
import { mockApi } from '@/lib/mockApi'
import { QUERY_KEY_DASHBOARD_STATS } from '@/constants'

export const useActivity = (salonId: string) =>
  useQuery({
    queryKey: [QUERY_KEY_DASHBOARD_STATS, 'activity', salonId],
    queryFn: () => mockApi.getActivity(),
    enabled: !!salonId,
  })
