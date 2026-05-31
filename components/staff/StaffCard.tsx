'use client'
import { Card, Box, Typography, Chip } from '@mui/material'
import { COLORS } from '@/lib/colors'
import UserAvatar from '@/components/shared/UserAvatar'
import type { StaffMember } from '@/types'

interface Props {
  member: StaffMember
  serviceName: (id: string) => string
  onClick: () => void
}

const CHIP_SX = { bgcolor: COLORS.prince20, color: 'primary.main' } as const

export default function StaffCard({ member, serviceName, onClick }: Props) {
  return (
    <Card
      sx={{ p: 2.5, textAlign: 'center', cursor: 'pointer', transition: 'box-shadow .15s', '&:hover': { boxShadow: '0 4px 20px rgba(6,9,17,0.08)' } }}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1.5 }}>
        <UserAvatar name={member.name} color={member.avatarColor} size="xl" />
      </Box>
      <Typography sx={{ fontWeight: 700 }}>{member.name}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>{member.role}</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center' }}>
        {member.services.slice(0, 3).map((sid) => (
          <Chip key={sid} size="small" label={serviceName(sid)} sx={CHIP_SX} />
        ))}
        {member.services.length > 3 && <Chip size="small" label={`+${member.services.length - 3}`} sx={CHIP_SX} />}
      </Box>
    </Card>
  )
}
