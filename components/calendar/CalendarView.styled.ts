import styled from 'styled-components'
import { COLORS } from '@/lib/colors'
import { ROW_PX } from './calendarConfig'

/* Fresha design tokens — scoped to the calendar (see fresha-calendar-live.html). */
export const FZ = {
  violet: '#6b4eff',
  violetDark: '#5436e0',
  violetSoft: '#efebff',
  ink: '#1a1a2e',
  ink2: '#5a5b6e',
  ink3: '#9092a3',
  line: '#ededf2',
  line2: '#e2e2ea',
  surf: '#ffffff',
  surf2: '#fafafc',
  bg: '#f6f6f9',
  dang: '#e0483a',
  font: "'Plus Jakarta Sans', sans-serif",
  shadow: '0 1px 2px rgba(20,20,40,.05), 0 6px 22px rgba(20,20,40,.07)',
  pop: '0 10px 34px rgba(20,20,40,.16), 0 2px 8px rgba(20,20,40,.08)',
} as const

export const CalWrap = styled.div`
  font-family: ${FZ.font};
  background: ${FZ.surf};
  border: 1px solid ${FZ.line2};
  border-radius: 14px;
  overflow: hidden;
  box-shadow: ${FZ.shadow};
`

export const HeaderRow = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: 64px repeat(${({ $cols }) => $cols}, minmax(150px, 1fr));
  border-bottom: 1px solid ${FZ.line2};
  background: ${FZ.surf};

  > div {
    padding: 11px 8px;
    border-inline-start: 1px solid ${FZ.line};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 13.5px;
    font-weight: 700;
    color: ${FZ.ink};
  }
  > div:first-child {
    border-inline-start: none;
  }
`

export const Body = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: 64px repeat(${({ $cols }) => $cols}, minmax(150px, 1fr));
  position: relative;
  background: ${FZ.surf};
`

export const TimeCol = styled.div`
  display: flex;
  flex-direction: column;
`

export const TimeSlot = styled.div`
  height: ${ROW_PX}px;
  position: relative;
  border-bottom: 1px solid ${FZ.line};

  span {
    position: absolute;
    top: -7px;
    inset-inline-end: 9px;
    background: ${FZ.surf};
    padding: 0 2px;
    font-size: 11px;
    font-weight: 600;
    color: ${FZ.ink3};
  }
`

export const StaffCol = styled.div`
  border-inline-start: 1px solid ${FZ.line};
  position: relative;
`

export const RowBg = styled.div`
  height: ${ROW_PX}px;
  border-bottom: 1px solid ${FZ.line};
  cursor: pointer;
  transition: background 0.12s;
  &:hover {
    background: #faf7ff;
  }
`

export const Appt = styled.div<{
  $bg: string; $color: string; $top: number; $height: number;
  $strike?: boolean; $dragging?: boolean; $draggable?: boolean
}>`
  position: absolute;
  inset-inline: 4px;
  top: ${({ $top }) => $top}px;
  height: ${({ $height }) => $height}px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  border-inline-start: 3px solid ${({ $color }) => $color};
  border-radius: 9px;
  padding: 7px 9px;
  font-family: ${FZ.font};
  font-size: 12px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(20, 20, 40, 0.06);
  cursor: ${({ $draggable }) => ($draggable ? 'grab' : 'pointer')};
  transition: transform 0.08s, box-shadow 0.12s, opacity 0.12s;
  text-decoration: ${({ $strike }) => ($strike ? 'line-through' : 'none')};
  /* Hide the original while its overlay is being dragged */
  opacity: ${({ $dragging }) => ($dragging ? 0.35 : 1)};
  touch-action: none;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${FZ.shadow};
    z-index: 6;
  }
  &:active {
    cursor: ${({ $draggable }) => ($draggable ? 'grabbing' : 'pointer')};
  }

  .appt-dot {
    position: absolute;
    top: 8px;
    inset-inline-end: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.6);
  }
  .appt-tm {
    font-size: 10.5px;
    font-weight: 600;
    opacity: 0.85;
    padding-inline-end: 14px;
  }
  .appt-name {
    font-size: 12.5px;
    font-weight: 700;
    margin-top: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .appt-svc {
    font-size: 11px;
    opacity: 0.85;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .appt-foot {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 3px;
  }
  .appt-price {
    font-size: 11px;
    font-weight: 700;
  }
`

