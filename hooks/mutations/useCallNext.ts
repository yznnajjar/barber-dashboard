import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY_QUEUE, MOCK_SALON_ID } from '@/constants'
import type { QueueEntry } from '@/types'

// Mock: pops the front of the queue and re-indexes positions, mimicking a
// `queue-updated` socket event. Live version: api.post(`/api/queue/${id}/call-next`)
export const useCallNext = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => new Promise<void>((res) => setTimeout(res, 250)),
    onSuccess: () => {
      queryClient.setQueryData<QueueEntry[]>([QUERY_KEY_QUEUE, MOCK_SALON_ID], (prev) => {
        if (!prev || prev.length === 0) return prev
        return prev
          .slice(1)
          .map((e, i) => ({ ...e, position: i + 1, estimatedWait: i * 18 }))
      })
    },
  })
}
