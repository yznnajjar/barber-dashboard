import styled from 'styled-components'
import { COLORS } from '@/lib/colors'

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 16px;
`

export const CardHead = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid ${COLORS.ink20};
  display: flex;
  align-items: center;
`

export const ApptRow = styled.div<{ $last?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: ${({ $last }) => ($last ? 'none' : `1px solid ${COLORS.ink20}`)};
`

export const ApptTime = styled.div`
  font-size: 12px;
  font-weight: 600;
  width: 70px;
  text-align: end;
`

export const ActivityRow = styled.div<{ $last?: boolean }>`
  display: flex;
  gap: 12px;
  padding: 10px 0;
  align-items: flex-start;
  border-bottom: ${({ $last }) => ($last ? 'none' : `1px solid ${COLORS.ink20}`)};
`

const DOT_COLOR: Record<string, string> = {
  cancel: COLORS.error,
  payment: COLORS.success,
  booking: COLORS.prince,
  queue: COLORS.prince,
  review: COLORS.prince,
}

export const ActivityDot = styled.div<{ $type: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
  background: ${({ $type }) => DOT_COLOR[$type] ?? COLORS.prince};
`
