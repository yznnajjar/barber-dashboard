import { DEFAULT_LOCALE } from './locale';

export const ROUTES = {
  LOGIN: '/login',

  DESKTOP: (locale: string = DEFAULT_LOCALE) => ({
    HOME: `/${locale}`,
    DASHBOARD: `/${locale}/dashboard`,
    BOOKINGS: `/${locale}/bookings`,
    QUEUE: `/${locale}/queue`,
    STAFF: `/${locale}/staff`,
    SERVICES: `/${locale}/services`,
    REVIEWS: `/${locale}/reviews`,
    ANALYTICS: `/${locale}/analytics`,
    CLIENTS: `/${locale}/clients`,
    SALON_DETAIL: (id: string) => `/${locale}/salons/${id}`,
  }),

  MWEB: {
    HOME: '/mweb',
    DASHBOARD: '/mweb/dashboard',
    BOOKINGS: '/mweb/bookings',
    QUEUE: '/mweb/queue',
    MORE: '/mweb/more',
  },
} as const;
