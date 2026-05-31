import styled from 'styled-components'
import { COLORS } from '@/lib/colors'

export const HeaderRoot = styled.header`
  background: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.ink20};
  padding: 14px 32px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: sticky;
  top: 0;
  z-index: 30;
`

export const Crumbs = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${COLORS.ink60};
  font-size: 13px;

  .current { color: ${COLORS.ink}; font-weight: 600; }
`

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${COLORS.pebble};
  border-radius: 999px;
  padding: 7px 14px;
  width: 280px;
  color: ${COLORS.ink60};
  cursor: pointer;
  user-select: none;
  transition: background 0.12s;

  &:hover { background: ${COLORS.pebbleHover}; }

  input {
    border: none;
    background: transparent;
    outline: none;
    flex: 1;
    font-size: 13px;
    color: ${COLORS.ink};
    font-family: inherit;
  }
`
