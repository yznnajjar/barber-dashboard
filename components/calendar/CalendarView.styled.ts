import styled from 'styled-components'
import { COLORS } from '@/lib/colors'

export const CalWrap = styled.div`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.ink20};
  border-radius: 12px;
  overflow: hidden;
`

export const HeaderRow = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: 64px repeat(${({ $cols }) => $cols}, 1fr);
  border-bottom: 1px solid ${COLORS.ink20};
  background: ${COLORS.pebble};

  > div {
    padding: 12px 10px;
    border-inline-start: 1px solid ${COLORS.ink20};
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
  }
  > div:first-child {
    border-inline-start: none;
  }
`

export const Body = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: 64px repeat(${({ $cols }) => $cols}, 1fr);
  position: relative;
`

export const TimeCol = styled.div`
  display: flex;
  flex-direction: column;
`

export const TimeSlot = styled.div`
  height: 60px;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 600;
  color: ${COLORS.ink40};
  border-top: 1px solid ${COLORS.ink20};
  text-align: end;
  &:first-child {
    border-top: none;
  }
`

export const StaffCol = styled.div`
  border-inline-start: 1px solid ${COLORS.ink20};
  position: relative;
`

export const RowBg = styled.div`
  height: 60px;
  border-top: 1px dashed ${COLORS.hairline};
  &:first-child {
    border-top: none;
  }
`

export const Appt = styled.div<{
  $bg: string; $color: string; $top: number; $height: number;
  $strike?: boolean; $dragging?: boolean; $draggable?: boolean
}>`
  position: absolute;
  inset-inline: 6px;
  top: ${({ $top }) => $top}px;
  height: ${({ $height }) => $height}px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  border-inline-start: 3px solid ${({ $color }) => $color};
  border-radius: 8px;
  padding: 6px 8px;
  font-size: 12px;
  overflow: hidden;
  cursor: ${({ $draggable }) => ($draggable ? 'grab' : 'pointer')};
  transition: transform 0.12s, box-shadow 0.12s, opacity 0.12s;
  text-decoration: ${({ $strike }) => ($strike ? 'line-through' : 'none')};
  /* Hide the original while its overlay is being dragged */
  opacity: ${({ $dragging }) => ($dragging ? 0.35 : 1)};
  touch-action: none;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(6, 9, 17, 0.1);
  }
  &:active {
    cursor: ${({ $draggable }) => ($draggable ? 'grabbing' : 'pointer')};
  }

  .appt-name {
    font-weight: 700;
  }
  .appt-svc {
    opacity: 0.85;
    margin-top: 2px;
  }
`

/* The block rendered inside DragOverlay — follows the cursor, no absolute top. */
export const ApptGhost = styled.div<{ $bg: string; $color: string; $height: number }>`
  height: ${({ $height }) => $height}px;
  width: 200px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  border-inline-start: 3px solid ${({ $color }) => $color};
  border-radius: 8px;
  padding: 6px 8px;
  font-size: 12px;
  overflow: hidden;
  box-shadow: 0 10px 28px rgba(6, 9, 17, 0.22);
  cursor: grabbing;

  .appt-name { font-weight: 700; }
  .appt-svc { opacity: 0.85; margin-top: 2px; }
`

export const CurrentLine = styled.div<{ $top: number }>`
  position: absolute;
  inset-inline: 0;
  top: ${({ $top }) => $top}px;
  height: 2px;
  background: ${COLORS.prince};
  z-index: 5;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    inset-inline-start: -5px;
    top: -4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${COLORS.prince};
  }
`

export const DrawerHead = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${COLORS.ink20};
  display: flex;
  align-items: center;
`

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`

export const ToolbarLabel = styled.div`
  font-weight: 600;
  margin-inline-start: 8px;
  min-width: 200px;
`
