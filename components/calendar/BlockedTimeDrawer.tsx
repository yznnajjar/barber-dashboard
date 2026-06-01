'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  Drawer, Box, Typography, IconButton, TextField, MenuItem, Button, Stack,
} from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import CloseRounded from '@mui/icons-material/CloseRounded'
import { useStaff } from '@/hooks/queries/useStaff'
import { timeStringToDate } from '@/lib/utils'
import { format } from 'date-fns'
import type { BlockedTime } from '@/types'

const BLOCK_TYPES = ['Break', 'Admin', 'Personal', 'Meeting']

function defaultDate(hour: number): Date {
  const d = new Date()
  d.setHours(hour, 0, 0, 0)
  return d
}

interface Props {
  open: boolean
  editing: BlockedTime | null
  onSave: (data: Omit<BlockedTime, 'id'>) => void
  onDelete: (id: string) => void
  onClose: () => void
}

export default function BlockedTimeDrawer({ open, editing, onSave, onDelete, onClose }: Props) {
  const common = useTranslations('common')
  const { data: staff } = useStaff()

  const [staffId, setStaffId] = useState(editing?.staffId ?? (staff?.[0]?.id ?? ''))
  const [type, setType] = useState(editing?.type ?? BLOCK_TYPES[0])
  const [date, setDate] = useState<Date | null>(editing ? new Date(editing.date) : new Date())
  const [start, setStart] = useState<Date | null>(editing ? timeStringToDate(editing.startTime) : defaultDate(12))
  const [end, setEnd] = useState<Date | null>(editing ? timeStringToDate(editing.endTime) : defaultDate(13))
  const [notes, setNotes] = useState(editing?.notes ?? '')

  const reset = () => {
    setStaffId(staff?.[0]?.id ?? '')
    setType(BLOCK_TYPES[0])
    setDate(new Date())
    setStart(defaultDate(12))
    setEnd(defaultDate(13))
    setNotes('')
  }

  const save = () => {
    if (!staffId || !date || !start || !end) return
    onSave({
      staffId,
      type,
      date: format(date, 'yyyy-MM-dd'),
      startTime: format(start, 'HH:mm'),
      endTime: format(end, 'HH:mm'),
      notes: notes.trim() || undefined,
    })
    if (!editing) reset()
    onClose()
  }

  const title = editing ? 'Edit blocked time' : 'Add blocked time'

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: 440 } }}>
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
        <Typography variant="h3" sx={{ flex: 1 }}>{title}</Typography>
        <IconButton onClick={onClose}><CloseRounded /></IconButton>
      </Box>
      <Stack spacing={2.5} sx={{ p: 3, flex: 1, overflowY: 'auto' }}>
        <TextField select label="Type" fullWidth value={type} onChange={(e) => setType(e.target.value)}>
          {BLOCK_TYPES.map((bt) => <MenuItem key={bt} value={bt}>{bt}</MenuItem>)}
        </TextField>
        <TextField select label="Staff" fullWidth value={staffId} onChange={(e) => setStaffId(e.target.value)}>
          {staff?.map((m) => <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>)}
        </TextField>
        <DatePicker label="Date" value={date} onChange={setDate} slotProps={{ textField: { fullWidth: true, size: 'small' } }} />
        <TimePicker label="Start time" value={start} onChange={setStart} slotProps={{ textField: { fullWidth: true, size: 'small' } }} />
        <TimePicker label="End time" value={end} onChange={setEnd} slotProps={{ textField: { fullWidth: true, size: 'small' } }} />
        <TextField label="Notes" fullWidth multiline rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </Stack>
      <Box sx={{ p: 2.5, borderTop: '1px solid', borderColor: 'divider', display: 'flex', gap: 1 }}>
        {editing && (
          <Button variant="outlined" color="error" onClick={() => { onDelete(editing.id); onClose() }}>
            {common('delete')}
          </Button>
        )}
        <Button variant="outlined" fullWidth onClick={onClose}>{common('cancel')}</Button>
        <Button variant="contained" fullWidth onClick={save}>{common('save')}</Button>
      </Box>
    </Drawer>
  )
}
