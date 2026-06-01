import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bookingsApi } from '@/lib/api'
import { QUERY_KEY_BOOKINGS, QUERY_KEY_DASHBOARD_STATS } from '@/constants'

export const useCancelBooking = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      bookingsApi.cancel(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BOOKINGS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_DASHBOARD_STATS] })
    },
  })
}
