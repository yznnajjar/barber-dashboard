export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'

export type Role = 'SALON_OWNER' | 'STAFF' | 'ADMIN'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  salonId: string | null
}

export interface Salon {
  id: string
  name: string
  name_ar: string
  ownerId: string
}

export interface Service {
  id: string
  name: string
  name_ar: string
  duration: number // minutes
  price: number // JD
  isActive: boolean
}

export interface StaffMember {
  id: string
  name: string
  name_ar: string
  avatarColor: number // 1-8 -> .av-N gradient
  role: string
  services: string[] // service IDs
  workingHours: WorkingDay[]
}

export interface WorkingDay {
  day: 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'
  enabled: boolean
  start: string // "09:00"
  end: string // "18:00"
}

export interface Booking {
  id: string
  customerId: string
  customerName: string
  staffId: string
  serviceId: string
  serviceName: string
  date: string // ISO date
  startTime: string // "10:30"
  endTime: string // "11:15"
  status: BookingStatus
  depositPaid: boolean
  avatarColor: number
}

export interface QueueEntry {
  id: string
  position: number
  customerName: string
  serviceId: string
  serviceName: string
  joinedAt: string // ISO
  estimatedWait: number // minutes
  avatarColor: number
}

export interface DashboardStats {
  todayBookings: number
  todayRevenue: number
  queueLength: number
  newClients: number
  bookingsTrend: number // % vs yesterday
  revenueTrend: number
  newClientsTrend: number
}

export interface ActivityItem {
  id: string
  type: 'booking' | 'cancel' | 'payment' | 'queue' | 'review'
  text: string
  time: string
}

export interface Client {
  id: string
  name: string
  phone: string
  totalVisits: number
  lastVisit: string // ISO date
  totalSpend: number
  avatarColor: number
  notes: string
  history: ClientVisit[]
}

export interface ClientVisit {
  id: string
  date: string
  serviceName: string
  staffName: string
  amount: number
}

export type AnalyticsPeriod = 'today' | 'week' | 'month'

export interface Analytics {
  totalRevenue: number
  totalBookings: number
  newClients: number
  avgBookingValue: number
  revenueSeries: { label: string; value: number }[]
  heatmap: number[][] // 7 rows (days) x 12 cols (slots), value 0-4 intensity
  topServices: { name: string; count: number }[]
  topClients: { name: string; spend: number; visits: number; avatarColor: number }[]
}
