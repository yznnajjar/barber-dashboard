import { QUEUE_STATUS } from '@/constants/status';

export const CHIP_COLOR = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  PRIMARY: 'primary',
  DEFAULT: 'default',
} as const;

export type ChipColor = (typeof CHIP_COLOR)[keyof typeof CHIP_COLOR];

export function badgeChipColor(variant: string): ChipColor {
  switch (variant) {
    case CHIP_COLOR.SUCCESS:  return CHIP_COLOR.SUCCESS;
    case CHIP_COLOR.WARNING:  return CHIP_COLOR.WARNING;
    case CHIP_COLOR.ERROR:    return CHIP_COLOR.ERROR;
    case CHIP_COLOR.INFO:     return CHIP_COLOR.INFO;
    case 'gold':              return CHIP_COLOR.PRIMARY;
    default:                  return CHIP_COLOR.DEFAULT;
  }
}

export function queueStatusChipColor(status: string): ChipColor {
  if (status === QUEUE_STATUS.SERVING) return CHIP_COLOR.SUCCESS;
  if (status === QUEUE_STATUS.CALLED)  return CHIP_COLOR.INFO;
  if (status === QUEUE_STATUS.WAITING) return CHIP_COLOR.WARNING;
  return CHIP_COLOR.DEFAULT;
}
