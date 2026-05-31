import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY_SERVICES, MOCK_SALON_ID } from '@/constants'
import type { Service } from '@/types'

export const useDeleteService = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => new Promise<string>((res) => setTimeout(() => res(id), 250)),
    onSuccess: (id) => {
      queryClient.setQueryData<Service[]>([QUERY_KEY_SERVICES, MOCK_SALON_ID], (prev) =>
        prev?.filter((s) => s.id !== id),
      )
    },
  })
}
