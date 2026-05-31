import styled from 'styled-components'
import { COLORS } from '@/lib/colors'

export const SubName = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${COLORS.ink40};
`

export const DrawerHead = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${COLORS.ink20};
  display: flex;
  align-items: center;
`

export const DrawerFoot = styled.div`
  padding: 20px;
  border-top: 1px solid ${COLORS.ink20};
  display: flex;
  gap: 8px;
`
