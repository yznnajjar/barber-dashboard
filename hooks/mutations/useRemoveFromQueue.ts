import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY_QUEUE, MOCK_SALON_ID } from '@/constants'
import type { QueueEntry } from '@/types'

// Removes a specific waiting entry and re-indexes positions.
export const useRemoveFromQueue = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => new Promise<string>((res) => setTimeout(() => res(id), 200)),
    onSuccess: (id) => {
      queryClient.setQueryData<QueueEntry[]>([QUERY_KEY_QUEUE, MOCK_SALON_ID], (prev) =>
        prev?.filter((e) => e.id !== id).map((e, i) => ({ ...e, position: i + 1 })),
      )
    },
  })
}
