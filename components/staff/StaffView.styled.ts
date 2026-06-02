import styled from 'styled-components'
import { COLORS } from '@/lib/colors'

export const StaffGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
`

export const SectionLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: ${COLORS.ink60};
  text-transform: uppercase;
`

export const ChipWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
  margin-bottom: 24px;
`

export const HourRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const DayLabel = styled.div`
  width: 40px;
  font-weight: 600;
`

export const DrawerHead = styled.div`
  padding: 18px 24px;
  border-bottom: 1px solid ${COLORS.ink20};
  display: flex;
  align-items: center;
  gap: 16px;
`

export const DrawerFoot = styled.div`
  padding: 14px 24px;
  border-top: 1px solid ${COLORS.ink20};
  display: flex;
  gap: 8px;
`
