'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  Drawer, Typography, IconButton, TextField, MenuItem, Button,
} from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import CloseRounded from '@mui/icons-material/CloseRounded'
import { useServices } from '@/hooks/queries/useServices'
import { useStaff } from '@/hooks/queries/useStaff'
import { useCreateBooking } from '@/hooks/mutations/useCreateBooking'
import { format } from 'date-fns'
import { DrawerHeader, DrawerBody, DrawerFooter } from './BookingFormDrawer.styled'
import { FIELDS, type FieldConfig } from './BookingFormDrawer.constants'

const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
  (e: React.ChangeEvent<HTMLInputElement>) => setter(e.target.value)

export default function BookingFormDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('calendar')
  const common = useTranslations('common')
  const { data: services } = useServices()
  const { data: staff } = useStaff()
  const create = useCreateBooking()

  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [staffId, setStaffId] = useState('')
  const [date, setDate] = useState<Date | null>(new Date())
  const [start, setStart] = useState<Date | null>(() => { const d = new Date(); d.setHours(10, 0, 0, 0); return d })

  const reset = () => { setCustomerName(''); setPhone(''); setServiceId(''); setStaffId(''); setStart(null) }

  const save = () => {
    const svc = services?.find((s) => s.id === serviceId)
    if (!customerName.trim() || !phone.trim() || !svc || !staffId || !date || !start) return
    const startAt = `${format(date, 'yyyy-MM-dd')}T${format(start, 'HH:mm')}:00.000Z`
    create.mutate(
      {
        customerName: customerName.trim(),
        phone: phone.trim(),
        staffId,
        serviceId: svc.id,
        startAt,
      },
      { onSuccess: () => { reset(); onClose() } },
    )
  }

  const textFields: FieldConfig[] = [
    { ...FIELDS.CUSTOMER_NAME, value: customerName, onChange: handleChange(setCustomerName) },
    { ...FIELDS.PHONE, value: phone, onChange: handleChange(setPhone) },
    {
      ...FIELDS.SERVICE_ID,
      value: serviceId,
      onChange: handleChange(setServiceId),
      select: true,
      children: services?.map((s) => <MenuItem key={s.id} value={s.id}>{s.name} · {s.duration} min</MenuItem>),
    },
    {
      ...FIELDS.STAFF_ID,
      value: staffId,
      onChange: handleChange(setStaffId),
      select: true,
      children: staff?.map((m) => <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>),
    },
  ]

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: 440 } }}>
      <DrawerHeader>
        <Typography variant="h3" sx={{ flex: 1 }}>{t('addAppointment')}</Typography>
        <IconButton onClick={onClose}><CloseRounded /></IconButton>
      </DrawerHeader>
      <DrawerBody spacing={2.5}>
        {textFields.map(({ name, label, value, onChange, select, children }) => (
          <TextField key={name} label={label} fullWidth value={value} onChange={onChange} select={select}>
            {children}
          </TextField>
        ))}
        <DatePicker label={FIELDS.DATE.label} value={date} onChange={setDate} slotProps={{ textField: { fullWidth: true, size: 'small' } }} />
        <TimePicker label={FIELDS.START_TIME.label} value={start} onChange={setStart} slotProps={{ textField: { fullWidth: true, size: 'small' } }} />
      </DrawerBody>
      <DrawerFooter>
        <Button variant="outlined" fullWidth onClick={onClose}>{common('cancel')}</Button>
        <Button variant="contained" fullWidth onClick={save} disabled={create.isPending}>{common('save')}</Button>
      </DrawerFooter>
    </Drawer>
  )
}
