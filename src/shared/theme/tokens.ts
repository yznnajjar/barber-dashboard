import { COLORS, FONT, FONT_SIZE, FONT_WEIGHT, LINE_HEIGHT, SPACING, LEGACY_SPACING, RADIUS, SHADOWS, MEDIA, TRANSITIONS } from '@/design-system';

/** Backwards-compatible theme for styled-components (login.styles.ts). */
export const theme = {
  colors: {
    primary: COLORS.PRIMARY,
    primaryDark: COLORS.PRIMARY_DARK,
    primaryMuted: COLORS.PRIMARY_MUTED,
    bg: COLORS.BG,
    bgCard: COLORS.BG_CARD,
    bgElevated: COLORS.BG_ELEVATED,
    border: COLORS.BORDER,
    borderLight: COLORS.BORDER_HOVER,
    textPrimary: COLORS.TEXT_PRIMARY,
    textSecondary: COLORS.TEXT_SECONDARY,
    textMuted: COLORS.TEXT_MUTED,
    textInverse: COLORS.TEXT_INVERSE,
    success: COLORS.SUCCESS,
    successMuted: COLORS.SUCCESS_MUTED,
    warning: COLORS.WARNING,
    warningMuted: COLORS.WARNING_MUTED,
    error: COLORS.ERROR,
    errorMuted: COLORS.ERROR_MUTED,
    info: COLORS.INFO,
    infoMuted: COLORS.INFO_MUTED,
  },
  typography: {
    fontDisplay: FONT.DISPLAY,
    fontBody: FONT.BODY,
    fontArabic: FONT.ARABIC,
    size: {
      xs: FONT_SIZE.XS, sm: FONT_SIZE.SM, base: FONT_SIZE.BASE,
      md: FONT_SIZE.MD, lg: FONT_SIZE.LG, xl: FONT_SIZE.XL,
      '2xl': FONT_SIZE['2XL'], '3xl': FONT_SIZE['3XL'], '4xl': FONT_SIZE['4XL'],
    },
    weight: {
      normal: FONT_WEIGHT.NORMAL, medium: FONT_WEIGHT.MEDIUM,
      semibold: FONT_WEIGHT.SEMIBOLD, bold: FONT_WEIGHT.BOLD,
    },
    leading: {
      tight: LINE_HEIGHT.TIGHT, normal: LINE_HEIGHT.NORMAL, relaxed: LINE_HEIGHT.RELAXED,
    },
  },
  spacing: { ...SPACING, ...LEGACY_SPACING },
  radius: { sm: RADIUS.SM, md: RADIUS.MD, lg: RADIUS.LG },
  shadows: SHADOWS,
  media: { mobile: MEDIA.MOBILE },
  transitions: { fast: TRANSITIONS.FAST, base: TRANSITIONS.BASE },
};

export default theme;
