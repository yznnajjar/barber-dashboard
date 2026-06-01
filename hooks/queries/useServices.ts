import { useQuery } from '@tanstack/react-query'
import { servicesApi } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { QUERY_KEY_SERVICES } from '@/constants'

export const useServices = () => {
  const salonId = useAuthStore((s) => s.salonId)
  return useQuery({
    queryKey: [QUERY_KEY_SERVICES, salonId],
    queryFn: () => servicesApi.getAll(),
    enabled: !!salonId,
  })
}
