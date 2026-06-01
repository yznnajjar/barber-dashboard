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
  gap: 10px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`

export const FilterStrip = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`

export const ToolbarLabel = styled.div`
  font-weight: 600;
  font-size: 13px;
  color: ${COLORS.ink};
  min-width: 160px;
`

/* ── Filter chip (Fresha-style trigger) ───────────────────── */
export const FilterChipBtn = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid ${({ $active }) => ($active ? COLORS.prince : COLORS.ink20)};
  background: ${({ $active }) => ($active ? COLORS.prince20 : COLORS.white)};
  color: ${({ $active }) => ($active ? COLORS.princeDark : COLORS.ink60)};
  padding: 7px 11px;
  border-radius: 8px;
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  white-space: nowrap;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    background: ${({ $active }) => ($active ? COLORS.prince20 : COLORS.pebble)};
  }
`

export const FilterBadge = styled.span`
  background: ${COLORS.prince};
  color: ${COLORS.white};
  font-size: 10.5px;
  border-radius: 20px;
  padding: 0 6px;
  min-width: 16px;
  height: 16px;
  display: inline-grid;
  place-items: center;
  font-weight: 700;
`

export const Caret = styled.span`
  display: inline-block;
  width: 7px;
  height: 7px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: rotate(45deg) translateY(-2px);
  opacity: 0.7;
  margin-inline-start: 2px;
`

/* ── Popover content ──────────────────────────────────────── */
export const PopWrap = styled.div`
  width: 280px;
  background: ${COLORS.white};
  border-radius: 12px;
  overflow: hidden;
`

export const PopHead = styled.div`
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${COLORS.hairline};

  b {
    font-size: 13px;
    font-weight: 700;
    color: ${COLORS.ink};
  }
`

export const PopReset = styled.button`
  font-family: inherit;
  font-size: 12px;
  font-weight: 600;
  color: ${COLORS.princeDark};
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;

  &:hover {
    background: ${COLORS.pebble};
  }

  &:disabled {
    color: ${COLORS.ink40};
    cursor: not-allowed;
    background: transparent;
  }
`

export const PopSearch = styled.div`
  margin: 10px 12px;
  border: 1px solid ${COLORS.ink20};
  border-radius: 8px;
  padding: 7px 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${COLORS.ink40};

  svg {
    width: 14px;
    height: 14px;
  }

  input {
    border: 0;
    outline: 0;
    background: transparent;
    font-family: inherit;
    font-size: 12.5px;
    flex: 1;
    color: ${COLORS.ink};

    &::placeholder {
      color: ${COLORS.ink40};
    }
  }
`

export const PopList = styled.div`
  max-height: 260px;
  overflow: auto;
  padding: 4px 6px;
`

export const PopOption = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 8px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  border: 0;
  background: transparent;
  font-family: inherit;
  text-align: start;

  &:hover {
    background: ${COLORS.pebble};
  }
`

export const PopCheckbox = styled.span<{ $on?: boolean }>`
  width: 18px;
  height: 18px;
  border: 1.6px solid ${({ $on }) => ($on ? COLORS.prince : COLORS.ink20)};
  background: ${({ $on }) => ($on ? COLORS.prince : 'transparent')};
  border-radius: 5px;
  flex: none;
  display: grid;
  place-items: center;
  transition: background 0.15s, border-color 0.15s;

  &::after {
    content: '';
    width: 5px;
    height: 9px;
    border: 2px solid ${COLORS.white};
    border-top: 0;
    border-left: 0;
    transform: rotate(45deg) translateY(-1px);
    opacity: ${({ $on }) => ($on ? 1 : 0)};
  }
`

export const PopOptName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${COLORS.ink};
  display: block;
`

export const PopOptRole = styled.span`
  font-size: 11px;
  color: ${COLORS.ink40};
  display: block;
`

export const PopOptRight = styled.span`
  margin-inline-start: auto;
  font-size: 11.5px;
  color: ${COLORS.ink40};
  font-weight: 600;
`

export const PopGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 8px 5px;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${COLORS.ink40};

  button {
    font-family: inherit;
    font-size: 10.5px;
    color: ${COLORS.princeDark};
    background: transparent;
    border: 0;
    font-weight: 700;
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 4px;

    &:hover {
      background: ${COLORS.pebble};
    }
  }
`

export const PopFoot = styled.div`
  padding: 10px 12px;
  border-top: 1px solid ${COLORS.hairline};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`

export const PopCount = styled.span`
  font-size: 11.5px;
  color: ${COLORS.ink40};
  font-weight: 600;
`

export const QuickChips = styled.div`
  padding: 0 12px 8px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`

export const QuickChip = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  font-family: inherit;
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  border: 0;
  cursor: pointer;
  background: ${({ $active }) => ($active ? COLORS.prince20 : COLORS.pebble)};
  color: ${({ $active }) => ($active ? COLORS.princeDark : COLORS.ink60)};

  &:hover {
    background: ${({ $active }) => ($active ? COLORS.prince20 : COLORS.pebbleHover)};
  }
`

export const StatusDot = styled.span<{ $bg: string; $fg: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  background: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`

