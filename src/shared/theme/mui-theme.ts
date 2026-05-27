import { createTheme } from '@mui/material/styles';
import { COLORS, FONT, FONT_SIZE, FONT_WEIGHT, LINE_HEIGHT, SPACING, RADIUS, SHADOWS } from '@/design-system';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      textMuted: string;
      bgElevated: string;
      bgHover: string;
      borderHover: string;
      primaryMuted: string;
      successMuted: string;
      warningMuted: string;
      errorMuted: string;
      infoMuted: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      textMuted?: string;
      bgElevated?: string;
      bgHover?: string;
      borderHover?: string;
      primaryMuted?: string;
      successMuted?: string;
      warningMuted?: string;
      errorMuted?: string;
      infoMuted?: string;
    };
  }
}

const muiTheme = createTheme({
  palette: {
    primary: { main: COLORS.PRIMARY, light: COLORS.PRIMARY_LIGHT, dark: COLORS.PRIMARY_DARK },
    secondary: { main: COLORS.TEXT_SECONDARY },
    error: { main: COLORS.ERROR },
    warning: { main: COLORS.WARNING },
    info: { main: COLORS.INFO },
    success: { main: COLORS.SUCCESS },
    background: { default: COLORS.BG, paper: COLORS.BG_CARD },
    text: { primary: COLORS.TEXT_PRIMARY, secondary: COLORS.TEXT_SECONDARY },
    divider: COLORS.BORDER,
    custom: {
      textMuted: COLORS.TEXT_MUTED,
      bgElevated: COLORS.BG_ELEVATED,
      bgHover: COLORS.BG_HOVER,
      borderHover: COLORS.BORDER_HOVER,
      primaryMuted: COLORS.PRIMARY_MUTED,
      successMuted: COLORS.SUCCESS_MUTED,
      warningMuted: COLORS.WARNING_MUTED,
      errorMuted: COLORS.ERROR_MUTED,
      infoMuted: COLORS.INFO_MUTED,
    },
  },

  typography: {
    fontFamily: FONT.BODY,
    h1: { fontFamily: FONT.DISPLAY, fontWeight: FONT_WEIGHT.BOLD },
    h2: { fontFamily: FONT.DISPLAY, fontWeight: FONT_WEIGHT.BOLD },
    h3: { fontFamily: FONT.DISPLAY, fontWeight: FONT_WEIGHT.BOLD },
    h4: { fontFamily: FONT.DISPLAY, fontWeight: FONT_WEIGHT.BOLD },
    h5: { fontFamily: FONT.DISPLAY, fontWeight: FONT_WEIGHT.SEMIBOLD },
    h6: { fontFamily: FONT.DISPLAY, fontWeight: FONT_WEIGHT.SEMIBOLD },
    button: { textTransform: 'none', fontWeight: FONT_WEIGHT.MEDIUM },
  },

  shape: { borderRadius: RADIUS.MD },

  spacing: SPACING.XS,

  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: RADIUS.MD },
        sizeSmall: { padding: '6px 12px', fontSize: FONT_SIZE.SM, borderRadius: RADIUS.SM },
        sizeMedium: { padding: '9px 18px' },
        sizeLarge: { padding: '12px 24px', fontSize: FONT_SIZE.BASE, borderRadius: RADIUS.LG },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: SHADOWS.CARD,
          border: `1px solid ${COLORS.BORDER}`,
          borderRadius: RADIUS.LG,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: FONT_WEIGHT.SEMIBOLD, letterSpacing: '0.02em', textTransform: 'uppercase' as const },
        sizeSmall: { fontSize: FONT_SIZE.XS },
      },
    },
    MuiTextField: {
      defaultProps: { fullWidth: true, variant: 'outlined' as const },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: COLORS.BG_ELEVATED,
            '& fieldset': { borderColor: COLORS.BORDER },
            '&:hover fieldset': { borderColor: COLORS.BORDER_HOVER },
            '&.Mui-focused fieldset': { borderColor: COLORS.PRIMARY },
            '&.Mui-error fieldset': { borderColor: COLORS.ERROR },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: { paper: { borderRight: `1px solid ${COLORS.BORDER}` } },
    },
    MuiBottomNavigationAction: {
      styleOverrides: { root: { '&.Mui-selected': { color: COLORS.PRIMARY } } },
    },
    MuiTabs: {
      styleOverrides: { indicator: { backgroundColor: COLORS.PRIMARY } },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          fontWeight: FONT_WEIGHT.MEDIUM,
          fontSize: FONT_SIZE.SM,
          color: COLORS.TEXT_SECONDARY,
          '&.Mui-selected': { color: COLORS.PRIMARY },
        },
      },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
  },
});

export default muiTheme;
export type MuiTheme = typeof muiTheme;
