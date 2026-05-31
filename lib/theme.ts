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
    h2: { fontSize: '20px', fontWeight: 600, lineHeight: 1.2 },
    h3: { fontSize: '16px', fontWeight: 600, lineHeight: 1.3 },
    body1: { fontSize: '14px', fontWeight: 400, lineHeight: 1.5 },
    body2: { fontSize: '12px', fontWeight: 400, lineHeight: 1.5 },
    caption: { fontSize: '12px', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 8 },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: 'none', fontWeight: 600, fontSize: '14px', boxShadow: 'none' },
        containedPrimary: { backgroundColor: COLORS.prince, '&:hover': { backgroundColor: COLORS.princeHover, boxShadow: 'none' } },
      },
    },
    MuiCard: {
      styleOverrides: { root: { borderRadius: 12, border: `1px solid ${COLORS.ink20}`, boxShadow: 'none' } },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiTextField: { defaultProps: { size: 'small' } },
    MuiChip: { styleOverrides: { root: { borderRadius: 999, fontWeight: 600, fontSize: '12px' } } },
    MuiTooltip: { styleOverrides: { tooltip: { backgroundColor: COLORS.ink, fontSize: '12px', borderRadius: 8 } } },
  },
})

// Re-export so existing imports from '@/lib/theme' keep working.
export { AVATAR_GRADIENTS } from './colors'
