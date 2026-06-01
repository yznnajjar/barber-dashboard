import { useMutation, useQueryClient } from '@tanstack/react-query'
import { staffApi } from '@/lib/api'
import { workingDayToWorkingHourDto } from '@/lib/transform'
import { QUERY_KEY_STAFF } from '@/constants'
import type { StaffMember } from '@/types'
import type { CreateStaffInput } from '@/types/api'

export const useSaveStaff = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: StaffMember) => {
      const dto: CreateStaffInput = {
        fullName: input.name,
        role: input.role || undefined,
        serviceIds: input.services?.length ? input.services : undefined,
        workingHours: input.workingHours?.map(workingDayToWorkingHourDto),
      }
      if (input.id) {
        return staffApi.update(input.id, dto)
      }
      return staffApi.create(dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STAFF] })
    },
  })
}
