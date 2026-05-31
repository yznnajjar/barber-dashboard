'use client'
import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import CloseRounded from '@mui/icons-material/CloseRounded'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { formatDuration } from '@/lib/utils'
import UserAvatar from '@/components/shared/UserAvatar'
import styled from 'styled-components'
import { COLORS } from '@/lib/colors'
import type { QueueEntry } from '@/types'

const SWIPE_MAX = 88

const Wrap = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid ${COLORS.ink20};
  background: ${COLORS.error};
`
const CancelLayer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
  color: ${COLORS.white};
  font-weight: 700;
  font-size: 13px;
  gap: 6px;
`
const Body = styled.div<{ $dx: number; $dragging: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: ${COLORS.white};
  transform: translateX(${({ $dx }) => $dx}px);
  transition: ${({ $dragging }) => ($dragging ? 'none' : 'transform 0.22s cubic-bezier(0.2,0.8,0.2,1)')};
  touch-action: pan-y;

  .pos {
    width: 36px; height: 36px; border-radius: 50%;
    background: ${COLORS.prince}; color: ${COLORS.white};
    font-weight: 700; font-size: 15px;
    display: grid; place-items: center; flex-shrink: 0;
  }
  .pos.next {
    background: ${COLORS.limelight}; color: ${COLORS.ink};
    box-shadow: 0 0 0 4px rgba(197, 255, 0, 0.25);
  }
  .grow { flex: 1; min-width: 0; }
  .name { font-weight: 600; }
  .svc { font-size: 12px; color: ${COLORS.ink60}; }
  .wait { text-align: end; flex-shrink: 0; }
  .wait .v { font-weight: 600; font-size: 13px; }
  .wait .j { font-size: 11px; color: ${COLORS.ink40}; }
`

interface Props {
  entry: QueueEntry
  isNext: boolean
  onRemove: (id: string) => void
  onTap: (entry: QueueEntry) => void
}

export default function MwebQueueRow({ entry, isNext, onRemove, onTap }: Props) {
  const tc = useTranslations('common')
  const startX = useRef(0)
  const [dx, setDx] = useState(0)
  const [dragging, setDragging] = useState(false)

  const onStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; setDragging(true) }
  const onMove = (e: React.TouchEvent) => {
    if (!dragging) return
    const delta = e.touches[0].clientX - startX.current
    if (delta < 0) setDx(Math.max(delta, -SWIPE_MAX))
  }
  const onEnd = () => {
    setDragging(false)
    if (dx < -SWIPE_MAX * 0.6) onRemove(entry.id)
    setDx(0)
  }

  return (
    <Wrap>
      <CancelLayer><CloseRounded sx={{ fontSize: 18 }} /> {tc('delete')}</CancelLayer>
      <Body
        $dx={dx}
        $dragging={dragging}
        onTouchStart={onStart}
        onTouchMove={onMove}
        onTouchEnd={onEnd}
        onClick={() => dx === 0 && onTap(entry)}
      >
        <div className={isNext ? 'pos next' : 'pos'}>{entry.position}</div>
        <UserAvatar name={entry.customerName} color={entry.avatarColor} />
        <div className="grow">
          <div className="name">{entry.customerName}</div>
          <div className="svc">{entry.serviceName}</div>
        </div>
        <div className="wait">
          <div className="v">{formatDuration(entry.estimatedWait)}</div>
          <div className="j">{formatDistanceToNow(parseISO(entry.joinedAt), { addSuffix: true })}</div>
        </div>
      </Body>
    </Wrap>
  )
}
