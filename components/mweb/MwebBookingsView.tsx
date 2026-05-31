'use client'
import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Skeleton } from '@mui/material'
import { useBookings } from '@/hooks/queries/useBookings'
import { MOCK_SALON_ID } from '@/constants'
import { formatTime12 } from '@/lib/utils'
import StatusChip from '@/components/shared/StatusChip'
import UserAvatar from '@/components/shared/UserAvatar'
import EmptyState from '@/components/shared/EmptyState'
import EventBusyRounded from '@mui/icons-material/EventBusyRounded'
import { RowList } from './MwebDashboardView.styled'
import styled from 'styled-components'
import { COLORS } from '@/lib/colors'
import type { BookingStatus } from '@/types'

const Filters = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 2px;
  &::-webkit-scrollbar { display: none; }
`
const FilterPill = styled.button<{ $active?: boolean }>`
  flex-shrink: 0;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid ${({ $active }) => ($active ? COLORS.ink : COLORS.ink20)};
  background: ${({ $active }) => ($active ? COLORS.ink : COLORS.white)};
  color: ${({ $active }) => ($active ? COLORS.white : COLORS.ink80)};
`
const Time = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  color: ${COLORS.ink60};
  min-width: 64px;
  flex-shrink: 0;
`

type Filter = 'ALL' | BookingStatus

export default function MwebBookingsView() {
  const t = useTranslations('common')
  const [filter, setFilter] = useState<Filter>('ALL')
  const { data: bookings, isLoading } = useBookings(MOCK_SALON_ID)

  const filters: Filter[] = ['ALL', 'CONFIRMED', 'PENDING', 'COMPLETED', 'CANCELLED']

  const list = useMemo(() => {
    const all = (bookings ?? []).slice().sort((a, b) => a.startTime.localeCompare(b.startTime))
    return filter === 'ALL' ? all : all.filter((b) => b.status === filter)
  }, [bookings, filter])

  return (
    <>
      <Filters>
        {filters.map((f) => (
          <FilterPill key={f} $active={filter === f} onClick={() => setFilter(f)}>
            {f === 'ALL' ? t('viewAll') : f.charAt(0) + f.slice(1).toLowerCase()}
          </FilterPill>
        ))}
      </Filters>

      {isLoading ? (
        <Skeleton variant="rounded" height={300} sx={{ borderRadius: '14px' }} />
      ) : list.length === 0 ? (
        <EmptyState icon={<EventBusyRounded />} title={t('noData')} />
      ) : (
        <RowList>
          {list.map((b) => (
            <div className="item" key={b.id}>
              <Time>{formatTime12(b.startTime)}</Time>
              <UserAvatar name={b.customerName} color={b.avatarColor} size="sm" />
              <div className="grow">
                <div className="name">{b.customerName}</div>
                <div className="svc">{b.serviceName}</div>
              </div>
              <StatusChip status={b.status} />
            </div>
          ))}
        </RowList>
      )}
    </>
  )
}
