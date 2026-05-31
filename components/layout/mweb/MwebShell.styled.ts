import styled from 'styled-components'
import { COLORS } from '@/lib/colors'

/* Ported 1:1 from the .pwa-* design classes in Barber.html, but consuming the
   single COLORS source instead of raw hex. This is the mobile/PWA chrome. */

export const PwaRoot = styled.div`
  background: ${COLORS.pebble};
  color: ${COLORS.ink};
  font-family: 'Manrope', 'Noto Sans Arabic', sans-serif;
  font-size: 15px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
`

export const PwaTopbar = styled.header`
  flex-shrink: 0;
  padding: calc(14px + env(safe-area-inset-top)) 12px 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.ink20};
  position: sticky;
  top: 0;
  z-index: 30;

  .title {
    flex: 1;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.01em;
    min-width: 0;
  }

  .trailing {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: transparent;
    border: none;
    color: ${COLORS.ink};
    flex-shrink: 0;
    position: relative;
    &:active { background: ${COLORS.pebble}; }
  }

  .bell-dot::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${COLORS.error};
    border: 2px solid ${COLORS.white};
  }
`

export const PwaScreen = styled.main`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 16px 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  &::-webkit-scrollbar { width: 0; }
`

export const PwaBottomNav = styled.nav`
  flex-shrink: 0;
  background: ${COLORS.ink};
  padding: 10px 0 calc(18px + env(safe-area-inset-bottom));
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  position: sticky;
  bottom: 0;
  z-index: 30;
`

export const NavTab = styled.button<{ $active?: boolean }>`
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 6px 0;
  color: ${({ $active }) => ($active ? COLORS.prince : 'rgba(255,255,255,0.45)')};
  font-size: 10.5px;
  font-weight: 600;
  min-height: 48px;
  cursor: pointer;

  .ico-wrap {
    position: relative;
    display: grid;
    place-items: center;

    &::before {
      content: '';
      position: absolute;
      top: -10px;
      width: 24px;
      height: 3px;
      border-radius: 999px;
      background: ${({ $active }) => ($active ? COLORS.prince : 'transparent')};
    }
  }

  .badge {
    position: absolute;
    top: -4px;
    right: -10px;
    min-width: 16px;
    height: 16px;
    border-radius: 999px;
    background: ${COLORS.limelight};
    color: ${COLORS.ink};
    font-size: 9px;
    font-weight: 700;
    display: grid;
    place-items: center;
    padding: 0 4px;
    border: 2px solid ${COLORS.ink};
  }
`

export const Fab = styled.button`
  position: fixed;
  bottom: calc(92px + env(safe-area-inset-bottom));
  right: max(16px, calc(50% - 260px + 16px));
  width: 56px;
  height: 56px;
  border-radius: 18px;
  background: ${COLORS.prince};
  color: ${COLORS.white};
  box-shadow: 0 8px 24px rgba(123, 105, 255, 0.4);
  display: grid;
  place-items: center;
  border: none;
  z-index: 40;
  &:active { transform: scale(0.95); }
`

/* Section label + "view all" header used across screens */
export const SectionHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 2px;

  .label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${COLORS.ink60};
  }
  .link {
    color: ${COLORS.prince};
    font-size: 12.5px;
    font-weight: 700;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }
`