/* ── Mini calendar (date jump) ────────────────────────────── */
export const MiniWrap = styled.div`
  width: 264px;
  background: ${COLORS.white};
  padding: 14px;
`

export const MiniTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;

  b {
    font-size: 13.5px;
    font-weight: 700;
    color: ${COLORS.ink};
  }

  button {
    width: 26px;
    height: 26px;
    border: 0;
    background: ${COLORS.pebble};
    border-radius: 7px;
    display: grid;
    place-items: center;
    color: ${COLORS.ink60};
    cursor: pointer;

    &:hover {
      background: ${COLORS.pebbleHover};
    }
  }
`

export const MiniDow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-size: 10.5px;
  color: ${COLORS.ink40};
  font-weight: 700;
  text-align: center;
  margin-bottom: 4px;
`

export const MiniGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`

export const MiniDay = styled.button<{ $mut?: boolean; $today?: boolean; $sel?: boolean; $has?: boolean }>`
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  font-family: inherit;
  font-size: 12px;
  font-weight: ${({ $mut }) => ($mut ? 500 : 600)};
  border: 0;
  border-radius: 7px;
  cursor: pointer;
  position: relative;
  color: ${({ $sel, $today, $mut }) =>
    $sel ? COLORS.white : $today ? COLORS.princeDark : $mut ? COLORS.ink40 : COLORS.ink};
  background: ${({ $sel }) => ($sel ? COLORS.prince : 'transparent')};
  outline: ${({ $today, $sel }) => ($today && !$sel ? `1.5px solid ${COLORS.prince}` : 'none')};

  &:hover {
    background: ${({ $sel }) => ($sel ? COLORS.prince : COLORS.pebble)};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 3px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${({ $has, $sel }) => ($has ? ($sel ? COLORS.white : '#b88a2e') : 'transparent')};
  }
`

/* ── Date nav cluster ─────────────────────────────────────── */
export const NavCluster = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`

export const NavIconBtn = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${COLORS.ink20};
  background: ${COLORS.white};
  border-radius: 8px;
  display: grid;
  place-items: center;
  cursor: pointer;
  color: ${COLORS.ink60};
  transition: background 0.15s;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: ${COLORS.pebble};
    color: ${COLORS.ink};
  }
`

export const TodayBtn = styled.button`
  border: 1px solid ${COLORS.ink20};
  background: ${COLORS.white};
  border-radius: 8px;
  padding: 7px 13px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: ${COLORS.ink};
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${COLORS.pebble};
  }
`

export const DateLabelBtn = styled.button`
  border: 1px solid ${COLORS.ink20};
  background: ${COLORS.white};
  border-radius: 8px;
  padding: 7px 13px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: ${COLORS.ink};
  cursor: pointer;
  transition: background 0.15s;

  svg {
    width: 15px;
    height: 15px;
    color: ${COLORS.ink60};
  }

  &:hover {
    background: ${COLORS.pebble};
  }
`

/* ── Segmented control (Day/Week/Month + colour mode) ─────── */
export const Seg = styled.div`
  display: inline-flex;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.ink20};
  border-radius: 10px;
  padding: 3px;
  gap: 2px;
`

export const SegBtn = styled.button<{ $on?: boolean }>`
  border: 0;
  background: ${({ $on }) => ($on ? COLORS.ink : 'transparent')};
  color: ${({ $on }) => ($on ? COLORS.white : COLORS.ink60)};
  padding: 6px 13px;
  border-radius: 7px;
  font-family: inherit;
  font-weight: 600;
  font-size: 12.5px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;

  &:hover {
    color: ${({ $on }) => ($on ? COLORS.white : COLORS.ink)};
  }
`

export const ShiftIndicator = styled.div<{ $top: number; $height: number }>`
  position: absolute;
  inset-inline: 0;
  top: ${({ $top }) => $top}px;
  height: ${({ $height }) => $height}px;
  background: rgba(123, 105, 255, 0.04);
  border-left: 1px dashed rgba(123, 105, 255, 0.25);
  pointer-events: none;
  z-index: 1;
`

export const OffOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 2;
  font-size: 13px;
  font-weight: 600;
  color: ${COLORS.ink40};
`

export const ShiftTimeLabel = styled.span`
  font-size: 11px;
  color: ${COLORS.ink40};
  font-weight: 400;
  margin-inline-start: auto;
`

export const WeekDayHeader = styled.div<{ $isToday?: boolean }>`
  font-weight: ${({ $isToday }) => ($isToday ? 700 : 600)};
`

export const addApptBtnSx = {
  borderRadius: '9px', px: 2, py: 1, fontWeight: 700,
}

export const popoverPaperSx = {
  mt: 1,
  borderRadius: '12px',
  border: `1px solid ${COLORS.ink20}`,
  boxShadow: '0 8px 28px rgba(20,20,20,.12), 0 2px 6px rgba(20,20,20,.06)',
}

export const blockedTimeBtnSx = {
  border: `1px solid ${COLORS.ink20}`,
  background: COLORS.white,
  color: COLORS.ink80,
  borderRadius: '8px',
  fontWeight: 600,
  fontSize: '12.5px',
  px: 1.4,
  py: 0.8,
  '&:hover': { background: COLORS.pebble, borderColor: COLORS.ink20 },
}
