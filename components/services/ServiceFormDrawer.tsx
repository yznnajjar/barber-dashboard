'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Drawer, Typography, IconButton, TextField, Button, Stack } from '@mui/material'
import CloseRounded from '@mui/icons-material/CloseRounded'
import { useCreateService } from '@/hooks/mutations/useCreateService'
import { useUpdateService } from '@/hooks/mutations/useUpdateService'
import { DrawerHead, DrawerFoot } from './ServicesView.styled'
import type { Service } from '@/types'

const BLANK = { name: '', name_ar: '', duration: 30, price: 0, isActive: true }

interface Props {
  open: boolean
  editing: Service | null
  onClose: () => void
}

export default function ServiceFormDrawer({ open, editing, onClose }: Props) {
  const t = useTranslations('services')
  const common = useTranslations('common')
  const create = useCreateService()
  const update = useUpdateService()
  const [form, setForm] = useState(BLANK)

  useEffect(() => {
    setForm(editing
      ? { name: editing.name, name_ar: editing.name_ar, duration: editing.duration, price: editing.price, isActive: editing.isActive }
      : BLANK)
  }, [editing, open])

  const save = () => {
    if (!form.name.trim()) return
    if (editing) update.mutate({ ...editing, ...form })
    else create.mutate(form)
    onClose()
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: 440 } }}>
      <DrawerHead>
        <Typography variant="h3" sx={{ flex: 1 }}>{editing ? t('editService') : t('addService')}</Typography>
        <IconButton onClick={onClose}><CloseRounded /></IconButton>
      </DrawerHead>
      <Stack spacing={2.5} sx={{ p: 3, flex: 1 }}>
        <TextField label={`${t('name')} (EN)`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth />
        <TextField label={`${t('name')} (AR)`} value={form.name_ar} onChange={(e) => setForm({ ...form, name_ar: e.target.value })} fullWidth dir="rtl" />
        <TextField label={`${t('duration')} (min)`} type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })} fullWidth />
        <TextField label={`${t('price')} (JD)`} type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} fullWidth />
      </Stack>
      <DrawerFoot>
        <Button variant="outlined" fullWidth onClick={onClose}>{common('cancel')}</Button>
        <Button variant="contained" fullWidth onClick={save}>{common('save')}</Button>
      </DrawerFoot>
    </Drawer>
  )
}
