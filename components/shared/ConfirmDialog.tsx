'use client'
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button,
} from '@mui/material'
import { useTranslations } from 'next-intl'

interface Props {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  danger?: boolean
  onConfirm: () => void
  onClose: () => void
}

// Destructive actions must confirm before the mutation fires (CLAUDE-code.md §11).
export default function ConfirmDialog({
  open, title, message, confirmLabel, danger, onConfirm, onClose,
}: Props) {
  const common = useTranslations('common')
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 2, width: 400, maxWidth: '100%' } }}>
      <DialogTitle sx={{ fontWeight: 700 }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'text.secondary' }}>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button variant="outlined" onClick={onClose}>{common('cancel')}</Button>
        <Button
          variant="contained"
          color={danger ? 'error' : 'primary'}
          onClick={() => { onConfirm(); onClose() }}
        >
          {confirmLabel ?? common('confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
