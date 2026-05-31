import styled from 'styled-components'
import { COLORS } from '@/lib/colors'

export const SidebarRoot = styled.aside`
  background: ${COLORS.ink};
  color: ${COLORS.white};
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  width: 240px;
  flex-shrink: 0;
  padding: 16px 12px;
  gap: 4px;
`

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 8px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 12px;

  .logo {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: ${COLORS.prince};
    color: ${COLORS.white};
    display: grid;
    place-items: center;
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 18px;
    flex-shrink: 0;
  }
  .name { font-weight: 700; font-size: 15px; letter-spacing: -0.01em; }
  .salon { font-size: 11px; color: ${COLORS.ink40}; margin-top: 1px; }
`

export const SectionLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: ${COLORS.ink40};
  padding: 14px 10px 6px;
  text-transform: uppercase;
`

export const NavItem = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 10px;
  border-radius: 8px;
  color: ${({ $active }) => ($active ? COLORS.white : COLORS.ink40)};
  background: ${({ $active }) => ($active ? COLORS.prince : 'transparent')};
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  font-size: 13.5px;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.12s, color 0.12s;

  svg { font-size: 20px; color: inherit; flex-shrink: 0; }

  &:hover {
    background: ${({ $active }) => ($active ? COLORS.prince : 'rgba(255,255,255,0.06)')};
    color: ${COLORS.white};
  }

  .badge {
    margin-inline-start: auto;
    background: ${({ $active }) => ($active ? COLORS.white : COLORS.limelight)};
    color: ${({ $active }) => ($active ? COLORS.prince : COLORS.ink)};
    font-size: 10px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 999px;
  }
`

export const Spacer = styled.div`
  flex: 1;
`

export const OwnerCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-top: 8px;

  .owner-name { font-size: 13px; font-weight: 600; }
  .owner-role { font-size: 11px; color: ${COLORS.ink40}; }
`
