import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY_BOOKINGS, MOCK_SALON_ID } from '@/constants'
import type { Booking } from '@/types'

// staffId is optional — supplied when a drag moves the booking to another staff column.
interface RescheduleInput {
  id: string
  startTime: string
  endTime: string
  staffId?: string
}

export const useRescheduleBooking = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: RescheduleInput) =>
      new Promise<RescheduleInput>((res) => setTimeout(() => res(input), 250)),
    onSuccess: ({ id, startTime, endTime, staffId }) => {
      queryClient.setQueryData<Booking[]>([QUERY_KEY_BOOKINGS, MOCK_SALON_ID], (prev) =>
        prev?.map((b) =>
          b.id === id ? { ...b, startTime, endTime, ...(staffId ? { staffId } : {}) } : b,
        ),
      )
    },
  })
}
