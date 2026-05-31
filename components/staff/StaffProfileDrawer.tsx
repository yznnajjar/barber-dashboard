'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  Drawer, Box, Typography, IconButton, Chip, Switch, Stack, Divider, TextField, Button,
} from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import CloseRounded from '@mui/icons-material/CloseRounded'
import CheckRounded from '@mui/icons-material/CheckRounded'
import { COLORS } from '@/lib/colors'
import { useSaveStaff } from '@/hooks/mutations/useSaveStaff'
import { timeStringToDate, dateToTimeString } from '@/lib/utils'
import UserAvatar from '@/components/shared/UserAvatar'
import {
  SectionLabel, ChipWrap, HourRow, DayLabel, DrawerHead, DrawerFoot,
} from './StaffView.styled'
import type { StaffMember, Service } from '@/types'

interface Props {
  member: StaffMember | null
  services: Service[]
  onClose: () => void
}

export default function StaffProfileDrawer({ member, services, onClose }: Props) {
  const t = useTranslations('staff')
  const common = useTranslations('common')
  const save = useSaveStaff()
  const [draft, setDraft] = useState<StaffMember | null>(null)

  useEffect(() => { setDraft(member ? structuredClone(member) : null) }, [member])

  if (!draft) return <Drawer anchor="right" open={false} onClose={onClose} />

  const toggleDay = (day: string) =>
    setDraft({ ...draft, workingHours: draft.workingHours.map((w) => (w.day === day ? { ...w, enabled: !w.enabled } : w)) })
  const setDayTime = (day: string, key: 'start' | 'end', val: string) =>
    setDraft({ ...draft, workingHours: draft.workingHours.map((w) => (w.day === day ? { ...w, [key]: val } : w)) })
  const toggleService = (id: string) =>
    setDraft({ ...draft, services: draft.services.includes(id) ? draft.services.filter((s) => s !== id) : [...draft.services, id] })

  return (
    <Drawer anchor="right" open={!!member} onClose={onClose} PaperProps={{ sx: { width: 460 } }}>
      <DrawerHead>
        <UserAvatar name={draft.name || '?'} color={draft.avatarColor} size="lg" />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3">{draft.id ? draft.name : t('addStaff')}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>{draft.role}</Typography>
        </Box>
        <IconButton onClick={onClose}><CloseRounded /></IconButton>
      </DrawerHead>

      <Box sx={{ p: 3, overflowY: 'auto', flex: 1 }}>
        <Stack spacing={2} sx={{ mb: 3 }}>
          <TextField label="Name" size="small" fullWidth value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          <TextField label={t('role')} size="small" fullWidth value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} />
        </Stack>

        <SectionLabel>{t('assignedServices')}</SectionLabel>
        <ChipWrap>
          {services.map((s) => {
            const on = draft.services.includes(s.id)
            return (
              <Chip
                key={s.id} size="small" label={s.name}
                icon={on ? <CheckRounded sx={{ fontSize: 14 }} /> : undefined}
                onClick={() => toggleService(s.id)}
                sx={{ cursor: 'pointer', bgcolor: on ? COLORS.prince : COLORS.prince20, color: on ? COLORS.white : 'primary.main', '& .MuiChip-icon': { color: COLORS.white } }}
              />
            )
          })}
        </ChipWrap>

        <Divider sx={{ mb: 2 }} />

        <SectionLabel>{t('workingHours')}</SectionLabel>
        <Stack spacing={1} sx={{ mt: 1.5 }}>
          {draft.workingHours.map((d) => (
            <HourRow key={d.day}>
              <Switch checked={d.enabled} size="small" onChange={() => toggleDay(d.day)} />
              <DayLabel>{d.day}</DayLabel>
              {d.enabled ? (
                <Box sx={{ display: 'flex', gap: 0.75, flex: 1 }}>
                  <TimePicker value={timeStringToDate(d.start)} onChange={(v) => setDayTime(d.day, 'start', dateToTimeString(v))} slotProps={{ textField: { size: 'small' } }} sx={{ flex: 1 }} />
                  <TimePicker value={timeStringToDate(d.end)} onChange={(v) => setDayTime(d.day, 'end', dateToTimeString(v))} slotProps={{ textField: { size: 'small' } }} sx={{ flex: 1 }} />
                </Box>
              ) : (
                <Typography variant="body2" sx={{ color: 'text.disabled', flex: 1 }}>Off</Typography>
              )}
            </HourRow>
          ))}
        </Stack>
      </Box>

      <DrawerFoot>
        <Button variant="outlined" fullWidth onClick={onClose}>{common('cancel')}</Button>
        <Button variant="contained" fullWidth disabled={!draft.name.trim() || save.isPending} onClick={() => save.mutate(draft, { onSuccess: onClose })}>
          {common('save')}
        </Button>
      </DrawerFoot>
    </Drawer>
  )
}
