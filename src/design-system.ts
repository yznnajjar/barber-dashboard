// ─── Centralized Design System ─────────────────────────────────────────────────

export const COLORS = {
  // Brand
  PRIMARY: '#C8860A',
  PRIMARY_LIGHT: '#E8A020',
  PRIMARY_DARK: '#9A6408',
  PRIMARY_MUTED: '#C8860A14',

  // Neutrals
  BG: '#F8F5F0',
  BG_CARD: '#FFFFFF',
  BG_ELEVATED: '#F2EDE6',
  BG_HOVER: '#EDE8E0',
  BORDER: '#E2DCD4',
  BORDER_HOVER: '#EDE8E2',

  // Text
  TEXT_PRIMARY: '#1A1815',
  TEXT_SECONDARY: '#6B6560',
  TEXT_MUTED: '#A09890',
  TEXT_INVERSE: '#FFFFFF',

  // Status
  SUCCESS: '#2E9959',
  SUCCESS_MUTED: '#2E995914',
  WARNING: '#D4891A',
  WARNING_MUTED: '#D4891A14',
  ERROR: '#D9342B',
  ERROR_MUTED: '#D9342B14',
  INFO: '#1A7FD4',
  INFO_MUTED: '#1A7FD414',
} as const;

export const FONT = {
  DISPLAY: "'Playfair Display', 'Georgia', serif",
  BODY: "'DM Sans', 'Helvetica Neue', sans-serif",
  ARABIC: "'Cairo', 'Noto Sans Arabic', sans-serif",
} as const;

export const FONT_SIZE = {
  XS: '11px',
  SM: '13px',
  BASE: '15px',
  MD: '16px',
  LG: '18px',
  XL: '20px',
  '2XL': '24px',
  '3XL': '30px',
  '4XL': '36px',
  '5XL': '48px',
} as const;

export const FONT_WEIGHT = {
  LIGHT: 300,
  NORMAL: 400,
  MEDIUM: 500,
  SEMIBOLD: 600,
  BOLD: 700,
} as const;

export const LINE_HEIGHT = {
  TIGHT: 1.2,
  SNUG: 1.4,
  NORMAL: 1.6,
  RELAXED: 1.75,
} as const;

export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 12,
  LG: 16,
  XL: 24,
  '2XL': 32,
  '3XL': 48,
  '4XL': 64,
} as const;

export const LEGACY_SPACING = {
  '1': '4px', '2': '8px', '3': '12px', '4': '16px',
  '5': '20px', '6': '24px', '8': '32px', '10': '40px',
  '12': '48px', '16': '64px',
} as const;

export const RADIUS = {
  SM: 6,
  MD: 10,
  LG: 14,
  XL: 20,
  FULL: 9999,
} as const;

export const SHADOWS = {
  SM: '0 1px 3px rgba(0,0,0,0.08)',
  MD: '0 4px 12px rgba(0,0,0,0.10)',
  CARD: '0 1px 4px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.05)',
} as const;

export const MEDIA = {
  MOBILE: '@media (max-width: 767px)',
} as const;

export const TRANSITIONS = {
  FAST: '150ms ease',
  BASE: '200ms ease',
} as const;
