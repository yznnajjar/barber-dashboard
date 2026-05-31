import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY_BOOKINGS, MOCK_SALON_ID, BOOKING_STATUS_CANCELLED } from '@/constants'
import type { Booking } from '@/types'

// Mock: marks the booking CANCELLED in the cache. Live: api.patch(`/api/bookings/${id}/cancel`)
export const useCancelBooking = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (bookingId: string) =>
      new Promise<string>((res) => setTimeout(() => res(bookingId), 250)),
    onSuccess: (bookingId) => {
      queryClient.setQueryData<Booking[]>([QUERY_KEY_BOOKINGS, MOCK_SALON_ID], (prev) =>
        prev?.map((b) => (b.id === bookingId ? { ...b, status: BOOKING_STATUS_CANCELLED as Booking['status'] } : b)),
      )
    },
  })
}
