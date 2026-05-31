import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY_SERVICES, MOCK_SALON_ID } from '@/constants'
import type { Service } from '@/types'

// Mock optimistic toggle of a service's active state.
export const useToggleService = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => new Promise<string>((res) => setTimeout(() => res(id), 200)),
    onSuccess: (id) => {
      queryClient.setQueryData<Service[]>([QUERY_KEY_SERVICES, MOCK_SALON_ID], (prev) =>
        prev?.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s)),
      )
    },
  })
}
