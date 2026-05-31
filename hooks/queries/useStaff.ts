import { useQuery } from '@tanstack/react-query'
import { mockApi } from '@/lib/mockApi'
import { QUERY_KEY_STAFF } from '@/constants'

export const useStaff = (salonId: string) =>
  useQuery({
    queryKey: [QUERY_KEY_STAFF, salonId],
    queryFn: () => mockApi.getStaff(),
    enabled: !!salonId,
  })
