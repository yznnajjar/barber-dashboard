import { useQuery } from '@tanstack/react-query'
import { mockApi } from '@/lib/mockApi'
import { QUERY_KEY_CLIENTS } from '@/constants'

export const useClients = (salonId: string) =>
  useQuery({
    queryKey: [QUERY_KEY_CLIENTS, salonId],
    queryFn: () => mockApi.getClients(),
    enabled: !!salonId,
  })
