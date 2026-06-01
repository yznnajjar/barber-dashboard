'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  RadioGroup, FormControlLabel, Radio, TextField, Box,
} from '@mui/material'

const REASONS = [
  'Client request',
  'Staff unavailable',
  'Double booking',
  'Other',
]

interface Props {
  open: boolean
  clientName: string
  onConfirm: (reason: string) => void
  onClose: () => void
}

export default function CancelBookingDialog({ open, clientName, onConfirm, onClose }: Props) {
  const t = useTranslations('calendar')
  const common = useTranslations('common')
  const [reason, setReason] = useState(REASONS[0])
  const [customReason, setCustomReason] = useState('')

  const handleConfirm = () => {
    const final = reason === 'Other' ? customReason.trim() || 'Other' : reason
    onConfirm(final)
    setReason(REASONS[0])
    setCustomReason('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 2, width: 420, maxWidth: '100%' } }}>
      <DialogTitle sx={{ fontWeight: 700 }}>{t('cancelTitle')}</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2, color: 'text.secondary', fontSize: 14 }}>
          {t('cancelMessage', { name: clientName })}
        </Box>
        <RadioGroup value={reason} onChange={(e) => setReason(e.target.value)}>
          {REASONS.map((r) => (
            <FormControlLabel key={r} value={r} control={<Radio size="small" />} label={r} />
          ))}
        </RadioGroup>
        {reason === 'Other' && (
          <TextField
            fullWidth
            size="small"
            placeholder="Describe the reason…"
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            sx={{ mt: 1 }}
          />
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button variant="outlined" onClick={onClose}>{common('cancel')}</Button>
        <Button variant="contained" color="error" onClick={handleConfirm}>
          {t('cancelBooking')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
