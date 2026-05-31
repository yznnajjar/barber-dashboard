'use client'
import { useTranslations } from 'next-intl'
import CallRounded from '@mui/icons-material/CallRounded'
import CloseRounded from '@mui/icons-material/CloseRounded'
import ContentCutRounded from '@mui/icons-material/ContentCutRounded'
import { formatDuration } from '@/lib/utils'
import UserAvatar from '@/components/shared/UserAvatar'
import styled from 'styled-components'
import { COLORS } from '@/lib/colors'
import type { QueueEntry } from '@/types'

const Scrim = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(6, 9, 17, 0.4);
  z-index: 100;
  animation: mwFade 0.18s ease;
  @keyframes mwFade { from { opacity: 0; } }
`
const Sheet = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 100%;
  max-width: 520px;
  z-index: 110;
  background: ${COLORS.white};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 20px 20px calc(28px + env(safe-area-inset-bottom));
  animation: mwSheet 0.24s cubic-bezier(0.2, 0.8, 0.2, 1);

  &::before {
    content: '';
    width: 36px; height: 4px;
    background: ${COLORS.ink20};
    border-radius: 999px;
    display: block;
    margin: -4px auto 16px;
  }
  @keyframes mwSheet { from { transform: translate(-50%, 20px); opacity: 0; } }

  .head { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
  .head .grow { flex: 1; min-width: 0; }
  .head .name { font-size: 18px; font-weight: 700; }
  .head .svc { font-size: 13px; color: ${COLORS.ink60}; display: flex; align-items: center; gap: 5px; margin-top: 2px; }
  .actions { display: flex; flex-direction: column; gap: 10px; }
`
const SheetBtn = styled.button<{ $variant?: 'lime' | 'plain' | 'danger' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 52px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid ${COLORS.ink20};
  background: ${({ $variant }) =>
    $variant === 'lime' ? COLORS.limelight : COLORS.white};
  color: ${({ $variant }) =>
    $variant === 'danger' ? COLORS.error : COLORS.ink};
  border-color: ${({ $variant }) =>
    $variant === 'lime' ? COLORS.limelight : COLORS.ink20};
  &:active { transform: scale(0.99); }
`

interface Props {
  entry: QueueEntry | null
  onClose: () => void
  onCallNext: () => void
  onRemove: (id: string) => void
}

export default function MwebActionSheet({ entry, onClose, onCallNext, onRemove }: Props) {
  const t = useTranslations('queue')
  const tc = useTranslations('common')
  if (!entry) return null

  return (
    <>
      <Scrim onClick={onClose} />
      <Sheet>
        <div className="head">
          <UserAvatar name={entry.customerName} color={entry.avatarColor} size="lg" />
          <div className="grow">
            <div className="name">{entry.customerName}</div>
            <div className="svc"><ContentCutRounded sx={{ fontSize: 15 }} />{entry.serviceName} · {formatDuration(entry.estimatedWait)}</div>
          </div>
        </div>
        <div className="actions">
          <SheetBtn $variant="lime" onClick={onCallNext}><CallRounded sx={{ fontSize: 19 }} />{t('callNext')}</SheetBtn>
          <SheetBtn $variant="danger" onClick={() => onRemove(entry.id)}><CloseRounded sx={{ fontSize: 19 }} />{tc('delete')}</SheetBtn>
          <SheetBtn $variant="plain" onClick={onClose}>{tc('close')}</SheetBtn>
        </div>
      </Sheet>
    </>
  )
}
