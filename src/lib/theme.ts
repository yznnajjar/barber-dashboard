// ─── Design Tokens ────────────────────────────────────────────────────────────
// Barber Dashboard — warm, professional, Arabic-first

export const theme = {
  colors: {
    // Brand
    primary: '#C8860A',       // warm gold — razor/blade
    primaryLight: '#E8A020',
    primaryDark: '#9A6408',
    primaryMuted: '#C8860A14',

    // Neutrals — warm light
    bg: '#F8F5F0',
    bgCard: '#FFFFFF',
    bgElevated: '#F2EDE6',
    bgHover: '#EDE8E0',
    border: '#E2DCD4',
    borderLight: '#EDE8E2',

    // Text
    textPrimary: '#1A1815',
    textSecondary: '#6B6560',
    textMuted: '#A09890',
    textInverse: '#FFFFFF',

    // Status
    success: '#2E9959',
    successMuted: '#2E995914',
    warning: '#D4891A',
    warningMuted: '#D4891A14',
    error: '#D9342B',
    errorMuted: '#D9342B14',
    info: '#1A7FD4',
    infoMuted: '#1A7FD414',

    // Queue status
    waiting: '#D4891A',
    called: '#1A7FD4',
    serving: '#2E9959',

    // Sidebar
    sidebar: '#FFFFFF',
    sidebarBorder: '#E2DCD4',
  },

  spacing: {
    '0': '0',
    '1': '4px',
    '2': '8px',
    '3': '12px',
    '4': '16px',
    '5': '20px',
    '6': '24px',
    '8': '32px',
    '10': '40px',
    '12': '48px',
    '16': '64px',
    '20': '80px',
    '24': '96px',
  },

  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
    '2xl': '28px',
    full: '9999px',
  },

  typography: {
    fontDisplay: "'Playfair Display', 'Georgia', serif",
    fontBody: "'DM Sans', 'Helvetica Neue', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    fontArabic: "'Cairo', 'Noto Sans Arabic', sans-serif",

    size: {
      xs: '11px',
      sm: '13px',
      base: '15px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
    },

    weight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },

    leading: {
      tight: '1.2',
      snug: '1.4',
      normal: '1.6',
      relaxed: '1.75',
    },
  },

  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.08)',
    md: '0 4px 12px rgba(0,0,0,0.10)',
    lg: '0 8px 24px rgba(0,0,0,0.12)',
    xl: '0 16px 48px rgba(0,0,0,0.16)',
    glow: '0 0 20px rgba(200,134,10,0.20)',
    glowStrong: '0 0 40px rgba(200,134,10,0.30)',
    card: '0 1px 4px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.05)',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  media: {
    sm: '@media (min-width: 640px)',
    md: '@media (min-width: 768px)',
    lg: '@media (min-width: 1024px)',
    xl: '@media (min-width: 1280px)',
    mobile: '@media (max-width: 767px)',
    tablet: '@media (min-width: 768px) and (max-width: 1023px)',
  },

  zIndex: {
    base: 0,
    raised: 10,
    dropdown: 100,
    sticky: 200,
    overlay: 300,
    modal: 400,
    toast: 500,
  },

  transitions: {
    fast: '150ms ease',
    base: '200ms ease',
    slow: '350ms ease',
    spring: '400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  sidebar: {
    width: '240px',
    widthCollapsed: '64px',
  },
} as const;

export type Theme = typeof theme;
export default theme;
