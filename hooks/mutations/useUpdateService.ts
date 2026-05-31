import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY_SERVICES, MOCK_SALON_ID } from '@/constants'
import type { Service } from '@/types'

export const useUpdateService = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: Service) =>
      new Promise<Service>((res) => setTimeout(() => res(input), 250)),
    onSuccess: (service) => {
      queryClient.setQueryData<Service[]>([QUERY_KEY_SERVICES, MOCK_SALON_ID], (prev) =>
        prev?.map((s) => (s.id === service.id ? service : s)),
      )
    },
  })
}
