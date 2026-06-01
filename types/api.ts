// ---- Response envelope ----
export interface ApiResponse<T> {
  success: boolean
  data: T
  timestamp: string
}

export interface ApiError {
  success: false
  statusCode: number
  message: string
  path: string
  timestamp: string
}

// ---- Auth ----
export interface LoginInput {
  email: string
  password: string
}

export interface RefreshInput {
  refreshToken: string
}

export interface AuthResult {
  accessToken: string
  refreshToken: string
  userId: string
  email: string
  role: string
  salonId: string | null
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

// ---- Services ----
export interface ServiceDto {
  id: string
  name: string
  nameAr?: string | null
  durationMinutes: number
  priceJod: number
  isActive: boolean
}

export interface CreateServiceInput {
  name: string
  nameAr?: string
  durationMinutes: number
  priceJod: number
  isActive?: boolean
}

export type UpdateServiceInput = Partial<CreateServiceInput>

// ---- Staff ----
export interface WorkingHourDto {
  weekday: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'
  startTime: string
  endTime: string
  isOpen: boolean
}

export interface StaffDto {
  id: string
  fullName: string
  role: string
  avatarUrl?: string | null
  isActive: boolean
  services: { id: string; name: string }[]
  workingHours: WorkingHourDto[]
}

export interface CreateStaffInput {
  fullName: string
  role?: string
  serviceIds?: string[]
  workingHours?: WorkingHourDto[]
}

export type UpdateStaffInput = Partial<CreateStaffInput>

// ---- Bookings ----
export interface BookingDto {
  id: string
  startAt: string
  endAt: string
  status: string
  priceJod: number
  client: { id: string; name: string }
  staff: { id: string; name: string }
  service: { id: string; name: string; durationMinutes: number }
}

export interface CreateBookingInput {
  clientId: string
  staffId: string
  serviceId: string
  startAt: string
}

export interface RescheduleBookingInput {
  startAt: string
}

// ---- Clients ----
export interface ClientListItemDto {
  id: string
  fullName: string
  phone: string
  totalVisits: number
  totalSpentJod: number
  lastVisitAt: string | null
}

export interface PaginatedResponse<T> {
  items: T[]
  page: number
  limit: number
  total: number
}

export interface ClientVisitDto {
  id: string
  date: string
  service: string
  staff: string
  amountJod: number
  status: string
}

export interface ClientProfileDto {
  id: string
  fullName: string
  phone: string
  notes: string | null
  memberSince: string
  stats: {
    totalVisits: number
    totalSpentJod: number
    avgSpendJod: number
  }
  history: ClientVisitDto[]
}

export interface CreateClientInput {
  fullName: string
  phone: string
  notes?: string
}

export type UpdateClientInput = Partial<CreateClientInput>

// ---- Queue ----
export interface QueueEntryDto {
  id: string
  position: number
  name: string
  service: string
  estimatedWaitMin: number
  joinedAt: string
  status: string
}

export interface JoinQueueInput {
  clientId?: string
  guestName?: string
  serviceId: string
}

// ---- Dashboard ----
export interface DashboardOverviewDto {
  stats: {
    todaysBookings: number
    todaysRevenueJod: number
    queueLength: number
    newClients: number
  }
  upcoming: Array<{
    id: string
    time: string
    client: string
    service: string
    staff: string
  }>
  recentActivity: Array<{
    type: string
    message: string
    at: string
  }>
}

// ---- Analytics ----
export type AnalyticsPeriodDto = 'today' | 'week' | 'month'

export interface AnalyticsReportDto {
  period: string
  range: { from: string; to: string }
  summary: {
    totalRevenueJod: number
    totalBookings: number
    newClients: number
    avgBookingValueJod: number
  }
  revenueSeries: Array<{ date: string; revenueJod: number }>
  topServices: Array<{ serviceId: string; name: string; bookings: number }>
  topClients: Array<{ clientId: string; name: string; spentJod: number; visits: number }>
}
