import styled from 'styled-components'
import { COLORS } from '@/lib/colors'
import { HOURS, PX_PER_MIN } from '@/components/calendar/calendarConfig'

const GRID_HEIGHT = HOURS.length * 60 * PX_PER_MIN
const TIME_GUTTER = 52

export { GRID_HEIGHT, TIME_GUTTER }

export const CalTop = styled.div`
  background: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.ink20};
  padding-bottom: 10px;
  position: sticky;
  top: 0;
  z-index: 5;
`

export const ToolbarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 4px 10px;

  .label {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.01em;
  }
  .nav {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .today-btn {
    border: 1px solid ${COLORS.ink20};
    background: ${COLORS.white};
    color: ${COLORS.ink80};
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    padding: 5px 12px;
    cursor: pointer;
  }
`

export const DateStrip = styled.div`
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding: 2px 2px 4px;
  &::-webkit-scrollbar { display: none; }
`

export const DatePill = styled.button<{ $active?: boolean; $today?: boolean }>`
  flex-shrink: 0;
  min-width: 46px;
  border-radius: 12px;
  border: 1px solid ${({ $active }) => ($active ? COLORS.ink : COLORS.ink20)};
  background: ${({ $active }) => ($active ? COLORS.ink : COLORS.white)};
  color: ${({ $active }) => ($active ? COLORS.white : COLORS.ink)};
  padding: 7px 0;
  text-align: center;
  cursor: pointer;

  .dow { font-size: 10px; opacity: ${({ $active }) => ($active ? 0.7 : 1)}; color: ${({ $active }) => ($active ? COLORS.white : COLORS.ink60)}; }
  .dom { font-size: 16px; font-weight: 700; line-height: 1.15; }
  .dot {
    width: 4px; height: 4px; border-radius: 50%;
    background: ${({ $active, $today }) => ($today ? ($active ? COLORS.limelight : COLORS.prince) : 'transparent')};
    margin: 2px auto 0;
  }
`

export const StaffStrip = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 8px 2px 0;
  &::-webkit-scrollbar { display: none; }
`

export const StaffChip = styled.button<{ $active?: boolean }>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? COLORS.prince : COLORS.ink20)};
  background: ${({ $active }) => ($active ? COLORS.prince : COLORS.white)};
  color: ${({ $active }) => ($active ? COLORS.white : COLORS.ink80)};
  padding: 5px 12px 5px 5px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`

export const GridScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: ${COLORS.white};
  &::-webkit-scrollbar { width: 0; }
`

export const Grid = styled.div`
  position: relative;
  height: ${GRID_HEIGHT}px;
  margin-inline-start: ${TIME_GUTTER}px;
  border-inline-start: 1px solid ${COLORS.ink20};
`

export const HourRow = styled.div`
  position: absolute;
  inset-inline: 0;
  height: ${60 * PX_PER_MIN}px;
  border-bottom: 1px solid ${COLORS.pebble};

  &::before {
    content: attr(data-label);
    position: absolute;
    inset-inline-start: -${TIME_GUTTER}px;
    top: -7px;
    width: ${TIME_GUTTER - 8}px;
    text-align: end;
    font-size: 10px;
    color: ${COLORS.ink40};
    font-family: 'JetBrains Mono', monospace;
  }
`

export const NowLine = styled.div<{ $top: number }>`
  position: absolute;
  inset-inline: 0;
  top: ${({ $top }) => $top}px;
  height: 2px;
  background: ${COLORS.error};
  z-index: 6;

  &::before {
    content: '';
    position: absolute;
    inset-inline-start: -4px;
    top: -3px;
    width: 8px; height: 8px;
    border-radius: 50%;
    background: ${COLORS.error};
  }
`

export const Block = styled.div<{ $bg: string; $fg: string; $top: number; $height: number; $strike?: boolean; $dragging?: boolean; $draggable?: boolean }>`
  position: absolute;
  inset-inline: 4px 6px;
  top: ${({ $top }) => $top}px;
  height: ${({ $height }) => $height}px;
  background: ${({ $bg }) => $bg};
  border-inline-start: 3px solid ${({ $fg }) => $fg};
  border-radius: 0 8px 8px 0;
  padding: 6px 8px;
  overflow: hidden;
  cursor: ${({ $draggable }) => ($draggable ? 'grab' : 'default')};
  opacity: ${({ $dragging }) => ($dragging ? 0.4 : 1)};
  touch-action: none;
  z-index: 3;

  .b-name {
    font-size: 12.5px;
    font-weight: 600;
    color: ${COLORS.ink};
    text-decoration: ${({ $strike }) => ($strike ? 'line-through' : 'none')};
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .b-svc {
    font-size: 11px;
    color: ${({ $fg }) => $fg};
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
`

export const EmptyDay = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: ${COLORS.ink40};
  font-size: 13px;
  pointer-events: none;
`
