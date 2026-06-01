import { useQuery } from '@tanstack/react-query'
import { queueApi } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { QUERY_KEY_QUEUE, STALE_TIME_QUEUE } from '@/constants'

export const useQueue = () => {
  const salonId = useAuthStore((s) => s.salonId)
  return useQuery({
    queryKey: [QUERY_KEY_QUEUE, salonId],
    queryFn: () => queueApi.get(),
    enabled: !!salonId,
    staleTime: STALE_TIME_QUEUE,
  })
}
