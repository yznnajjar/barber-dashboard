import styled from 'styled-components'
import { COLORS } from '@/lib/colors'

export const SubName = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${COLORS.ink40};
`

export const DrawerHead = styled.div`
  padding: 18px 24px;
  border-bottom: 1px solid ${COLORS.ink20};
  display: flex;
  align-items: center;
  gap: 12px;
`

export const DrawerFoot = styled.div`
  padding: 14px 24px;
  border-top: 1px solid ${COLORS.ink20};
  display: flex;
  gap: 8px;
`
