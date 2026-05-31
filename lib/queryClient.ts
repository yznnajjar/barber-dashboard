import { QueryClient } from '@tanstack/react-query'
import { STALE_TIME_DEFAULT } from '@/constants'

export const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { staleTime: STALE_TIME_DEFAULT, retry: 1, refetchOnWindowFocus: false },
    },
  })
