'use client'
import { useMemo, useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@mui/material'
import ContentCutRounded from '@mui/icons-material/ContentCutRounded'
import { useStaff } from '@/hooks/queries/useStaff'
import { MOCK_SALON_ID } from '@/constants'
import { formatTime12, timeToMinutes, minutesToTime } from '@/lib/utils'
import { START_HOUR, END_HOUR, SNAP_MINUTES } from '@/components/calendar/calendarConfig'
import UserAvatar from '@/components/shared/UserAvatar'
import styled from 'styled-components'
import { COLORS } from '@/lib/colors'
import type { Booking } from '@/types'

const Scrim = styled.div`
  position: fixed; inset: 0; background: rgba(6, 9, 17, 0.4); z-index: 100;
  animation: mwFade 0.18s ease; @keyframes mwFade { from { opacity: 0; } }
`
const Sheet = styled.div`
  position: fixed; left: 50%; transform: translateX(-50%); bottom: 0;
  width: 100%; max-width: 520px; z-index: 110;
  background: ${COLORS.white};
  border-top-left-radius: 24px; border-top-right-radius: 24px;
  padding: 20px 20px calc(28px + env(safe-area-inset-bottom));
  animation: mwSheet 0.24s cubic-bezier(0.2, 0.8, 0.2, 1);
  &::before { content: ''; width: 36px; height: 4px; background: ${COLORS.ink20}; border-radius: 999px; display: block; margin: -4px auto 16px; }
  @keyframes mwSheet { from { transform: translate(-50%, 20px); opacity: 0; } }

  .head { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
  .head .grow { flex: 1; min-width: 0; }
  .head .name { font-size: 18px; font-weight: 700; }
  .head .svc { font-size: 13px; color: ${COLORS.ink60}; display: flex; align-items: center; gap: 5px; margin-top: 2px; }
  .lbl { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: ${COLORS.ink60}; margin: 4px 2px 8px; }
`
const TimeScroll = styled.div`
  display: flex; gap: 8px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 14px;
  &::-webkit-scrollbar { display: none; }
`
const TimeCell = styled.button<{ $active?: boolean }>`
  flex-shrink: 0; min-width: 64px; padding: 9px 0; border-radius: 10px;
  border: 1px solid ${({ $active }) => ($active ? COLORS.ink : COLORS.ink20)};
  background: ${({ $active }) => ($active ? COLORS.ink : COLORS.white)};
  color: ${({ $active }) => ($active ? COLORS.white : COLORS.ink)};
  font-size: 13px; font-weight: 700; font-family: 'JetBrains Mono', monospace; cursor: pointer;
`
const StaffRow = styled.div`
  display: flex; gap: 8px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 18px;
  &::-webkit-scrollbar { display: none; }
`
const StaffPick = styled.button<{ $active?: boolean }>`
  flex-shrink: 0; display: inline-flex; align-items: center; gap: 6px;
  border-radius: 999px; padding: 5px 12px 5px 5px;
  border: 1px solid ${({ $active }) => ($active ? COLORS.prince : COLORS.ink20)};
  background: ${({ $active }) => ($active ? COLORS.prince20 : COLORS.white)};
  color: ${({ $active }) => ($active ? COLORS.prince : COLORS.ink80)};
  font-size: 12px; font-weight: 600; cursor: pointer;
`

interface Props {
  booking: Booking | null
  onClose: () => void
  onSave: (next: { id: string; startTime: string; endTime: string; staffId: string }) => void
}

export default function MwebRescheduleSheet({ booking, onClose, onSave }: Props) {
  const tc = useTranslations('common')
  const { data: staff } = useStaff(MOCK_SALON_ID)

  const [startMin, setStartMin] = useState(0)
  const [staffId, setStaffId] = useState('')

  useEffect(() => {
    if (booking) {
      setStartMin(timeToMinutes(booking.startTime))
      setStaffId(booking.staffId)
    }
  }, [booking])

  const duration = booking ? timeToMinutes(booking.endTime) - timeToMinutes(booking.startTime) : 0

  // Selectable start times every SNAP_MINUTES, keeping the whole booking in-grid.
  const slots = useMemo(() => {
    const out: number[] = []
    const last = END_HOUR * 60 - duration
    for (let m = START_HOUR * 60; m <= last; m += SNAP_MINUTES) out.push(m)
    return out
  }, [duration])

  if (!booking) return null

  const save = () =>
    onSave({
      id: booking.id,
      startTime: minutesToTime(startMin),
      endTime: minutesToTime(startMin + duration),
      staffId,
    })

  return (
    <>
      <Scrim onClick={onClose} />
      <Sheet>
        <div className="head">
          <UserAvatar name={booking.customerName} color={booking.avatarColor} size="lg" />
          <div className="grow">
            <div className="name">{booking.customerName}</div>
            <div className="svc"><ContentCutRounded sx={{ fontSize: 15 }} />{booking.serviceName}</div>
          </div>
        </div>

        <div className="lbl">Start time</div>
        <TimeScroll>
          {slots.map((m) => (
            <TimeCell key={m} $active={m === startMin} onClick={() => setStartMin(m)}>
              {formatTime12(minutesToTime(m))}
            </TimeCell>
          ))}
        </TimeScroll>

        <div className="lbl">Barber</div>
        <StaffRow>
          {staff?.map((m) => (
            <StaffPick key={m.id} $active={m.id === staffId} onClick={() => setStaffId(m.id)}>
              <UserAvatar name={m.name} color={m.avatarColor} size="sm" />
              {m.name.split(' ')[0]}
            </StaffPick>
          ))}
        </StaffRow>

        <Button fullWidth variant="contained" onClick={save} sx={{ height: 52, borderRadius: '12px', fontSize: 15 }}>
          {tc('save')}
        </Button>
      </Sheet>
    </>
  )
}
