import { useQuery } from '@tanstack/react-query'
import { clientsApi } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { QUERY_KEY_CLIENTS } from '@/constants'

export const useClients = (page = 1, limit = 20, search?: string) => {
  const salonId = useAuthStore((s) => s.salonId)
  return useQuery({
    queryKey: [QUERY_KEY_CLIENTS, salonId, page, limit, search],
    queryFn: () => clientsApi.list(page, limit, search),
    enabled: !!salonId,
  })
}
