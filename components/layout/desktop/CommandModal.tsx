'use client'
import { useMemo, useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'
import { Box, Modal, InputBase, Typography } from '@mui/material'
import SearchRounded from '@mui/icons-material/SearchRounded'
import GridViewRounded from '@mui/icons-material/GridViewRounded'
import CalendarMonthRounded from '@mui/icons-material/CalendarMonthRounded'
import GroupsRounded from '@mui/icons-material/GroupsRounded'
import ContentCutRounded from '@mui/icons-material/ContentCutRounded'
import BadgeRounded from '@mui/icons-material/BadgeRounded'
import InsightsRounded from '@mui/icons-material/InsightsRounded'
import PeopleAltRounded from '@mui/icons-material/PeopleAltRounded'
import { useClients } from '@/hooks/queries/useClients'
import {
  ROUTE_DASHBOARD, ROUTE_CALENDAR, ROUTE_QUEUE,
  ROUTE_SERVICES, ROUTE_STAFF, ROUTE_ANALYTICS, ROUTE_CLIENTS,
} from '@/constants'
import UserAvatar from '@/components/shared/UserAvatar'

interface Item {
  label: string
  sub: string
  icon: React.ReactNode
  href: string
}

export default function CommandModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const nav = useTranslations('nav')
  const common = useTranslations('common')
  const router = useRouter()
  const [q, setQ] = useState('')
  const { data: clients } = useClients()

  useEffect(() => { if (!open) setQ('') }, [open])

  const pages: Item[] = [
    { label: nav('dashboard'), sub: 'Page', icon: <GridViewRounded />, href: ROUTE_DASHBOARD },
    { label: nav('calendar'), sub: 'Page', icon: <CalendarMonthRounded />, href: ROUTE_CALENDAR },
    { label: nav('queue'), sub: 'Page', icon: <GroupsRounded />, href: ROUTE_QUEUE },
    { label: nav('services'), sub: 'Page', icon: <ContentCutRounded />, href: ROUTE_SERVICES },
    { label: nav('staff'), sub: 'Page', icon: <BadgeRounded />, href: ROUTE_STAFF },
    { label: nav('analytics'), sub: 'Page', icon: <InsightsRounded />, href: ROUTE_ANALYTICS },
    { label: nav('clients'), sub: 'Page', icon: <PeopleAltRounded />, href: ROUTE_CLIENTS },
  ]

  const results = useMemo(() => {
    const query = q.trim().toLowerCase()
    const clientItems: Item[] = (clients ?? []).map((c) => ({
      label: c.name, sub: c.phone, icon: <UserAvatar name={c.name} color={c.avatarColor} size="sm" />, href: ROUTE_CLIENTS,
    }))
    const all = [...pages, ...clientItems]
    if (!query) return pages
    return all.filter((i) => i.label.toLowerCase().includes(query) || i.sub.toLowerCase().includes(query))
  }, [q, clients]) // eslint-disable-line react-hooks/exhaustive-deps

  const go = (href: string) => { onClose(); router.push(href) }

  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(6,9,17,0.40)' } } }}
      sx={{ display: 'grid', placeItems: 'start center', pt: '12vh' }}
    >
      <Box sx={{ width: 520, maxWidth: '92vw', bgcolor: 'background.paper', borderRadius: '16px', boxShadow: '0 16px 48px rgba(6,9,17,0.22)', overflow: 'hidden', outline: 'none' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <SearchRounded sx={{ color: 'text.secondary' }} />
          <InputBase autoFocus fullWidth placeholder={`${common('search')} pages, clients…`} value={q} onChange={(e) => setQ(e.target.value)} sx={{ fontSize: 15 }} />
          <Typography variant="caption" sx={{ color: 'text.disabled', border: '1px solid', borderColor: 'divider', borderRadius: 1, px: 0.75 }}>ESC</Typography>
        </Box>
        <Box sx={{ maxHeight: 360, overflowY: 'auto', py: 1 }}>
          {results.length === 0 ? (
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 4 }}>{common('noData')}</Typography>
          ) : (
            results.map((i, idx) => (
              <Box key={`${i.href}-${idx}`} onClick={() => go(i.href)} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.25, cursor: 'pointer', '&:hover': { bgcolor: 'background.default' } }}>
                <Box sx={{ width: 32, height: 32, display: 'grid', placeItems: 'center', color: 'primary.main' }}>{i.icon}</Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{i.label}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 400 }}>{i.sub}</Typography>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Modal>
  )
}
