import { useQuery } from '@tanstack/react-query'
import { bookingsApi } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { QUERY_KEY_BOOKINGS } from '@/constants'

export const useBookings = (date: string, view: 'day' | 'week' = 'day') => {
  const salonId = useAuthStore((s) => s.salonId)
  return useQuery({
    queryKey: [QUERY_KEY_BOOKINGS, salonId, date, view],
    queryFn: () => bookingsApi.getCalendar(date, view),
    enabled: !!salonId && !!date,
  })
}
