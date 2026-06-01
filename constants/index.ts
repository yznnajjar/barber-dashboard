import type { BookingStatus } from '@/types'

// ---- Dev / demo credentials ----
export const DEFAULT_LOGIN_EMAIL = 'owner@salon.com'
export const DEFAULT_LOGIN_PASSWORD = 'password123'

// ---- React Query keys ----
export const QUERY_KEY_BOOKINGS = 'bookings'
export const QUERY_KEY_QUEUE = 'queue'
export const QUERY_KEY_SERVICES = 'services'
export const QUERY_KEY_STAFF = 'staff'
export const QUERY_KEY_ANALYTICS = 'analytics'
export const QUERY_KEY_CLIENTS = 'clients'
export const QUERY_KEY_DASHBOARD_STATS = 'dashboard_stats'

// ---- Booking status ----
export const BOOKING_STATUS_PENDING = 'PENDING'
export const BOOKING_STATUS_CONFIRMED = 'CONFIRMED'
export const BOOKING_STATUS_ARRIVED = 'ARRIVED'
export const BOOKING_STATUS_STARTED = 'STARTED'
export const BOOKING_STATUS_COMPLETED = 'COMPLETED'
export const BOOKING_STATUS_CANCELLED = 'CANCELLED'
export const BOOKING_STATUS_NO_SHOW = 'NO_SHOW'

/** The next status in the happy-path flow. */
export const BOOKING_STATUS_NEXT: Partial<Record<BookingStatus, BookingStatus>> = {
  PENDING: 'CONFIRMED',
  CONFIRMED: 'ARRIVED',
  ARRIVED: 'STARTED',
  STARTED: 'COMPLETED',
}

export const BOOKING_STATUS_NEXT_LABEL_KEY: Record<string, string> = {
  CONFIRMED: 'confirm',
  ARRIVED: 'markArrived',
  STARTED: 'markStarted',
  COMPLETED: 'markCompleted',
}

export const BOOKING_STATUS_TERMINAL: BookingStatus[] = ['COMPLETED', 'CANCELLED', 'NO_SHOW']

// ---- Locales ----
export const LOCALE_EN = 'en'
export const LOCALE_AR = 'ar'
export const DEFAULT_LOCALE = LOCALE_EN

// ---- Routes (locale prefix added by next-intl navigation) ----
export const ROUTE_LOGIN = '/login'
export const ROUTE_DASHBOARD = '/dashboard'
export const ROUTE_CALENDAR = '/calendar'
export const ROUTE_QUEUE = '/queue'
export const ROUTE_SERVICES = '/services'
export const ROUTE_STAFF = '/staff'
export const ROUTE_ANALYTICS = '/analytics'
export const ROUTE_CLIENTS = '/clients'

// ---- mweb (PWA) routes ----
// mweb is a TOP-LEVEL segment (outside the desktop /[locale] tree, per
// CLAUDE-code.md §13). Locale travels as a `?lang=` query param, NOT a path
// segment — so these are bare paths and the lang is appended by mwebHref().
export const ROUTE_MWEB = '/mweb'
export const ROUTE_MWEB_LOGIN = '/mweb/login'
export const ROUTE_MWEB_DASHBOARD = '/mweb/dashboard'
export const ROUTE_MWEB_QUEUE = '/mweb/queue'
export const ROUTE_MWEB_CALENDAR = '/mweb/calendar'
export const ROUTE_MWEB_BOOKINGS = '/mweb/bookings'
export const ROUTE_MWEB_PROFILE = '/mweb/profile'

// Query param that carries the locale on every mweb URL: /mweb/login?lang=en
export const MWEB_LANG_PARAM = 'lang'

// ---- Responsive / device handoff ----
// Single breakpoint that decides desktop shell vs. mweb (PWA) shell.
export const MOBILE_BREAKPOINT_PX = 768
// Cookie the client sets so middleware can route the FIRST request correctly
// (middleware runs on the server and can't read window.innerWidth).
export const DEVICE_COOKIE = 'barber-device'
export const DEVICE_MOBILE = 'mobile'
export const DEVICE_DESKTOP = 'desktop'
export const SHELL_DESKTOP = 'desktop' as const
export const SHELL_MWEB = 'mweb' as const

// Desktop bare-route  →  equivalent mweb bare-route. Drives the device redirect.
export const DESKTOP_TO_MWEB: Record<string, string> = {
  [ROUTE_LOGIN]: ROUTE_MWEB_LOGIN,
  [ROUTE_DASHBOARD]: ROUTE_MWEB_DASHBOARD,
  [ROUTE_QUEUE]: ROUTE_MWEB_QUEUE,
  [ROUTE_CALENDAR]: ROUTE_MWEB_CALENDAR,
}
export const MWEB_TO_DESKTOP: Record<string, string> = {
  [ROUTE_MWEB_LOGIN]: ROUTE_LOGIN,
  [ROUTE_MWEB_DASHBOARD]: ROUTE_DASHBOARD,
  [ROUTE_MWEB_QUEUE]: ROUTE_QUEUE,
  [ROUTE_MWEB_CALENDAR]: ROUTE_CALENDAR,
  [ROUTE_MWEB_BOOKINGS]: ROUTE_CALENDAR,
  [ROUTE_MWEB_PROFILE]: ROUTE_DASHBOARD,
}

// ---- Calendar views ----
export const CALENDAR_VIEW_DAY   = 'day'   as const
export const CALENDAR_VIEW_WEEK  = 'week'  as const
export const CALENDAR_VIEW_MONTH = 'month' as const

export type CalendarViewType = typeof CALENDAR_VIEW_DAY | typeof CALENDAR_VIEW_WEEK | typeof CALENDAR_VIEW_MONTH

// ---- Misc ----
export const DEFAULT_PAGE_SIZE = 20
export const STALE_TIME_DEFAULT = 1000 * 60 * 2
export const STALE_TIME_QUEUE = 0
export const STALE_TIME_STATS = 1000 * 60 * 5

