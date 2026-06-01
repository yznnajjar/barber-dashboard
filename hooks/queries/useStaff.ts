import { useQuery } from '@tanstack/react-query'
import { staffApi } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { QUERY_KEY_STAFF } from '@/constants'

export const useStaff = () => {
  const salonId = useAuthStore((s) => s.salonId)
  return useQuery({
    queryKey: [QUERY_KEY_STAFF, salonId],
    queryFn: () => staffApi.getAll(),
    enabled: !!salonId,
  })
}
