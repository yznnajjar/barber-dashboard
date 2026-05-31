'use client'
import { Alert } from '@mui/material'

export default function ErrorState({ message }: { message?: string }) {
  return (
    <Alert severity="error" sx={{ borderRadius: 2 }}>
      {message ?? 'Something went wrong while loading this page.'}
    </Alert>
  )
}
