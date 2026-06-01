'use client'
import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Box, Card, TextField, InputAdornment, Skeleton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import SearchRounded from '@mui/icons-material/SearchRounded'
import { useClients } from '@/hooks/queries/useClients'
import { DEFAULT_PAGE_SIZE } from '@/constants'
import PageHeader from '@/components/shared/PageHeader'
import ErrorState from '@/components/shared/ErrorState'
import ClientProfileDrawer from './ClientProfileDrawer'
import { buildClientColumns } from './clientColumns'
import { SearchBar, DATAGRID_SX } from './ClientsView.styled'
import type { Client } from '@/types'

export default function ClientsView() {
  const t = useTranslations('clients')
  const { data: clients, isLoading, isError } = useClients()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Client | null>(null)

  const columns = useMemo(() => buildClientColumns(t), [t])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return clients ?? []
    return (clients ?? []).filter((c) => c.name.toLowerCase().includes(q) || c.phone.includes(q))
  }, [clients, query])

  if (isError) return <ErrorState />

  return (
    <Box>
      <PageHeader title={t('title')} subtitle={`${clients?.length ?? 0} clients`} />

      <Card sx={{ p: 0 }}>
        <SearchBar>
          <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            sx={{ width: 320, maxWidth: '100%' }}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchRounded sx={{ fontSize: 18 }} /></InputAdornment> }}
          />
        </SearchBar>
        {isLoading ? (
          <Box sx={{ p: 2 }}>{[0, 1, 2, 3, 4].map((i) => <Skeleton key={i} height={48} />)}</Box>
        ) : (
          <DataGrid
            autoHeight
            rows={filtered}
            columns={columns}
            disableRowSelectionOnClick
            onRowClick={(p) => setSelected(p.row as Client)}
            initialState={{ pagination: { paginationModel: { pageSize: DEFAULT_PAGE_SIZE } } }}
            pageSizeOptions={[10, 20, 50]}
            sx={DATAGRID_SX}
          />
        )}
      </Card>

      <ClientProfileDrawer client={selected} onClose={() => setSelected(null)} />
    </Box>
  )
}
