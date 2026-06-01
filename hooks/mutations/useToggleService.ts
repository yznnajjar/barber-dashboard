import { useMutation, useQueryClient } from '@tanstack/react-query'
import { servicesApi } from '@/lib/api'
import { QUERY_KEY_SERVICES } from '@/constants'
import type { Service } from '@/types'

export const useToggleService = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      return servicesApi.update(id, { isActive })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_SERVICES] })
    },
  })
}
