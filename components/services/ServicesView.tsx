'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Box, Card, Button, Skeleton } from '@mui/material'
import AddRounded from '@mui/icons-material/AddRounded'
import ContentCutRounded from '@mui/icons-material/ContentCutRounded'
import { useServices } from '@/hooks/queries/useServices'
import { useDeleteService } from '@/hooks/mutations/useDeleteService'
import { MOCK_SALON_ID } from '@/constants'
import PageHeader from '@/components/shared/PageHeader'
import EmptyState from '@/components/shared/EmptyState'
import ErrorState from '@/components/shared/ErrorState'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import ServicesTable from './ServicesTable'
import ServiceFormDrawer from './ServiceFormDrawer'
import type { Service } from '@/types'

export default function ServicesView() {
  const t = useTranslations('services')
  const common = useTranslations('common')
  const { data: services, isLoading, isError } = useServices(MOCK_SALON_ID)
  const remove = useDeleteService()

  const [editing, setEditing] = useState<Service | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [toDelete, setToDelete] = useState<Service | null>(null)

  const openDrawer = (svc?: Service) => { setEditing(svc ?? null); setDrawerOpen(true) }

  if (isError) return <ErrorState />

  return (
    <Box>
      <PageHeader
        title={t('title')}
        subtitle={`${services?.length ?? 0} services`}
        action={<Button variant="outlined" startIcon={<AddRounded />} onClick={() => openDrawer()}>{t('addService')}</Button>}
      />

      <Card sx={{ p: 0, overflow: 'hidden' }}>
        {isLoading ? (
          <Box sx={{ p: 2 }}>{[0, 1, 2, 3].map((i) => <Skeleton key={i} height={52} />)}</Box>
        ) : services && services.length > 0 ? (
          <ServicesTable services={services} onEdit={openDrawer} onDelete={setToDelete} />
        ) : (
          <EmptyState
            icon={<ContentCutRounded />}
            title={t('empty')}
            action={<Button variant="contained" startIcon={<AddRounded />} onClick={() => openDrawer()}>{t('addService')}</Button>}
          />
        )}
      </Card>

      <ServiceFormDrawer open={drawerOpen} editing={editing} onClose={() => setDrawerOpen(false)} />

      <ConfirmDialog
        open={!!toDelete}
        title={`${common('delete')} "${toDelete?.name ?? ''}"?`}
        message="This service will be removed from your menu. This can't be undone."
        confirmLabel={common('delete')}
        danger
        onConfirm={() => { if (toDelete) remove.mutate(toDelete.id) }}
        onClose={() => setToDelete(null)}
      />
    </Box>
  )
}
