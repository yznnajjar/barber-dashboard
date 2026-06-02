'use client'
import { useMemo, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import {
  Dialog, Box, Typography, IconButton, TextField, MenuItem, Button, Stack,
  Autocomplete, Chip,
} from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import CloseRounded from '@mui/icons-material/CloseRounded'
import { useServices } from '@/hooks/queries/useServices'
import { useStaff } from '@/hooks/queries/useStaff'
import { useClients } from '@/hooks/queries/useClients'
import { useCreateBooking } from '@/hooks/mutations/useCreateBooking'
import { format, startOfDay, isBefore } from 'date-fns'
import { dayKey, formatJD } from '@/lib/utils'
import { isPastDateTime } from '@/lib/calendarValidation'
import { STATUS_COLORS } from '@/lib/colors'
import type { Client } from '@/types'

interface SchemaMessages {
  clientRequired: string
  serviceRequired: string
  staffRequired: string
  dateRequired: string
  pastDate: string
  startRequired: string
  phoneRequired: string
  pastTime: string
}

const createBookingSchema = (msgs: SchemaMessages) =>
  z.object({
    customerName: z.string().min(1, msgs.clientRequired),
    phone: z.string(),
    serviceId: z.string().min(1, msgs.serviceRequired),
    staffId: z.string().min(1, msgs.staffRequired),
    date: z.date({ error: msgs.dateRequired })
      .refine((d) => !isBefore(startOfDay(d), startOfDay(new Date())), {
        message: msgs.pastDate,
      }),
    start: z.date({ error: msgs.startRequired }),
    notes: z.string(),
    isExistingClient: z.boolean(),
  }).superRefine((data, ctx) => {
    if (!data.isExistingClient && !data.phone.trim()) {
      ctx.addIssue({ code: 'custom', path: ['phone'], message: msgs.phoneRequired })
    }
    if (data.date && data.start) {
      const dateStr = dayKey(data.date)
      const timeStr = format(data.start, 'HH:mm')
      if (isPastDateTime(dateStr, timeStr)) {
        ctx.addIssue({ code: 'custom', path: ['start'], message: msgs.pastTime })
      }
    }
  })

type BookingFormValues = z.infer<ReturnType<typeof createBookingSchema>>

export default function BookingFormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('calendar')
  const common = useTranslations('common')
  const { data: services } = useServices()
  const { data: staff } = useStaff()
  const create = useCreateBooking()

  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [clientSearch, setClientSearch] = useState('')
  const { data: clients } = useClients(1, 20, clientSearch || undefined)

  const schema = useMemo(() => createBookingSchema({
    clientRequired: t('errors.clientRequired'),
    serviceRequired: t('errors.serviceRequired'),
    staffRequired: t('errors.staffRequired'),
    dateRequired: t('errors.dateRequired'),
    pastDate: t('errors.pastDate'),
    startRequired: t('errors.startRequired'),
    phoneRequired: t('errors.phoneRequired'),
    pastTime: t('errors.pastTime'),
  }), [t])

  const { control, register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<BookingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      customerName: '',
      phone: '',
      serviceId: '',
      staffId: '',
      date: new Date(),
      start: (() => { const d = new Date(); d.setHours(10, 0, 0, 0); return d })(),
      notes: '',
      isExistingClient: false,
    },
  })

  const watchedDate = watch('date')
  const watchedServiceId = watch('serviceId')
  const isExistingClient = watch('isExistingClient')
  const selectedService = services?.find((s) => s.id === watchedServiceId)

  const handleClientChange = (_: unknown, value: Client | string | null) => {
    if (!value) {
      setSelectedClient(null)
      setValue('customerName', '')
      setValue('isExistingClient', false)
      return
    }
    if (typeof value === 'string') {
      setSelectedClient(null)
      setValue('customerName', value)
      setValue('isExistingClient', false)
    } else {
      setSelectedClient(value)
      setValue('customerName', value.name)
      setValue('phone', value.phone || '')
      setValue('isExistingClient', true)
    }
  }

  const onSubmit = (values: BookingFormValues) => {
    const startAt = `${dayKey(values.date)}T${format(values.start, 'HH:mm')}:00.000Z`
    create.mutate(
      {
        customerName: values.customerName.trim(),
        phone: values.phone.trim(),
        clientId: selectedClient?.id,
        staffId: values.staffId,
        serviceId: values.serviceId,
        startAt,
        notes: values.notes.trim() || undefined,
      },
      {
        onSuccess: () => {
          reset()
          setSelectedClient(null)
          setClientSearch('')
          onClose()
        },
      },
    )
  }

  const isToday = watchedDate
    ? dayKey(watchedDate) === dayKey(new Date())
    : false

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: '18px' } }}>
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
        <Typography variant="h3" sx={{ flex: 1 }}>{t('addAppointment')}</Typography>
        <IconButton onClick={onClose}><CloseRounded /></IconButton>
      </Box>
      <Stack spacing={2.5} sx={{ p: 3, flex: 1, overflowY: 'auto', maxHeight: '70vh' }}>
        <Autocomplete
          freeSolo
          options={clients ?? []}
          getOptionLabel={(o) => (typeof o === 'string' ? o : o.name)}
          filterOptions={(opts, { inputValue }) => {
            const filtered = opts.filter((o) =>
              o.name.toLowerCase().includes(inputValue.toLowerCase()) ||
              (o.phone && o.phone.includes(inputValue)),
            )
            if (inputValue.length >= 2 && !filtered.some((o) => o.name.toLowerCase() === inputValue.toLowerCase())) {
              filtered.push({
                id: '__new__',
                name: t('form.newClientOption', { name: inputValue }),
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
          onInputChange={(_, v) => {
            setClientSearch(v)
            if (!selectedClient) setValue('customerName', v)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('form.client')}
              fullWidth
              error={!!errors.customerName}
              helperText={errors.customerName?.message}
            />
          )}
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
          <TextField
            label={t('form.phone')}
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone?.message}
            {...register('phone')}
          />
        )}

        {isExistingClient && selectedClient && (
          <Chip
            label={t('form.returningClient', { count: selectedClient.totalVisits })}
            size="small"
            variant="outlined"
            color="primary"
            sx={{ alignSelf: 'flex-start' }}
          />
        )}

        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '14px', p: 2 }}>
          <Stack spacing={2}>
            <Controller
              name="serviceId"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label={t('form.service')}
                  fullWidth
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.serviceId}
                  helperText={errors.serviceId?.message}
                >
                  {services?.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {t('form.serviceMenuItem', { name: s.name, duration: s.duration, unit: common('min'), price: s.price })}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="staffId"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label={t('form.staff')}
                  fullWidth
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.staffId}
                  helperText={errors.staffId?.message}
                >
                  {staff?.map((m) => <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>)}
                </TextField>
              )}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label={t('form.date')}
                    value={field.value}
                    onChange={field.onChange}
                    disablePast
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: 'small',
                        error: !!errors.date,
                        helperText: errors.date?.message,
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="start"
                control={control}
                render={({ field }) => (
                  <TimePicker
                    label={t('form.startTime')}
                    value={field.value}
                    onChange={field.onChange}
                    minTime={isToday ? new Date() : undefined}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: 'small',
                        error: !!errors.start,
                        helperText: errors.start?.message,
                      },
                    }}
                  />
                )}
              />
            </Box>

            {selectedService && (
              <Box sx={{ display: 'flex', gap: 3, pt: 0.5 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                    {t('form.duration')}
                  </Typography>
                  <Typography variant="body2">{selectedService.duration} {common('min')}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                    {t('form.price')}
                  </Typography>
                  <Typography variant="body2">{formatJD(selectedService.price)}</Typography>
                </Box>
              </Box>
            )}
          </Stack>
        </Box>

        <TextField
          label={t('form.notes')}
          fullWidth
          multiline
          rows={2}
          placeholder={t('form.notesPlaceholder')}
          {...register('notes')}
        />
      </Stack>
      <Box sx={{ p: 2.5, borderTop: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Chip
            label={STATUS_COLORS.PENDING.label}
            size="small"
            sx={{
              bgcolor: STATUS_COLORS.PENDING.bg,
              color: STATUS_COLORS.PENDING.fg,
              fontWeight: 600,
            }}
          />
          <Box sx={{ flex: 1 }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', mr: 1 }}>
            {t('form.total')}
          </Typography>
          <Typography variant="h3">
            {formatJD(selectedService?.price ?? 0)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" fullWidth onClick={onClose}>{common('cancel')}</Button>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit(onSubmit)}
            disabled={create.isPending}
          >
            {common('save')}
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}
