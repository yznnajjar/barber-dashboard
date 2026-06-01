import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bookingsApi } from '@/lib/api'
import { QUERY_KEY_BOOKINGS } from '@/constants'
import { applyReschedule } from '@/lib/utils'
import type { Booking } from '@/types'

interface RescheduleInput {
  id: string
  startAt: string // ISO datetime
}

export const useRescheduleBooking = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: RescheduleInput) =>
      bookingsApi.reschedule(input.id, input.startAt),

    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY_BOOKINGS] })
      const prev = queryClient.getQueriesData<Booking[]>({ queryKey: [QUERY_KEY_BOOKINGS] })
      queryClient.setQueriesData<Booking[]>(
        { queryKey: [QUERY_KEY_BOOKINGS] },
        (old) => old?.map((b) => b.id === input.id ? { ...b, ...applyReschedule(b, input.startAt) } : b),
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
    },
  })
}
