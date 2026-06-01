import { useMutation, useQueryClient } from '@tanstack/react-query'
import { clientsApi } from '@/lib/api'
import { QUERY_KEY_CLIENTS } from '@/constants'

export const useUpdateClientNotes = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: { id: string; notes: string }) =>
      clientsApi.update(input.id, { notes: input.notes }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CLIENTS] })
    },
  })
}
