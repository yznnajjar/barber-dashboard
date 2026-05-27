export const BOOKING_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW',
} as const;

export const QUEUE_STATUS = {
  WAITING: 'WAITING',
  CALLED: 'CALLED',
  SERVING: 'SERVING',
  DONE: 'DONE',
  LEFT: 'LEFT',
} as const;

export const BOOKING_STATUS_BADGE: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
  [BOOKING_STATUS.CONFIRMED]: 'success',
  [BOOKING_STATUS.PENDING]:   'warning',
  [BOOKING_STATUS.COMPLETED]: 'info',
  [BOOKING_STATUS.CANCELLED]: 'error',
  [BOOKING_STATUS.NO_SHOW]:   'default',
};

export const QUEUE_STATUS_BADGE: Record<string, 'success' | 'warning' | 'info'> = {
  [QUEUE_STATUS.WAITING]: 'warning',
  [QUEUE_STATUS.CALLED]:  'info',
  [QUEUE_STATUS.SERVING]: 'success',
};

export const BOOKING_STATUSES = ['ALL', ...Object.values(BOOKING_STATUS)] as const;

export const ACTIVE_QUEUE_STATUSES = [QUEUE_STATUS.WAITING, QUEUE_STATUS.CALLED, QUEUE_STATUS.SERVING] as const;
