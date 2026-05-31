import { Box, Typography } from '@mui/material'
import type { GridColDef } from '@mui/x-data-grid'
import { formatJD, formatDate } from '@/lib/utils'
import UserAvatar from '@/components/shared/UserAvatar'
import type { Client } from '@/types'

// Column definitions factored out of the view. `t` is the clients-namespace translator.
export const buildClientColumns = (t: (k: string) => string): GridColDef<Client>[] => [
  {
    field: 'name', headerName: t('name'), flex: 1.4, minWidth: 200,
    renderCell: (p) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, height: '100%' }}>
        <UserAvatar name={p.row.name} color={p.row.avatarColor} size="sm" />
        <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{p.row.name}</Typography>
      </Box>
    ),
  },
  { field: 'phone', headerName: t('phone'), flex: 1, minWidth: 150 },
  { field: 'totalVisits', headerName: t('visits'), width: 90, type: 'number' },
  {
    field: 'lastVisit', headerName: t('lastVisit'), width: 130,
    valueFormatter: (v) => formatDate(v as string),
  },
  {
    field: 'totalSpend', headerName: t('spend'), width: 130, type: 'number',
    renderCell: (p) => <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{formatJD(p.row.totalSpend)}</Typography>,
  },
]
