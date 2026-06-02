import styled from 'styled-components'
import { COLORS } from '@/lib/colors'

/* Top-services horizontal bars */
export const Bar = styled.div``

export const BarRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`

export const BarTrack = styled.div`
  height: 8px;
  border-radius: 999px;
  background: ${COLORS.pebble};
  overflow: hidden;
`

export const BarFill = styled.div`
  height: 100%;
  background: ${COLORS.prince};
  border-radius: 999px;
`

/* Busy-hours heatmap (40px label column + 12 slot columns) */
export const HeatGrid = styled.div`
  display: grid;
  grid-template-columns: 70px repeat(12, 1fr);
  gap: 4px;
`

export const HeatRowGroup = styled.div`
  display: contents;
`

export const HeatLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: ${COLORS.ink60};
  display: flex;
  align-items: center;
  padding-inline-end: 6px;
`

export const HeatSlotLabel = styled.div`
  font-size: 10px;
  color: ${COLORS.ink40};
  text-align: center;
  padding-bottom: 4px;
`

export const HeatCell = styled.div`
  aspect-ratio: 1.4;
  border-radius: 4px;
`

/* Top-clients list rows */
export const ClientRow = styled.div<{ $last?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: ${({ $last }) => ($last ? 'none' : `1px solid ${COLORS.ink20}`)};
`
