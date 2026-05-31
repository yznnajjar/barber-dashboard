import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY_SERVICES, MOCK_SALON_ID } from '@/constants'
import type { Service } from '@/types'

export type ServiceInput = Omit<Service, 'id'>

export const useCreateService = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: ServiceInput) =>
      new Promise<Service>((res) => setTimeout(() => res({ ...input, id: `svc_${Date.now()}` }), 250)),
    onSuccess: (service) => {
      queryClient.setQueryData<Service[]>([QUERY_KEY_SERVICES, MOCK_SALON_ID], (prev) =>
        prev ? [...prev, service] : [service],
      )
    },
  })
}
