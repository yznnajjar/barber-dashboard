import { useQuery } from '@tanstack/react-query'
import { bookingsApi, type BookingFilters } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { QUERY_KEY_BOOKINGS } from '@/constants'

export type { BookingFilters }

export const useBookings = (
  date: string,
  view: 'day' | 'week' | 'month' = 'day',
  filters?: BookingFilters,
) => {
  const salonId = useAuthStore((s) => s.salonId)
  return useQuery({
    queryKey: [QUERY_KEY_BOOKINGS, salonId, date, view, filters],
    queryFn: () => bookingsApi.getCalendar(date, view, filters),
    enabled: !!salonId && !!date,
  })
}
