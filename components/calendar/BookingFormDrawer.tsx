'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  Drawer, Box, Typography, IconButton, TextField, MenuItem, Button, Stack,
} from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import CloseRounded from '@mui/icons-material/CloseRounded'
import { useServices } from '@/hooks/queries/useServices'
import { useStaff } from '@/hooks/queries/useStaff'
import { useCreateBooking } from '@/hooks/mutations/useCreateBooking'
import { MOCK_SALON_ID } from '@/constants'
import { addMinutes, format } from 'date-fns'

export default function BookingFormDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('calendar')
  const common = useTranslations('common')
  const { data: services } = useServices(MOCK_SALON_ID)
  const { data: staff } = useStaff(MOCK_SALON_ID)
  const create = useCreateBooking()

  const [customerName, setCustomerName] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [staffId, setStaffId] = useState('')
  const [date, setDate] = useState<Date | null>(new Date())
  const [start, setStart] = useState<Date | null>(() => { const d = new Date(); d.setHours(10, 0, 0, 0); return d })

  const reset = () => { setCustomerName(''); setServiceId(''); setStaffId(''); setStart(null) }

  const save = () => {
    const svc = services?.find((s) => s.id === serviceId)
    if (!customerName.trim() || !svc || !staffId || !date || !start) return
    const endDate = addMinutes(start, svc.duration)
    create.mutate(
      {
        customerId: `c_${Date.now()}`,
        customerName: customerName.trim(),
        staffId,
        serviceId: svc.id,
        serviceName: svc.name,
        date: format(date, 'yyyy-MM-dd'),
        startTime: format(start, 'HH:mm'),
        endTime: format(endDate, 'HH:mm'),
      },
      { onSuccess: () => { reset(); onClose() } },
    )
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: 440 } }}>
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
        <Typography variant="h3" sx={{ flex: 1 }}>{t('addAppointment')}</Typography>
        <IconButton onClick={onClose}><CloseRounded /></IconButton>
      </Box>
      <Stack spacing={2.5} sx={{ p: 3, flex: 1, overflowY: 'auto' }}>
        <TextField label="Customer name" fullWidth value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        <TextField select label="Service" fullWidth value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
          {services?.map((s) => <MenuItem key={s.id} value={s.id}>{s.name} · {s.duration} min</MenuItem>)}
        </TextField>
        <TextField select label="Staff" fullWidth value={staffId} onChange={(e) => setStaffId(e.target.value)}>
          {staff?.map((m) => <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>)}
        </TextField>
        <DatePicker label="Date" value={date} onChange={setDate} slotProps={{ textField: { fullWidth: true, size: 'small' } }} />
        <TimePicker label="Start time" value={start} onChange={setStart} slotProps={{ textField: { fullWidth: true, size: 'small' } }} />
      </Stack>
      <Box sx={{ p: 2.5, borderTop: '1px solid', borderColor: 'divider', display: 'flex', gap: 1 }}>
        <Button variant="outlined" fullWidth onClick={onClose}>{common('cancel')}</Button>
        <Button variant="contained" fullWidth onClick={save} disabled={create.isPending}>{common('save')}</Button>
      </Box>
    </Drawer>
  )
}
