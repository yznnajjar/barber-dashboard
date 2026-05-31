'use client'
import { useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider as StyledProvider } from 'styled-components'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { makeQueryClient } from '@/lib/queryClient'
import { theme } from '@/lib/theme'
import StyledRegistry from './StyledRegistry'

export default function Providers({
  children,
  dir,
}: {
  children: React.ReactNode
  dir: 'ltr' | 'rtl'
}) {
  const [queryClient] = useState(makeQueryClient)

  return (
    <AppRouterCacheProvider options={{ key: dir === 'rtl' ? 'mui-rtl' : 'mui' }}>
      <StyledRegistry>
        <MuiThemeProvider theme={theme}>
          <StyledProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CssBaseline />
              <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </LocalizationProvider>
          </StyledProvider>
        </MuiThemeProvider>
      </StyledRegistry>
    </AppRouterCacheProvider>
  )
}
