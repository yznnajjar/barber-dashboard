import styled from 'styled-components'
import { COLORS } from '@/lib/colors'

export const QueueGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 16px;
  align-items: start;
`

export const HeroCaption = styled.div`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: ${COLORS.ink60};
  text-transform: uppercase;
`

/* The giant Playfair position number with the brand gradient fill */
export const HeroNumber = styled.div`
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 220px;
  line-height: 0.9;
  letter-spacing: -0.04em;
  margin: 8px 0;
  background: linear-gradient(180deg, ${COLORS.prince60}, ${COLORS.prince} 50%, ${COLORS.princeDark});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`

export const HeroName = styled.div`
  font-weight: 700;
  font-size: 18px;
`

export const WaitList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const PositionBadge = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${COLORS.prince};
  color: ${COLORS.white};
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 15px;
  flex-shrink: 0;
`

export const WaitMeta = styled.div`
  text-align: end;
`
