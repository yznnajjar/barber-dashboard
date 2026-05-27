export const BRAND = {
  ICON: '✂',
  NAME: 'Barber',
  SUBTITLE: 'Dashboard',
  TAGLINE: 'Manage your salon, staff, bookings, and live queue — all in one place.',
  FEATURES: [
    'Real-time walk-in queue management',
    'Smart booking & availability engine',
    'Staff schedules & performance',
    'Arabic-first, built for MENA',
  ],
} as const;

export const PAGE_TITLES = {
  LOGIN: 'Login — Barber Dashboard',
  DASHBOARD: 'Dashboard — Barber',
  BOOKINGS: 'Bookings — Barber',
  QUEUE: 'Live Queue — Barber',
  STAFF: 'Staff — Barber',
  SERVICES: 'Services — Barber',
  REVIEWS: 'Reviews — Barber',
  ANALYTICS: 'Analytics — Barber',
  CLIENTS: 'Clients — Barber',
  SALON: (name: string) => `${name} — Barber Dashboard`,
} as const;

export const LOGIN = {
  TITLE: 'Welcome back',
  SUBTITLE: 'Sign in to your salon account',
  EMAIL_LABEL: 'Email address',
  EMAIL_PLACEHOLDER: 'you@example.com',
  PASSWORD_LABEL: 'Password',
  PASSWORD_PLACEHOLDER: '••••••••',
  SUBMIT: 'Sign in',
  ERROR_EMPTY: 'Please enter your email and password',
  ERROR_INVALID: 'Invalid email or password',
  TEST_ACCOUNTS_LABEL: 'Test accounts',
} as const;

export const TEST_ACCOUNTS = [
  { role: 'Salon Owner', email: 'nour@example.com' },
  { role: 'Admin',       email: 'admin@barberapp.com' },
] as const;

export const GREETINGS = {
  MORNING: 'Good morning',
  AFTERNOON: 'Good afternoon',
  EVENING: 'Good evening',
} as const;

export const DASHBOARD = {
  SUBTITLE: "Here's what's happening at your salon today.",
  MANAGE_SALON: 'Manage Salon →',
  VIEW_ALL: 'View all →',
  RECENT_BOOKINGS: 'Recent Bookings',
  LIVE_QUEUE: 'Live Queue',
  MANAGE: 'Manage →',
} as const;

export const QUEUE_STRINGS = {
  CALL_NEXT: '📣 Call Next',
  EMPTY: 'Queue is empty right now',
  STAT_WAITING: 'Waiting',
  STAT_BEING_SERVED: 'Being Served',
  STAT_TOTAL_WAIT: 'Total Wait (min)',
  LIVE_TITLE: 'Live',
  LIVE_SPAN: 'Queue',
} as const;

export const BOOKINGS_STRINGS = {
  SEARCH_PLACEHOLDER: 'Search customer or service…',
  NO_RESULTS: 'No bookings found',
} as const;

export const COMMON = {
  NO_BOOKINGS: 'No bookings yet',
  QUEUE_EMPTY: 'Queue is empty',
  CUSTOMER_FALLBACK: 'Customer',
  ANY_STAFF: 'Any staff',
  LOCALE: 'en-JO',
  CURRENCY: 'JOD',
  COMING_SOON: 'Coming soon',
} as const;

export const SALON_DETAIL = {
  NOT_FOUND: 'Salon not found',
  APPROVED: 'Approved',
  PENDING: 'Pending',
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  SERVICE_OFF: 'Off',
  SERVICE_ACTIVE: 'Active',
  ADD_SERVICE: '+ Add Service',
  ADD_STAFF: '+ Add Staff',
  NO_SERVICES: 'No services yet',
  NO_STAFF: 'No staff yet',
  EDIT_SCHEDULE: 'Edit Schedule',
  AUTO_REFRESH: 'Auto-refreshes every 10 seconds',
  CALL_NEXT: '📣 Call Next',
  QUEUE_EMPTY: 'Queue is empty right now',
  DETAILS_TITLE: 'Salon Details',
  EDIT: 'Edit',
  CANCEL: 'Cancel',
  COMPLETE: 'Complete',
  SERVING: 'Serving',
  DONE: 'Done ✓',
  DEACTIVATE: 'Deactivate',
  ACTIVATE: 'Activate',
} as const;

export const STAFF_PAGE = {
  TITLE: 'Staff',
  SUBTITLE: 'Manage your team',
  EMPTY: 'Staff management coming soon',
} as const;

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export const SALON_TABS = ['Overview', 'Services', 'Staff', 'Bookings', 'Live Queue'] as const;
