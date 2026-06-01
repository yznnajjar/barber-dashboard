'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  Drawer, Box, Typography, IconButton, TextField, MenuItem, Button, Stack,
  Autocomplete, Chip,
} from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import CloseRounded from '@mui/icons-material/CloseRounded'
import { useServices } from '@/hooks/queries/useServices'
import { useStaff } from '@/hooks/queries/useStaff'
import { useClients } from '@/hooks/queries/useClients'
import { useCreateBooking } from '@/hooks/mutations/useCreateBooking'
import { format } from 'date-fns'
import type { Client } from '@/types'

export default function BookingFormDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('calendar')
  const common = useTranslations('common')
  const { data: services } = useServices()
  const { data: staff } = useStaff()
  const create = useCreateBooking()

  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [clientSearch, setClientSearch] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [staffId, setStaffId] = useState('')
  const [date, setDate] = useState<Date | null>(new Date())
  const [start, setStart] = useState<Date | null>(() => { const d = new Date(); d.setHours(10, 0, 0, 0); return d })
  const [notes, setNotes] = useState('')

  const { data: clients } = useClients(1, 20, clientSearch || undefined)

  const reset = () => {
    setCustomerName('')
    setPhone('')
    setSelectedClient(null)
    setClientSearch('')
    setServiceId('')
    setStaffId('')
    setStart(null)
    setNotes('')
  }

  const selectedService = services?.find((s) => s.id === serviceId)
  const isExistingClient = !!selectedClient

  const save = () => {
    if (!customerName.trim() || !selectedService || !staffId || !date || !start) return
    if (!isExistingClient && !phone.trim()) return

    const startAt = `${format(date, 'yyyy-MM-dd')}T${format(start, 'HH:mm')}:00.000Z`
    create.mutate(
      {
        customerName: customerName.trim(),
        phone: phone.trim(),
        clientId: selectedClient?.id,
        staffId,
        serviceId: selectedService.id,
        startAt,
        notes: notes.trim() || undefined,
      },
      { onSuccess: () => { reset(); onClose() } },
    )
  }

  const handleClientChange = (_: unknown, value: Client | string | null) => {
    if (!value) {
      setSelectedClient(null)
      setCustomerName('')
      return
    }
    if (typeof value === 'string') {
      // Free-text: new client
      setSelectedClient(null)
      setCustomerName(value)
    } else {
      setSelectedClient(value)
      setCustomerName(value.name)
      setPhone(value.phone || '')
    }
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: 440 } }}>
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
        <Typography variant="h3" sx={{ flex: 1 }}>{t('addAppointment')}</Typography>
        <IconButton onClick={onClose}><CloseRounded /></IconButton>
      </Box>
      <Stack spacing={2.5} sx={{ p: 3, flex: 1, overflowY: 'auto' }}>
        <Autocomplete
          freeSolo
          options={clients ?? []}
          getOptionLabel={(o) => (typeof o === 'string' ? o : o.name)}
          filterOptions={(opts, { inputValue }) => {
            const filtered = opts.filter((o) =>
              o.name.toLowerCase().includes(inputValue.toLowerCase()) ||
              (o.phone && o.phone.includes(inputValue)),
            )
            // Show "new client" hint when typing a name not in the list
            if (inputValue.length >= 2 && !filtered.some((o) => o.name.toLowerCase() === inputValue.toLowerCase())) {
              filtered.push({
                id: '__new__',
                name: `+ "${inputValue}" (new client)`,
                phone: '',
                totalVisits: 0,
                lastVisit: '',
                totalSpend: 0,
                avatarColor: 1,
                notes: '',
                history: [],
              })
            }
            return filtered
          }}
          isOptionEqualToValue={(o, v) => typeof o !== 'string' && typeof v !== 'string' && o.id === v.id}
          value={selectedClient}
          onChange={handleClientChange}
          onInputChange={(_, v) => { setClientSearch(v); if (!selectedClient) setCustomerName(v) }}
          renderInput={(params) => <TextField {...params} label="Client" fullWidth />}
          renderOption={(props, opt) => {
            const { key, ...rest } = props
            return (
              <li key={key} {...rest}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span>{opt.name}</span>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {opt.id === '__new__' ? '' : opt.phone}
                  </Typography>
                </Box>
              </li>
            )
          }}
        />

        {!isExistingClient && (
          <TextField label="Phone" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
        )}

        {isExistingClient && (
          <Chip
            label={`Returning · ${selectedClient.totalVisits} visits`}
            size="small"
            variant="outlined"
            color="primary"
            sx={{ alignSelf: 'flex-start' }}
          />
        )}

        <TextField
          select
          label="Service"
          fullWidth
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          helperText={selectedService ? `${selectedService.name} · ${selectedService.duration} ${common('min')}` : undefined}
        >
          {services?.map((s) => (
            <MenuItem key={s.id} value={s.id}>{s.name} · {s.duration} {common('min')} · {s.price} JD</MenuItem>
          ))}
        </TextField>

        <TextField select label="Staff" fullWidth value={staffId} onChange={(e) => setStaffId(e.target.value)}>
          {staff?.map((m) => <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>)}
        </TextField>

        <DatePicker label="Date" value={date} onChange={setDate} slotProps={{ textField: { fullWidth: true, size: 'small' } }} />
        <TimePicker label="Start time" value={start} onChange={setStart} slotProps={{ textField: { fullWidth: true, size: 'small' } }} />

        <TextField
          label="Notes"
          fullWidth
          multiline
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Allergies, preferences…"
        />
      </Stack>
      <Box sx={{ p: 2.5, borderTop: '1px solid', borderColor: 'divider', display: 'flex', gap: 1 }}>
        <Button variant="outlined" fullWidth onClick={onClose}>{common('cancel')}</Button>
        <Button variant="contained" fullWidth onClick={save} disabled={create.isPending}>{common('save')}</Button>
      </Box>
    </Drawer>
  )
}
