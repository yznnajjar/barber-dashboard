import { useQuery } from '@tanstack/react-query'
import { mockApi } from '@/lib/mockApi'
import { QUERY_KEY_SERVICES } from '@/constants'

export const useServices = (salonId: string) =>
  useQuery({
    queryKey: [QUERY_KEY_SERVICES, salonId],
    queryFn: () => mockApi.getServices(),
    enabled: !!salonId,
  })
