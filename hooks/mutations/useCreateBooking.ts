import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bookingsApi, clientsApi } from '@/lib/api'
import { QUERY_KEY_BOOKINGS, QUERY_KEY_CLIENTS, QUERY_KEY_DASHBOARD_STATS } from '@/constants'

interface NewBooking {
  customerName: string
  phone?: string
  staffId: string
  serviceId: string
  startAt: string // ISO datetime
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: NewBooking) => {
      let clientId = ''
      if (input.customerName.trim()) {
        try {
          const client = await clientsApi.create({
            fullName: input.customerName.trim(),
            phone: input.phone || '',
          })
          clientId = client.id
        } catch {
          // proceed without clientId if creation fails
        }
      }
      return bookingsApi.create({
        clientId,
        staffId: input.staffId,
        serviceId: input.serviceId,
        startAt: input.startAt,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BOOKINGS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CLIENTS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_DASHBOARD_STATS] })
    },
  })
}
