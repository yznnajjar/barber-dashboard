import styled from 'styled-components'
import { COLORS } from '@/lib/colors'

export const LoginRoot = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: ${COLORS.pebble};
  padding: calc(28px + env(safe-area-inset-top)) 20px calc(24px + env(safe-area-inset-bottom));
`

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 36px;

  .logo {
    width: 40px; height: 40px; border-radius: 11px;
    background: ${COLORS.prince}; color: ${COLORS.white};
    display: grid; place-items: center; font-weight: 800; font-size: 18px;
  }
  .name { font-weight: 800; font-size: 18px; letter-spacing: -0.01em; }
`

export const Hero = styled.div`
  margin-bottom: 28px;
  .kicker {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
    color: ${COLORS.prince}; margin-bottom: 10px;
  }
  h1 {
    font-family: 'Playfair Display', 'Noto Sans Arabic', serif;
    font-weight: 700; font-size: 32px; line-height: 1.1; letter-spacing: -0.02em;
    margin: 0; color: ${COLORS.ink};
    em { font-style: italic; color: ${COLORS.prince}; }
  }
  p { color: ${COLORS.ink60}; font-size: 14px; margin: 12px 0 0; }
`

export const Field = styled.label`
  display: block;
  margin-bottom: 14px;

  .lbl { font-size: 12px; font-weight: 700; color: ${COLORS.ink60}; margin-bottom: 6px; display: block; }
`

export const InputWrap = styled.div<{ $error?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${COLORS.white};
  border: 1px solid ${({ $error }) => ($error ? COLORS.error : COLORS.ink20)};
  border-radius: 12px;
  padding: 0 12px;
  height: 52px;

  .lead { color: ${COLORS.ink40}; display: grid; place-items: center; }
  input {
    flex: 1; border: none; outline: none; background: transparent;
    font-size: 15px; color: ${COLORS.ink}; min-width: 0;
  }
  .tail {
    border: none; background: none; color: ${COLORS.prince};
    font-size: 13px; font-weight: 700; cursor: pointer;
  }
`

export const ErrorMsg = styled.div`
  display: flex; align-items: center; gap: 6px;
  color: ${COLORS.error}; font-size: 13px; font-weight: 600;
  margin: 2px 0 12px;
`

export const LangToggle = styled.div`
  display: inline-flex;
  align-self: flex-end;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.ink20};
  border-radius: 999px;
  padding: 3px;
  margin-bottom: 20px;

  button {
    border: none; background: transparent; cursor: pointer;
    padding: 6px 14px; border-radius: 999px;
    font-size: 12.5px; font-weight: 700; color: ${COLORS.ink60};
    &.active { background: ${COLORS.ink}; color: ${COLORS.white}; }
  }
`

export const Foot = styled.div`
  margin-top: auto;
  text-align: center;
  color: ${COLORS.ink40};
  font-size: 12px;
  padding-top: 24px;
`
