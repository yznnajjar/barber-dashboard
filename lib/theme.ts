'use client'
import { createTheme } from '@mui/material/styles'
import { COLORS } from './colors'

// MUI theme consumes the single colour source (lib/colors.ts). Per CLAUDE-code.md §13.
export const theme = createTheme({
  palette: {
    primary: { main: COLORS.prince, light: COLORS.prince60, dark: COLORS.princeDark, contrastText: COLORS.white },
    secondary: { main: COLORS.limelight, contrastText: COLORS.ink },
    error: { main: COLORS.error, light: COLORS.errorBg },
    warning: { main: COLORS.warning, light: COLORS.warningBg },
    success: { main: COLORS.success, light: COLORS.successBg },
    info: { main: COLORS.info, light: COLORS.infoBg },
    text: { primary: COLORS.ink, secondary: COLORS.ink60, disabled: COLORS.ink40 },
    background: { default: COLORS.pebble, paper: COLORS.white },
    divider: COLORS.ink20,
  },
  typography: {
    fontFamily: '"Manrope", "Noto Sans Arabic", sans-serif',
    h1: { fontSize: '24px', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' },
    h2: { fontSize: '20px', fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.005em' },
    h3: { fontSize: '16px', fontWeight: 600, lineHeight: 1.3 },
    body1: { fontSize: '14px', fontWeight: 400, lineHeight: 1.5 },
    body2: { fontSize: '12px', fontWeight: 400, lineHeight: 1.5 },
    caption: { fontSize: '12px', fontWeight: 600, lineHeight: 1.5, letterSpacing: '0.02em' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 8 },
  spacing: 8,
  components: {
    MuiButton: {
      // Mirrors Barber.html .btn — neutral outlined is ink20/white, not the MUI prince default.
      styleOverrides: {
        root: { borderRadius: 8, textTransform: 'none', fontWeight: 600, fontSize: '13.5px', lineHeight: 1.25, padding: '9px 16px', boxShadow: 'none' },
        sizeSmall: { padding: '5px 10px', fontSize: '12px' },
        sizeLarge: { padding: '13px 22px', fontSize: '15px' },
        containedPrimary: { backgroundColor: COLORS.prince, '&:hover': { backgroundColor: COLORS.princeHover, boxShadow: 'none' } },
        outlined: { backgroundColor: COLORS.white },
        outlinedPrimary: { color: COLORS.ink, borderColor: COLORS.ink20, '&:hover': { backgroundColor: COLORS.pebble, borderColor: COLORS.ink20 } },
        outlinedInherit: { color: COLORS.ink, borderColor: COLORS.ink20, '&:hover': { backgroundColor: COLORS.pebble, borderColor: COLORS.ink20 } },
        outlinedError: { color: COLORS.error, borderColor: COLORS.error, '&:hover': { backgroundColor: COLORS.errorBg, borderColor: COLORS.error } },
      },
    },
    MuiCard: {
      styleOverrides: { root: { borderRadius: 12, border: `1px solid ${COLORS.ink20}`, boxShadow: 'none' } },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiTextField: { defaultProps: { size: 'small' } },
    MuiChip: { styleOverrides: { root: { borderRadius: 999, fontWeight: 600, fontSize: '12px' }, label: { paddingLeft: 10, paddingRight: 10 } } },
    MuiSwitch: {
      // Mirrors Barber.html .switch — a compact 36×20 pill, prince when on.
      styleOverrides: {
        root: { width: 36, height: 20, padding: 0, display: 'inline-flex' },
        switchBase: {
          padding: 2,
          color: COLORS.white,
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: COLORS.white,
            '& + .MuiSwitch-track': { backgroundColor: COLORS.prince, opacity: 1 },
          },
        },
        thumb: { width: 16, height: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.12)' },
        track: { borderRadius: 999, backgroundColor: COLORS.ink20, opacity: 1 },
      },
    },
    MuiTooltip: { styleOverrides: { tooltip: { backgroundColor: COLORS.ink, fontSize: '12px', borderRadius: 8 } } },
  },
})

// Re-export so existing imports from '@/lib/theme' keep working.
export { AVATAR_GRADIENTS } from './colors'
