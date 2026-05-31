import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY_BOOKINGS, MOCK_SALON_ID, BOOKING_STATUS_CONFIRMED } from '@/constants'
import type { Booking } from '@/types'

export type NewBooking = Omit<Booking, 'id' | 'status' | 'depositPaid' | 'avatarColor'>

export const useCreateBooking = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: NewBooking) =>
      new Promise<Booking>((res) =>
        setTimeout(
          () =>
            res({
              ...input,
              id: `bk_${Date.now()}`,
              status: BOOKING_STATUS_CONFIRMED as Booking['status'],
              depositPaid: false,
              avatarColor: ((Date.now() % 8) + 1),
            }),
          250,
        ),
      ),
    onSuccess: (booking) => {
      queryClient.setQueryData<Booking[]>([QUERY_KEY_BOOKINGS, MOCK_SALON_ID], (prev) =>
        prev ? [...prev, booking] : [booking],
      )
    },
  })
}
