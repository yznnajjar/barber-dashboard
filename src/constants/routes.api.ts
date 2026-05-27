export const API_ROUTES = {
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_ME: '/auth/me',

  SALONS: '/salons',
  SALON_BY_ID: (id: string) => `/salons/${id}`,
  SALON_QUEUE: (id: string) => `/salons/${id}/queue`,

  BOOKINGS: '/bookings',
  BOOKING_COMPLETE: (id: string) => `/bookings/${id}/complete`,
  BOOKING_CANCEL: (id: string) => `/bookings/${id}/cancel`,

  QUEUE_CALL_NEXT: (salonId: string) => `/queue/call-next/${salonId}`,
  QUEUE_SERVE: (entryId: string) => `/queue/serve/${entryId}`,
  QUEUE_DONE: (entryId: string) => `/queue/done/${entryId}`,
  QUEUE_LEAVE: (entryId: string) => `/queue/leave/${entryId}`,
} as const;
