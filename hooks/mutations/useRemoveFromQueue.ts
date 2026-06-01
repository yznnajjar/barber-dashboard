import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queueApi } from '@/lib/api'
import { QUERY_KEY_QUEUE } from '@/constants'

export const useRemoveFromQueue = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => queueApi.cancel(id),
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY_QUEUE], data)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_QUEUE] })
    },
  })
}
