import styled from 'styled-components'
import { COLORS } from '@/lib/colors'

export const Greeting = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  .sub { font-size: 12px; color: ${COLORS.ink60}; }
  h1 {
    font-family: 'Playfair Display', 'Noto Sans Arabic', serif;
    font-weight: 700;
    font-size: 26px;
    line-height: 1.1;
    letter-spacing: -0.01em;
    margin: 2px 0 0;
  }
`

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`

export const HeroCard = styled.div`
  background: ${COLORS.ink};
  color: ${COLORS.white};
  border-radius: 16px;
  padding: 16px;

  .meta { color: rgba(255, 255, 255, 0.7); font-size: 13px; display: flex; align-items: center; gap: 6px; margin-top: 4px; }
  .wait { color: ${COLORS.limelight}; font-size: 12px; margin-top: 2px; font-weight: 600; }
  .next-chip {
    background: ${COLORS.limelight};
    color: ${COLORS.ink};
    font-size: 11px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 999px;
  }
`

export const OpenChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: ${COLORS.successBg};
  color: ${COLORS.successDark};
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  white-space: nowrap;

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${COLORS.success};
  }
`

export const RowList = styled.div`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.ink20};
  border-radius: 14px;
  overflow: hidden;

  .item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-bottom: 1px solid ${COLORS.ink20};
    cursor: pointer;
    &:last-child { border-bottom: none; }
    &:active { background: ${COLORS.pebble}; }
    .grow { flex: 1; min-width: 0; }
    .name { font-weight: 600; font-size: 15px; }
    .svc { font-size: 12px; color: ${COLORS.ink60}; }
    .meta { font-size: 12px; color: ${COLORS.ink60}; font-family: 'JetBrains Mono', monospace; white-space: nowrap; }
  }
`

export const TimePill = styled.div`
  min-width: 52px;
  text-align: center;
  border: 1px solid ${COLORS.ink20};
  border-radius: 12px;
  padding: 8px 4px;
  flex-shrink: 0;

  .t { font-size: 14px; font-weight: 700; line-height: 1.1; }
  .p { font-size: 10px; color: ${COLORS.ink60}; }
`
