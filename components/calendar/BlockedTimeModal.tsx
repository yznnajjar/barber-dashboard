'use client'
import { useMemo, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import {
  Dialog, Box, Typography, IconButton, TextField, MenuItem, Button, Stack,
} from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import CloseRounded from '@mui/icons-material/CloseRounded'
import { useStaff } from '@/hooks/queries/useStaff'
import { timeStringToDate, dayKey } from '@/lib/utils'
import { format, isBefore, startOfDay } from 'date-fns'
import type { BlockedTime } from '@/types'

const BLOCK_TYPES = ['Break', 'Admin', 'Personal', 'Meeting'] as const
type BlockType = typeof BLOCK_TYPES[number]

interface SchemaMessages {
  staffRequired: string
  dateRequired: string
  pastBlockDate: string
  startRequired: string
  endRequired: string
  endBeforeStart: string
}

const createBlockedTimeSchema = (msgs: SchemaMessages) =>
  z.object({
    staffId: z.string().min(1, msgs.staffRequired),
    type: z.string().min(1),
    date: z.date({ error: msgs.dateRequired })
      .refine((d) => !isBefore(startOfDay(d), startOfDay(new Date())), {
        message: msgs.pastBlockDate,
      }),
    start: z.date({ error: msgs.startRequired }),
    end: z.date({ error: msgs.endRequired }),
    notes: z.string(),
  }).superRefine((data, ctx) => {
    if (data.start && data.end) {
      const startMin = data.start.getHours() * 60 + data.start.getMinutes()
      const endMin = data.end.getHours() * 60 + data.end.getMinutes()
      if (endMin <= startMin) {
        ctx.addIssue({ code: 'custom', path: ['end'], message: msgs.endBeforeStart })
      }
    }
  })

type BlockedTimeValues = z.infer<ReturnType<typeof createBlockedTimeSchema>>

interface Props {
  open: boolean
  editing: BlockedTime | null
  onSave: (data: Omit<BlockedTime, 'id'>) => void
  onDelete: (id: string) => void
  onClose: () => void
}

function defaultDate(hour: number): Date {
  const d = new Date()
  d.setHours(hour, 0, 0, 0)
  return d
}

export default function BlockedTimeModal({ open, editing, onSave, onDelete, onClose }: Props) {
  const t = useTranslations('calendar')
  const common = useTranslations('common')
  const { data: staff } = useStaff()

  const schema = useMemo(() => createBlockedTimeSchema({
    staffRequired: t('errors.staffRequired'),
    dateRequired: t('errors.dateRequired'),
    pastBlockDate: t('errors.pastBlockDate'),
    startRequired: t('errors.startRequired'),
    endRequired: t('errors.endRequired'),
    endBeforeStart: t('errors.endBeforeStart'),
  }), [t])

  const blockTypeLabels = useMemo<Record<BlockType, string>>(() => ({
    Break: t('blockedTime.types.Break'),
    Admin: t('blockedTime.types.Admin'),
    Personal: t('blockedTime.types.Personal'),
    Meeting: t('blockedTime.types.Meeting'),
  }), [t])

  const { control, handleSubmit, reset, formState: { errors } } = useForm<BlockedTimeValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      staffId: editing?.staffId ?? (staff?.[0]?.id ?? ''),
      type: editing?.type ?? BLOCK_TYPES[0],
      date: editing ? new Date(editing.date) : new Date(),
      start: editing ? timeStringToDate(editing.startTime) : defaultDate(12),
      end: editing ? timeStringToDate(editing.endTime) : defaultDate(13),
      notes: editing?.notes ?? '',
    },
  })

  useEffect(() => {
    reset({
      staffId: editing?.staffId ?? (staff?.[0]?.id ?? ''),
      type: editing?.type ?? BLOCK_TYPES[0],
      date: editing ? new Date(editing.date) : new Date(),
      start: editing ? timeStringToDate(editing.startTime) : defaultDate(12),
      end: editing ? timeStringToDate(editing.endTime) : defaultDate(13),
      notes: editing?.notes ?? '',
    })
  }, [editing, staff, reset])

  const onSubmit = (values: BlockedTimeValues) => {
    onSave({
      staffId: values.staffId,
      type: values.type,
      date: dayKey(values.date),
      startTime: format(values.start, 'HH:mm'),
      endTime: format(values.end, 'HH:mm'),
      notes: values.notes.trim() || undefined,
    })
    if (!editing) {
      reset({
        staffId: staff?.[0]?.id ?? '',
        type: BLOCK_TYPES[0],
        date: new Date(),
        start: defaultDate(12),
        end: defaultDate(13),
        notes: '',
      })
    }
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: '18px' } }}>
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
        <Typography variant="h3" sx={{ flex: 1 }}>
          {editing ? t('blockedTime.editTitle') : t('blockedTime.addTitle')}
        </Typography>
        <IconButton onClick={onClose}><CloseRounded /></IconButton>
      </Box>
      <Stack spacing={2.5} sx={{ p: 3, flex: 1, overflowY: 'auto', maxHeight: '70vh' }}>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <TextField select label={t('form.type')} fullWidth value={field.value} onChange={field.onChange}>
              {BLOCK_TYPES.map((bt) => (
                <MenuItem key={bt} value={bt}>{blockTypeLabels[bt]}</MenuItem>
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

        <Controller
          name="end"
          control={control}
          render={({ field }) => (
            <TimePicker
              label={t('form.endTime')}
              value={field.value}
              onChange={field.onChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                  error: !!errors.end,
                  helperText: errors.end?.message,
                },
              }}
            />
          )}
        />

        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <TextField
              label={t('form.notes')}
              fullWidth
              multiline
              rows={2}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </Stack>
      <Box sx={{ p: 2.5, borderTop: '1px solid', borderColor: 'divider', display: 'flex', gap: 1 }}>
        {editing && (
          <Button variant="outlined" color="error" onClick={() => { onDelete(editing.id); onClose() }}>
            {common('delete')}
          </Button>
        )}
        <Button variant="outlined" fullWidth onClick={onClose}>{common('cancel')}</Button>
        <Button variant="contained" fullWidth onClick={handleSubmit(onSubmit)}>{common('save')}</Button>
      </Box>
    </Dialog>
  )
}
