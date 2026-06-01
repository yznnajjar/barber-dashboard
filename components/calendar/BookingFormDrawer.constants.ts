export type FieldConfig = {
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  select?: boolean
  children?: React.ReactNode
}

export const FIELDS = {
  CUSTOMER_NAME: { name: 'customerName', label: 'Customer name' },
  PHONE: { name: 'phone', label: 'Phone' },
  SERVICE_ID: { name: 'serviceId', label: 'Service' },
  STAFF_ID: { name: 'staffId', label: 'Staff' },
  DATE: { name: 'date', label: 'Date' },
  START_TIME: { name: 'startTime', label: 'Start time' },
} as const
