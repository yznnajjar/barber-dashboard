import type {
  ServiceDto, StaffDto, BookingDto, ClientListItemDto, ClientProfileDto,
  QueueEntryDto, DashboardOverviewDto, AnalyticsReportDto, WorkingHourDto,
} from '@/types/api'
import type {
  Service, StaffMember, WorkingDay, Booking, QueueEntry, Client, ClientVisit,
  DashboardStats, ActivityItem, Analytics,
} from '@/types'

function avatarColor(id: string): number {
  return (id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 8) + 1
}

function dayKeyToLabel(d: string): WorkingDay['day'] {
  const map: Record<string, WorkingDay['day']> = {
    MON: 'Mon', TUE: 'Tue', WED: 'Wed', THU: 'Thu',
    FRI: 'Fri', SAT: 'Sat', SUN: 'Sun',
  }
  return map[d] || 'Mon'
}

function dayLabelToKey(d: WorkingDay['day']): string {
  const map: Record<string, string> = {
    Mon: 'MON', Tue: 'TUE', Wed: 'WED', Thu: 'THU',
    Fri: 'FRI', Sat: 'SAT', Sun: 'SUN',
  }
  return map[d] || 'MON'
}

// Parse "2026-06-01T10:30:00.000Z" into date "2026-06-01" and time "10:30"
function splitIso(iso: string): { date: string; time: string } {
  if (!iso) return { date: '', time: '' }
  const d = new Date(iso)
  const date = d.toISOString().slice(0, 10)
  const time = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  return { date, time }
}

// ---- Services ----
export function serviceDtoToService(dto: ServiceDto): Service {
  return {
    id: dto.id,
    name: dto.name,
    name_ar: dto.nameAr || '',
    duration: dto.durationMinutes,
    price: dto.priceJod,
    isActive: dto.isActive,
  }
}

export function serviceToCreateInput(s: Partial<Service>): {
  name: string; nameAr?: string; durationMinutes: number; priceJod: number; isActive?: boolean
} {
  return {
    name: s.name || '',
    nameAr: s.name_ar || undefined,
    durationMinutes: s.duration || 30,
    priceJod: s.price || 0,
    isActive: s.isActive,
  }
}

// ---- Staff ----
function workingHourDtoToWorkingDay(dto: WorkingHourDto): WorkingDay {
  return {
    day: dayKeyToLabel(dto.weekday),
    enabled: dto.isOpen,
    start: dto.startTime,
    end: dto.endTime,
  }
}

export function workingDayToWorkingHourDto(wd: WorkingDay): WorkingHourDto {
  return {
    weekday: dayLabelToKey(wd.day) as WorkingHourDto['weekday'],
    startTime: wd.start,
    endTime: wd.end,
    isOpen: wd.enabled,
  }
}

export function staffDtoToStaffMember(dto: StaffDto): StaffMember {
  return {
    id: dto.id,
    name: dto.fullName,
    name_ar: '',
    avatarColor: avatarColor(dto.id),
    role: dto.role,
    services: dto.services?.map((s) => s.id) || [],
    workingHours: dto.workingHours?.map(workingHourDtoToWorkingDay) || [],
  }
}

// ---- Bookings ----
export function bookingDtoToBooking(dto: BookingDto): Booking {
  const start = splitIso(dto.startAt)
  const end = splitIso(dto.endAt)
  return {
    id: dto.id,
    customerId: dto.client.id,
    customerName: dto.client.name,
    staffId: dto.staff.id,
    serviceId: dto.service.id,
    serviceName: dto.service.name,
    date: start.date,
    startTime: start.time,
    endTime: end.time,
    status: dto.status as Booking['status'],
    depositPaid: false,
    avatarColor: avatarColor(dto.client.id),
  }
}

// ---- Queue ----
export function queueEntryDtoToQueueEntry(dto: QueueEntryDto): QueueEntry {
  return {
    id: dto.id,
    position: dto.position,
    customerName: dto.name,
    serviceId: '',
    serviceName: dto.service,
    joinedAt: dto.joinedAt,
    estimatedWait: dto.estimatedWaitMin,
    avatarColor: avatarColor(dto.id),
  }
}

// ---- Clients ----
export function clientListItemToClient(dto: ClientListItemDto): Client {
  return {
    id: dto.id,
    name: dto.fullName,
    phone: dto.phone,
    totalVisits: dto.totalVisits,
    lastVisit: dto.lastVisitAt || '',
    totalSpend: dto.totalSpentJod,
    avatarColor: avatarColor(dto.id),
    notes: '',
    history: [],
  }
}

export function clientProfileToClient(dto: ClientProfileDto): Client {
  return {
    id: dto.id,
    name: dto.fullName,
    phone: dto.phone,
    totalVisits: dto.stats.totalVisits,
    lastVisit: dto.history[0]?.date || '',
    totalSpend: dto.stats.totalSpentJod,
    avatarColor: avatarColor(dto.id),
    notes: dto.notes || '',
    history: dto.history.map(visitDtoToClientVisit),
  }
}

function visitDtoToClientVisit(dto: ClientProfileDto['history'][0]): ClientVisit {
  return {
    id: dto.id,
    date: dto.date,
    serviceName: dto.service,
    staffName: dto.staff,
    amount: dto.amountJod,
  }
}

// ---- Dashboard ----
export function dashboardOverviewToStats(dto: DashboardOverviewDto): DashboardStats {
  return {
    todayBookings: dto.stats.todaysBookings,
    todayRevenue: dto.stats.todaysRevenueJod,
    queueLength: dto.stats.queueLength,
    newClients: dto.stats.newClients,
    bookingsTrend: 0,
    revenueTrend: 0,
    newClientsTrend: 0,
  }
}

export function dashboardOverviewToActivity(dto: DashboardOverviewDto): ActivityItem[] {
  return dto.recentActivity.map((a) => ({
    id: a.type + a.at,
    type: activityTypeMap(a.type),
    text: a.message,
    time: a.at,
  }))
}

function activityTypeMap(t: string): ActivityItem['type'] {
  const m: Record<string, ActivityItem['type']> = {
    BOOKING_CREATED: 'booking',
    BOOKING_CONFIRMED: 'booking',
    BOOKING_COMPLETED: 'booking',
    BOOKING_CANCELLED: 'cancel',
    PAYMENT: 'payment',
    QUEUE_JOINED: 'queue',
    QUEUE_CALLED: 'queue',
    QUEUE_CANCELLED: 'queue',
    REVIEW: 'review',
  }
  return m[t] || 'booking'
}

// ---- Analytics ----
export function analyticsReportToAnalytics(dto: AnalyticsReportDto): Analytics {
  return {
    totalRevenue: dto.summary.totalRevenueJod,
    totalBookings: dto.summary.totalBookings,
    newClients: dto.summary.newClients,
    avgBookingValue: dto.summary.avgBookingValueJod,
    revenueSeries: dto.revenueSeries.map((r) => ({
      label: r.date,
      value: r.revenueJod,
    })),
    heatmap: [],
    topServices: dto.topServices.map((s) => ({
      name: s.name,
      count: s.bookings,
    })),
    topClients: dto.topClients.map((c) => ({
      name: c.name,
      spend: c.spentJod,
      visits: c.visits,
      avatarColor: avatarColor(c.clientId),
    })),
  }
}
