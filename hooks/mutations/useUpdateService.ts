import { useMutation, useQueryClient } from '@tanstack/react-query'
import { servicesApi } from '@/lib/api'
import { serviceToCreateInput } from '@/lib/transform'
import { QUERY_KEY_SERVICES } from '@/constants'
import type { Service } from '@/types'

export const useUpdateService = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: Service) => servicesApi.update(input.id, serviceToCreateInput(input)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_SERVICES] })
    },
  })
}
