'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useIsFetching } from '@tanstack/react-query'
import { CircularProgress, Box } from '@mui/material'

export default function RouteProgressBar() {
  const pathname = usePathname()
  const isFetching = useIsFetching()

  // Briefly true on every route change (covers gap before queries fire)
  const [routeChanging, setRouteChanging] = useState(false)

  useEffect(() => {
    setRouteChanging(true)
    const t = setTimeout(() => setRouteChanging(false), 400)
    return () => clearTimeout(t)
  }, [pathname])

  const visible = routeChanging || isFetching > 0

  if (!visible) return null

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <CircularProgress size={40} thickness={4} />
    </Box>
  )
}
