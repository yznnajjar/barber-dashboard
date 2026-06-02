/**
 * SINGLE SOURCE OF TRUTH for every colour in the app.
 * Mirrors the design tokens in Barber.html (§2 of CLAUDE-code.md).
 * Nothing else in the codebase should contain a raw hex literal — import from here.
 * The MUI theme (lib/theme.ts) and all styled-components consume these.
 */
export const COLORS = {
  // Brand
  prince: '#7B69FF',      // primary
  princeHover: '#9587FF',
  prince80: '#9587FF',
  prince60: '#B0A5FF',
  prince40: '#CAC3FF',
  prince20: '#E5E1FF',
  princeDark: '#403AFA',
  limelight: '#C5FF00',   // accent

  // Ink (text / dark surfaces)
  ink: '#060911',
  ink80: '#383A41',
  ink60: '#6A6B70',
  ink40: '#9B9DA0',
  ink20: '#CDCECF',

  // Surfaces
  pebble: '#F3F1EF',      // app background
  pebbleHover: '#ECE9E5',
  white: '#FFFFFF',
  hairline: '#E8E6E3',    // dashed grid lines

  // Status
  success: '#5AC43B',
  successDark: '#2D7818',
  successDeep: '#2A8C18',
  successBg: '#D2FAD5',
  warning: '#FC5201',
  warningBg: '#FFD279',
  startedFg: '#C4860F',    // darker amber — STARTED chip/block foreground
  arrivedFg: '#23529C',    // deep blue — ARRIVED chip/block foreground
  error: '#FA3951',
  errorBg: '#FFCFCB',
  info: '#403AFA',
  infoBg: '#BDDDF9',
  princeTint: '#F3F0FF',   // lightest purple — today-cell background in month view

  // Brand logos (login social buttons)
  google: { blue: '#4285F4', green: '#34A853', yellow: '#FBBC05', red: '#EA4335' },
} as const

/** Booking-status → chip/blocks colours. Single source for StatusChip + Calendar. */
export const STATUS_COLORS = {
  PENDING:    { bg: COLORS.warningBg, fg: COLORS.warning,     label: 'Pending' },
  CONFIRMED:  { bg: COLORS.successBg, fg: COLORS.successDark, label: 'Confirmed' },
  ARRIVED:    { bg: COLORS.infoBg,    fg: COLORS.arrivedFg,   label: 'Arrived' },
  STARTED:    { bg: COLORS.warningBg, fg: COLORS.startedFg,   label: 'Started' },
  COMPLETED:  { bg: COLORS.infoBg,    fg: COLORS.princeDark,  label: 'Completed' },
  CANCELLED:  { bg: COLORS.ink20,     fg: COLORS.ink60,       label: 'Cancelled' },
  NO_SHOW:    { bg: COLORS.errorBg,   fg: COLORS.error,       label: 'No-show' },
} as const

/** Avatar gradients (.av-1 .. .av-8 in Barber.html). */
export const AVATAR_GRADIENTS: Record<number, string> = {
  1: `linear-gradient(135deg, ${COLORS.prince}, ${COLORS.princeDark})`,
  2: `linear-gradient(135deg, ${COLORS.warning}, ${COLORS.error})`,
  3: `linear-gradient(135deg, ${COLORS.success}, ${COLORS.successDeep})`,
  4: `linear-gradient(135deg, ${COLORS.princeDark}, ${COLORS.ink})`,
  5: `linear-gradient(135deg, ${COLORS.warningBg}, ${COLORS.warning})`,
  6: `linear-gradient(135deg, ${COLORS.prince60}, ${COLORS.prince})`,
  7: `linear-gradient(135deg, ${COLORS.limelight}, ${COLORS.success})`,
  8: `linear-gradient(135deg, ${COLORS.ink80}, ${COLORS.ink})`,
}

/** Colour-by-service / colour-by-staff palette — deterministic hash pick. Fresha pastels. */
export const CALENDAR_PALETTE = [
  { bg: '#d3f3e8', fg: '#0a6b51' }, // teal
  { bg: '#d8ebfd', fg: '#15508f' }, // blue
  { bg: '#fcdcec', fg: '#9c2c5d' }, // pink
  { bg: '#ffe6c9', fg: '#9c5a12' }, // orange
  { bg: '#e9f5c6', fg: '#5a7012' }, // lime
  { bg: '#e6e2ff', fg: '#4a37b3' }, // lavender
] as const

/** Heatmap intensity ramp (analytics busy-hours). */
export const HEATMAP_RAMP = [
  COLORS.pebble, COLORS.prince20, COLORS.prince40, COLORS.prince60, COLORS.prince,
] as const
