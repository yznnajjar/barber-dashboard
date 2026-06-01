import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bookingsApi } from '@/lib/api'
import { QUERY_KEY_BOOKINGS, QUERY_KEY_DASHBOARD_STATS } from '@/constants'
import type { Booking, BookingStatus } from '@/types'

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: BookingStatus }) =>
      bookingsApi.updateStatus(id, status),

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY_BOOKINGS] })
      const prev = queryClient.getQueriesData<Booking[]>({ queryKey: [QUERY_KEY_BOOKINGS] })

      queryClient.setQueriesData<Booking[]>(
        { queryKey: [QUERY_KEY_BOOKINGS] },
        (old) => old?.map((b) => (b.id === id ? { ...b, status } : b)),
      )
      return { prev }
    },

    onError: (_err, _input, context) => {
      if (context?.prev) {
        for (const [key, data] of context.prev) {
          if (data !== undefined) queryClient.setQueryData(key, data)
        }
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BOOKINGS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_DASHBOARD_STATS] })
    },
  })
}
