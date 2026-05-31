import { useQuery } from '@tanstack/react-query'
import { mockApi } from '@/lib/mockApi'
import { QUERY_KEY_QUEUE, STALE_TIME_QUEUE } from '@/constants'

// Initial load via React Query; in production Socket.io `queue-updated` takes over
// after mount (CLAUDE-code.md §7). The Call-Next mutation simulates live updates here.
export const useQueue = (salonId: string) =>
  useQuery({
    queryKey: [QUERY_KEY_QUEUE, salonId],
    queryFn: () => mockApi.getQueue(),
    enabled: !!salonId,
    staleTime: STALE_TIME_QUEUE,
  })
