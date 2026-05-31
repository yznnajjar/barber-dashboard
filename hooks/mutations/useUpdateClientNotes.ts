import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY_CLIENTS, MOCK_SALON_ID } from '@/constants'
import type { Client } from '@/types'

export const useUpdateClientNotes = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: { id: string; notes: string }) =>
      new Promise<typeof input>((res) => setTimeout(() => res(input), 200)),
    onSuccess: ({ id, notes }) => {
      queryClient.setQueryData<Client[]>([QUERY_KEY_CLIENTS, MOCK_SALON_ID], (prev) =>
        prev?.map((c) => (c.id === id ? { ...c, notes } : c)),
      )
    },
  })
}
