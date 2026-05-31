import styled from 'styled-components'
import { COLORS } from '@/lib/colors'

export const AppGrid = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${COLORS.pebble};
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
`

export const Page = styled.main`
  padding: 28px 32px 64px;
  flex: 1;
  overflow-x: hidden;
`
