import { useMutation, useQueryClient } from '@tanstack/react-query'
import { servicesApi } from '@/lib/api'
import { QUERY_KEY_SERVICES } from '@/constants'

export const useDeleteService = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => servicesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_SERVICES] })
    },
  })
}
