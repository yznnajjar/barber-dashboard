import { useQuery } from '@tanstack/react-query'
import { mockApi } from '@/lib/mockApi'
import { QUERY_KEY_BOOKINGS } from '@/constants'

export const useBookings = (salonId: string) =>
  useQuery({
    queryKey: [QUERY_KEY_BOOKINGS, salonId],
    queryFn: () => mockApi.getBookings(),
    enabled: !!salonId,
  })