/* The block rendered inside DragOverlay — follows the cursor, no absolute top. */
export const ApptGhost = styled.div<{ $bg: string; $color: string; $height: number }>`
  height: ${({ $height }) => $height}px;
  width: 200px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  border-inline-start: 3px solid ${({ $color }) => $color};
  border-radius: 9px;
  padding: 7px 9px;
  font-family: ${FZ.font};
  font-size: 12px;
  overflow: hidden;
  box-shadow: ${FZ.pop};
  cursor: grabbing;

  .appt-tm { font-size: 10.5px; font-weight: 600; opacity: 0.85; }
  .appt-name { font-size: 12.5px; font-weight: 700; margin-top: 1px; }
  .appt-svc { font-size: 11px; opacity: 0.85; }
`

export const CurrentLine = styled.div<{ $top: number }>`
  position: absolute;
  inset-inline: 0;
  top: ${({ $top }) => $top}px;
  height: 2px;
  background: ${FZ.dang};
  z-index: 7;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    inset-inline-start: -5px;
    top: -3px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${FZ.dang};
  }
`

export const DrawerHead = styled.div`
  padding: 18px 24px;
  border-bottom: 1px solid ${COLORS.ink20};
  display: flex;
  align-items: center;
  gap: 12px;
`

/* ── Appointment detail popover (design A4) ──────────────── */
export const ApopStrip = styled.div<{ $bg: string }>`
  height: 7px;
  background: ${({ $bg }) => $bg};
`

export const ApopBody = styled.div`
  padding: 17px 19px;
  font-family: ${FZ.font};
`

export const ApopHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`

export const ApopSvc = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${FZ.ink};
  line-height: 1.3;
`

export const ApopPrice = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${FZ.ink};
  white-space: nowrap;
`

export const ApopMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 14px 0;
  font-size: 13px;
  color: ${FZ.ink2};

  .row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .row svg {
    width: 17px;
    height: 17px;
    color: ${FZ.ink3};
    flex: none;
  }
`

export const ApopActs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  border-top: 1px solid ${FZ.line};
  padding-top: 14px;
`

export const ApopMore = styled.div`
  border-top: 1px solid ${FZ.line};
  padding: 6px;
`

export const ApopMenuItem = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  padding: 10px 11px;
  border: 0;
  background: 0;
  border-radius: 9px;
  font-family: ${FZ.font};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  text-align: start;
  color: ${({ $danger }) => ($danger ? FZ.dang : FZ.ink2)};

  svg {
    width: 16px;
    height: 16px;
    color: ${({ $danger }) => ($danger ? FZ.dang : FZ.ink3)};
  }
  &:hover {
    background: ${FZ.surf2};
  }
`

export const StatusPillBtn = styled.button<{ $bg: string; $fg: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 0;
  cursor: pointer;
  font-family: ${FZ.font};
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 11px;
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

export const apopPaperSx = {
  width: 332,
  borderRadius: '16px',
  border: `1px solid ${FZ.line2}`,
  boxShadow: FZ.pop,
  overflow: 'hidden',
}

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
  gap: 7px;
  border: 1px solid ${({ $active }) => ($active ? FZ.violet : FZ.line2)};
  background: ${({ $active }) => ($active ? FZ.violetSoft : FZ.surf)};
  color: ${({ $active }) => ($active ? FZ.violetDark : FZ.ink2)};
  padding: 8px 13px;
  border-radius: 10px;
  font-family: ${FZ.font};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  white-space: nowrap;

  svg {
    width: 15px;
    height: 15px;
  }

  &:hover {
    border-color: ${({ $active }) => ($active ? FZ.violet : FZ.ink3)};
  }
`

export const FilterBadge = styled.span`
  background: ${FZ.violet};
  color: ${FZ.surf};
  font-size: 11px;
  border-radius: 20px;
  padding: 0 5px;
  min-width: 18px;
  height: 18px;
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
  width: 272px;
  font-family: ${FZ.font};
  background: ${FZ.surf};
  padding: 15px;
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
    $sel ? FZ.surf : $today ? FZ.violetDark : $mut ? FZ.ink3 : FZ.ink};
  background: ${({ $sel }) => ($sel ? FZ.violet : 'transparent')};
  outline: ${({ $today, $sel }) => ($today && !$sel ? `1.5px solid ${FZ.violet}` : 'none')};

  &:hover {
    background: ${({ $sel }) => ($sel ? FZ.violet : FZ.surf2)};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${({ $has, $sel }) => ($has ? ($sel ? FZ.surf : '#f0982a') : 'transparent')};
  }
