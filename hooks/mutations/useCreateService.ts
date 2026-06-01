import { useMutation, useQueryClient } from '@tanstack/react-query'
import { servicesApi } from '@/lib/api'
import { serviceToCreateInput } from '@/lib/transform'
import { QUERY_KEY_SERVICES } from '@/constants'
import type { Service } from '@/types'

export type ServiceInput = Omit<Service, 'id'>

export const useCreateService = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: ServiceInput) => servicesApi.create(serviceToCreateInput(input)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_SERVICES] })
    },
  })
}
