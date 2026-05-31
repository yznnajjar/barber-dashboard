import styled from 'styled-components'
import { COLORS } from '@/lib/colors'

const SIZES: Record<string, { box: number; font: number }> = {
  sm: { box: 24, font: 10 },
  md: { box: 32, font: 12 },
  lg: { box: 48, font: 17 },
  xl: { box: 64, font: 22 },
  xxl: { box: 80, font: 28 },
}

export const AvatarRoot = styled.div<{ $gradient: string; $size: string }>`
  width: ${({ $size }) => SIZES[$size].box}px;
  height: ${({ $size }) => SIZES[$size].box}px;
  font-size: ${({ $size }) => SIZES[$size].font}px;
  border-radius: 50%;
  background: ${({ $gradient }) => $gradient};
  color: ${COLORS.white};
  display: grid;
  place-items: center;
  font-weight: 700;
  flex-shrink: 0;
  overflow: hidden;
  user-select: none;
`
