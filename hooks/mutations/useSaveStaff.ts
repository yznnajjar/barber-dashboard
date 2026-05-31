import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY_STAFF, MOCK_SALON_ID } from '@/constants'
import type { StaffMember } from '@/types'

// Upsert: creates when id is empty, otherwise updates. Live: POST/PATCH /api/staff
export const useSaveStaff = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: StaffMember) =>
      new Promise<StaffMember>((res) =>
        setTimeout(() => res(input.id ? input : { ...input, id: `stf_${Date.now()}` }), 250),
      ),
    onSuccess: (member) => {
      queryClient.setQueryData<StaffMember[]>([QUERY_KEY_STAFF, MOCK_SALON_ID], (prev) => {
        if (!prev) return [member]
        return prev.some((m) => m.id === member.id)
          ? prev.map((m) => (m.id === member.id ? member : m))
          : [...prev, member]
      })
    },
  })
}
