import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bookingsApi } from '@/lib/api'
import { QUERY_KEY_BOOKINGS, QUERY_KEY_DASHBOARD_STATS } from '@/constants'

export const useCancelBooking = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (bookingId: string) => bookingsApi.cancel(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BOOKINGS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_DASHBOARD_STATS] })
    },
  })
}
