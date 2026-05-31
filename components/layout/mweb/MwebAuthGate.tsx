'use client'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useMwebRouter } from '@/hooks/shared/useMwebRouter'
import { ROUTE_MWEB_LOGIN } from '@/constants'
import { CircularProgress, Box } from '@mui/material'

/** mweb counterpart of AuthGate: guards mweb pages, sends to /mweb/login?lang=. */
export default function MwebAuthGate({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((s) => s.token)
  const { replace } = useMwebRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!token) replace(ROUTE_MWEB_LOGIN)
    else setReady(true)
  }, [token, replace])

  if (!ready) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100dvh' }}>
        <CircularProgress />
      </Box>
    )
  }
  return <>{children}</>
}
