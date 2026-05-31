import styled from 'styled-components'
import { COLORS } from '@/lib/colors'

export const Shell = styled.div`
  display: grid;
  grid-template-columns: minmax(360px, 5fr) minmax(480px, 7fr);
  min-height: 100vh;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`

export const BrandPanel = styled.div`
  background: ${COLORS.ink};
  color: ${COLORS.white};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 36px 44px;

  @media (max-width: 980px) {
    display: none;
  }

  &::before {
    content: '';
    position: absolute;
    inset: -10% -10% -10% 20%;
    background-image: repeating-linear-gradient(
      135deg, transparent 0, transparent 38px,
      rgba(123, 105, 255, 0.1) 38px, rgba(123, 105, 255, 0.1) 76px,
      transparent 76px, transparent 114px,
      rgba(197, 255, 0, 0.05) 114px, rgba(197, 255, 0, 0.05) 152px
    );
    pointer-events: none;
    transform: rotate(-3deg);
  }
  &::after {
    content: '';
    position: absolute;
    width: 520px;
    height: 520px;
    bottom: -200px;
    inset-inline-end: -200px;
    background: radial-gradient(circle, rgba(123, 105, 255, 0.45) 0%, transparent 60%);
    pointer-events: none;
  }
  > * { position: relative; z-index: 1; }

  .brand-top { display: flex; align-items: center; gap: 12px; }
  .brand-logo {
    width: 40px; height: 40px; border-radius: 10px; background: ${COLORS.prince};
    display: grid; place-items: center;
    font-family: 'Playfair Display', serif; font-weight: 700; font-size: 22px;
  }
  .brand-name { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 22px; letter-spacing: -0.01em; }

  .brand-hero { margin-top: auto; }
  .kicker { font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: ${COLORS.limelight}; margin-bottom: 18px; }
  .brand-hero h1 { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 52px; line-height: 1.05; letter-spacing: -0.02em; margin: 0 0 18px; }
  .brand-hero h1 em { font-style: italic; color: ${COLORS.prince60}; }
  .tagline { font-size: 15px; line-height: 1.6; color: ${COLORS.ink40}; max-width: 460px; }

  .testimonial {
    margin-top: 36px; padding: 18px 20px; border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(6px); max-width: 460px;
  }
  .stars { color: ${COLORS.limelight}; font-size: 13px; letter-spacing: 2px; margin-bottom: 8px; }
  .quote { font-family: 'Playfair Display', serif; font-weight: 600; font-size: 16px; line-height: 1.45; margin-bottom: 14px; }
  .who { display: flex; align-items: center; gap: 10px; }
  .who-name { font-size: 13px; font-weight: 600; }
  .who-role { font-size: 11.5px; color: ${COLORS.ink40}; }

  .brand-foot { margin-top: 36px; display: flex; align-items: center; gap: 16px; color: ${COLORS.ink40}; font-size: 12px; }
  .brand-foot .status-dot { width: 8px; height: 8px; border-radius: 50%; background: ${COLORS.success}; display: inline-block; margin-inline-end: 6px; }
`

export const FormPanel = styled.div`
  background: ${COLORS.pebble};
  display: flex;
  flex-direction: column;
  padding: 36px 44px;
  position: relative;

  .top-row { display: flex; align-items: center; gap: 12px; justify-content: flex-end; }
  .form-card { margin: auto; width: 100%; max-width: 440px; padding: 8px 0 24px; }
  .form-foot { text-align: center; color: ${COLORS.ink60}; font-size: 13px; padding-top: 24px; }
`

export const LangToggle = styled.div`
  display: inline-flex;
  padding: 3px;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.ink20};
  border-radius: 999px;
  gap: 2px;

  button {
    border: none; background: transparent; padding: 5px 14px; border-radius: 999px;
    font-size: 12px; font-weight: 600; color: ${COLORS.ink60}; cursor: pointer;
  }
  button.active { background: ${COLORS.ink}; color: ${COLORS.white}; }
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;

  .field-label { font-size: 12.5px; font-weight: 600; color: ${COLORS.ink80}; }
`

export const InputWrap = styled.div<{ $error?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  background: ${COLORS.white};
  border: 1px solid ${({ $error }) => ($error ? COLORS.error : COLORS.ink20)};
  border-radius: 10px;
  transition: border-color 0.12s, box-shadow 0.12s;

  &:focus-within {
    border-color: ${COLORS.prince};
    box-shadow: 0 0 0 3px ${COLORS.prince20};
  }
  .lead { padding: 0 0 0 14px; color: ${COLORS.ink60}; display: flex; align-items: center; }
  input {
    flex: 1; padding: 12px 14px; border: none; outline: none; font-size: 14.5px;
    background: transparent; color: ${COLORS.ink}; border-radius: 10px; width: auto;
    font-family: inherit;
  }
  input::placeholder { color: ${COLORS.ink40}; }
  .tail-btn {
    border: none; background: transparent; padding: 0 14px 0 6px; color: ${COLORS.ink60};
    display: flex; align-items: center; font-size: 12px; font-weight: 600; cursor: pointer;
  }
`

export const FieldError = styled.div<{ $mb?: boolean }>`
  font-size: 12px;
  color: ${COLORS.error};
  font-weight: 600;
  display: flex;
  gap: 4px;
  align-items: center;
  margin-bottom: ${({ $mb }) => ($mb ? '16px' : '0')};
`

export const OrDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
  color: ${COLORS.ink40};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  &::before, &::after { content: ''; flex: 1; height: 1px; background: ${COLORS.ink20}; }
`

export const SocialBtn = styled.button`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 10px;
  border: 1px solid ${COLORS.ink20};
  background: ${COLORS.white};
  color: ${COLORS.ink};
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.12s;

  &:hover { background: ${COLORS.pebble}; }
`

export const WelcomeTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.015em;
  margin: 0 0 6px;
`

export const WelcomeSubtitle = styled.p`
  color: ${COLORS.ink60};
  font-size: 14.5px;
  margin: 0 0 24px;
`

export const ForgotRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`

export const TextLink = styled.a`
  color: ${COLORS.prince};
  font-weight: 600;
  font-size: 13px;
  text-decoration: none;
  cursor: pointer;

  &:hover { text-decoration: underline; }
`

export const SocialStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const TestimonialAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${COLORS.prince}, ${COLORS.princeHover});
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 700;
  color: ${COLORS.white};
`