`

/* ── Date nav cluster ─────────────────────────────────────── */
export const NavCluster = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`

export const NavIconBtn = styled.button`
  width: 38px;
  height: 38px;
  border: 0;
  background: transparent;
  border-radius: 10px;
  display: grid;
  place-items: center;
  cursor: pointer;
  color: ${FZ.ink2};
  transition: background 0.15s;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: ${FZ.surf2};
    color: ${FZ.ink};
  }
`

export const TodayBtn = styled.button`
  border: 1px solid ${FZ.line2};
  background: ${FZ.surf};
  border-radius: 10px;
  padding: 8px 14px;
  font-family: ${FZ.font};
  font-size: 13px;
  font-weight: 600;
  color: ${FZ.ink};
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${FZ.surf2};
  }
`

export const DateLabelBtn = styled.button`
  border: 0;
  background: transparent;
  border-radius: 10px;
  padding: 8px 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: ${FZ.font};
  font-size: 15px;
  font-weight: 700;
  color: ${FZ.ink};
  cursor: pointer;
  transition: background 0.15s;

  svg {
    width: 16px;
    height: 16px;
    color: ${FZ.ink3};
  }

  &:hover {
    background: ${FZ.surf2};
  }
`

/* ── Segmented control (Day/Week/Month + colour mode) ─────── */
export const Seg = styled.div`
  display: inline-flex;
  background: ${FZ.surf2};
  border: 1px solid ${FZ.line2};
  border-radius: 11px;
  padding: 3px;
  gap: 2px;
`

export const SegBtn = styled.button<{ $on?: boolean }>`
  border: 0;
  background: ${({ $on }) => ($on ? FZ.ink : 'transparent')};
  color: ${({ $on }) => ($on ? FZ.surf : FZ.ink2)};
  padding: 7px 16px;
  border-radius: 8px;
  font-family: ${FZ.font};
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;

  &:hover {
    color: ${({ $on }) => ($on ? FZ.surf : FZ.ink)};
  }
`

export const ShiftIndicator = styled.div<{ $top: number; $height: number }>`
  position: absolute;
  inset-inline: 0;
  top: ${({ $top }) => $top}px;
  height: ${({ $height }) => $height}px;
  background: rgba(107, 78, 255, 0.04);
  border-left: 1px dashed rgba(107, 78, 255, 0.25);
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
  color: ${FZ.ink3};
`

export const ShiftTimeLabel = styled.span`
  font-size: 11px;
  color: ${FZ.ink3};
  font-weight: 500;
`

export const StaffName = styled.span`
  font-size: 13.5px;
  font-weight: 700;
  color: ${FZ.ink};
`

export const StaffRole = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: ${FZ.ink3};
  margin-top: -4px;
`

export const WeekDayHeader = styled.div<{ $isToday?: boolean }>`
  gap: 3px !important;
`

export const WeekDayName = styled.span<{ $isToday?: boolean }>`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${({ $isToday }) => ($isToday ? FZ.violetDark : FZ.ink3)};
`

export const WeekDayNum = styled.span<{ $isToday?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 16px;
  background: ${({ $isToday }) => ($isToday ? FZ.violet : 'transparent')};
  color: ${({ $isToday }) => ($isToday ? FZ.surf : FZ.ink)};
`

export const addApptBtnSx = {
  fontFamily: FZ.font,
  background: FZ.violet,
  borderRadius: '11px',
  px: 2.2,
  py: 1.1,
  fontWeight: 700,
  boxShadow: '0 2px 8px rgba(107,78,255,.35)',
  '&:hover': { background: FZ.violetDark, boxShadow: '0 2px 8px rgba(107,78,255,.35)' },
}

export const popoverPaperSx = {
  mt: 1,
  borderRadius: '14px',
  border: `1px solid ${FZ.line2}`,
  boxShadow: FZ.pop,
}

export const blockedTimeBtnSx = {
  fontFamily: FZ.font,
  border: `1px solid ${FZ.line2}`,
  background: FZ.surf,
  color: FZ.ink2,
  borderRadius: '10px',
  fontWeight: 600,
  fontSize: '13px',
  px: 1.6,
  py: 0.9,
  '&:hover': { background: FZ.surf2, borderColor: FZ.ink3 },
}
