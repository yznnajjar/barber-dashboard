'use client'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from '@/i18n/routing'
import { ROUTE_LOGIN } from '@/constants'
import { CircularProgress, Box } from '@mui/material'

// Client-side guard. (Production: prefer Next.js middleware token check per §8.)
export default function AuthGate({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((s) => s.token)
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!token) router.replace(ROUTE_LOGIN)
    else setReady(true)
  }, [token, router])

  if (!ready) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }
  return <>{children}</>
}
