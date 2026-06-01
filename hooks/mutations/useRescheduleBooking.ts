import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bookingsApi } from '@/lib/api'
import { QUERY_KEY_BOOKINGS } from '@/constants'

interface RescheduleInput {
  id: string
  startAt: string // ISO datetime
}

export const useRescheduleBooking = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: RescheduleInput) =>
      bookingsApi.reschedule(input.id, input.startAt),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BOOKINGS] })
    },
  })
}
