import api from './axios'
import type {
  AuthResult, AuthTokens,
  ServiceDto, CreateServiceInput, UpdateServiceInput,
  StaffDto, CreateStaffInput, UpdateStaffInput,
  BookingDto, CreateBookingInput, RescheduleBookingInput,
  ClientListItemDto, ClientProfileDto, PaginatedResponse,
  CreateClientInput, UpdateClientInput,
  QueueEntryDto, JoinQueueInput,
  DashboardOverviewDto,
  AnalyticsReportDto, AnalyticsPeriodDto,
} from '@/types/api'
import type {
  Service, StaffMember, Booking, QueueEntry,
  DashboardStats, ActivityItem, Client, Analytics,
} from '@/types'
import {
  serviceDtoToService, serviceToCreateInput,
  staffDtoToStaffMember, workingDayToWorkingHourDto,
  bookingDtoToBooking,
  queueEntryDtoToQueueEntry,
  clientListItemToClient, clientProfileToClient,
  dashboardOverviewToStats, dashboardOverviewToActivity,
  analyticsReportToAnalytics,
} from './transform'

function unwrap<T>(res: { data: { success: boolean; data: T } }): T {
  return res.data.data
}

// ---- Auth ----
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ success: boolean; data: AuthResult }>('/auth/login', { email, password }).then(unwrap),

  refresh: (refreshToken: string) =>
    api.post<{ success: boolean; data: AuthTokens }>('/auth/refresh', { refreshToken }).then(unwrap),

  logout: () => api.post('/auth/logout'),
}

// ---- Dashboard ----
export const dashboardApi = {
  getOverview: async (): Promise<{ stats: DashboardStats; activity: ActivityItem[] }> => {
    const dto = await api
      .get<{ success: boolean; data: DashboardOverviewDto }>('/dashboard/overview')
      .then(unwrap)
    return {
      stats: dashboardOverviewToStats(dto),
      activity: dashboardOverviewToActivity(dto),
    }
  },
}

// ---- Bookings ----
export interface BookingFilters {
  staffIds?: string[]
  statuses?: string[]
  serviceIds?: string[]
}

export const bookingsApi = {
  getCalendar: async (
    date: string,
    view: 'day' | 'week' | 'month' = 'day',
    filters?: BookingFilters,
  ): Promise<Booking[]> => {
    const params: Record<string, unknown> = { date, view }
    if (filters?.staffIds?.length) params.staffIds = filters.staffIds
    if (filters?.statuses?.length) params.statuses = filters.statuses
    if (filters?.serviceIds?.length) params.serviceIds = filters.serviceIds
    const dtos = await api
      .get<{ success: boolean; data: BookingDto[] }>('/bookings', { params })
      .then(unwrap)
    return dtos.map(bookingDtoToBooking)
  },

  getOne: (id: string): Promise<Booking> =>
    api
      .get<{ success: boolean; data: BookingDto }>(`/bookings/${id}`)
      .then(unwrap)
      .then(bookingDtoToBooking),

  create: (input: CreateBookingInput): Promise<Booking> =>
    api
      .post<{ success: boolean; data: BookingDto }>('/bookings', input)
      .then(unwrap)
      .then(bookingDtoToBooking),

  reschedule: (id: string, startAt: string): Promise<Booking> =>
    api
      .patch<{ success: boolean; data: BookingDto }>(`/bookings/${id}/reschedule`, { startAt })
      .then(unwrap)
      .then(bookingDtoToBooking),

  confirm: (id: string): Promise<Booking> =>
    api
      .patch<{ success: boolean; data: BookingDto }>(`/bookings/${id}/confirm`)
      .then(unwrap)
      .then(bookingDtoToBooking),

  complete: (id: string): Promise<Booking> =>
    api
      .patch<{ success: boolean; data: BookingDto }>(`/bookings/${id}/complete`)
      .then(unwrap)
      .then(bookingDtoToBooking),

  cancel: (id: string, reason?: string): Promise<Booking> =>
    api
      .patch<{ success: boolean; data: BookingDto }>(`/bookings/${id}/cancel`, { reason })
      .then(unwrap)
      .then(bookingDtoToBooking),

  updateStatus: (id: string, status: string): Promise<Booking> =>
    api
      .patch<{ success: boolean; data: BookingDto }>(`/bookings/${id}/status`, { status })
      .then(unwrap)
      .then(bookingDtoToBooking),
}

// ---- Services ----
export const servicesApi = {
  getAll: (): Promise<Service[]> =>
    api
      .get<{ success: boolean; data: ServiceDto[] }>('/services')
      .then(unwrap)
      .then((dtos) => dtos.map(serviceDtoToService)),

  create: (input: CreateServiceInput): Promise<Service> =>
    api
      .post<{ success: boolean; data: ServiceDto }>('/services', input)
      .then(unwrap)
      .then(serviceDtoToService),

  update: (id: string, input: UpdateServiceInput): Promise<Service> =>
    api
      .patch<{ success: boolean; data: ServiceDto }>(`/services/${id}`, input)
      .then(unwrap)
      .then(serviceDtoToService),

  delete: (id: string): Promise<void> =>
    api.delete(`/services/${id}`),
}

// ---- Staff ----
export const staffApi = {
  getAll: (): Promise<StaffMember[]> =>
    api
      .get<{ success: boolean; data: StaffDto[] }>('/staff')
      .then(unwrap)
      .then((dtos) => dtos.map(staffDtoToStaffMember)),

  getOne: (id: string): Promise<StaffMember> =>
    api
      .get<{ success: boolean; data: StaffDto }>(`/staff/${id}`)
      .then(unwrap)
      .then(staffDtoToStaffMember),

  create: (input: CreateStaffInput): Promise<StaffMember> =>
    api
      .post<{ success: boolean; data: StaffDto }>('/staff', input)
      .then(unwrap)
      .then(staffDtoToStaffMember),

  update: (id: string, input: UpdateStaffInput): Promise<StaffMember> =>
    api
      .patch<{ success: boolean; data: StaffDto }>(`/staff/${id}`, input)
      .then(unwrap)
      .then(staffDtoToStaffMember),
}

// ---- Clients ----
export const clientsApi = {
  list: async (page = 1, limit = 20, search?: string): Promise<Client[]> => {
    const res = await api
      .get<{ success: boolean; data: PaginatedResponse<ClientListItemDto> }>('/clients', {
        params: { page, limit, search },
      })
      .then(unwrap)
    return res.items.map(clientListItemToClient)
  },

  getProfile: (id: string): Promise<Client> =>
    api
      .get<{ success: boolean; data: ClientProfileDto }>(`/clients/${id}`)
      .then(unwrap)
      .then(clientProfileToClient),

  create: (input: CreateClientInput): Promise<Client> =>
    api
      .post<{ success: boolean; data: ClientListItemDto }>('/clients', input)
      .then(unwrap)
      .then(clientListItemToClient),

  update: (id: string, input: UpdateClientInput): Promise<Client> =>
    api
      .patch<{ success: boolean; data: ClientListItemDto }>(`/clients/${id}`, input)
      .then(unwrap)
      .then(clientListItemToClient),
}

// ---- Queue ----
export const queueApi = {
  get: (): Promise<QueueEntry[]> =>
    api
      .get<{ success: boolean; data: QueueEntryDto[] }>('/queue')
      .then(unwrap)
      .then((dtos) => dtos.map(queueEntryDtoToQueueEntry)),

  join: (input: JoinQueueInput): Promise<QueueEntry[]> =>
    api
      .post<{ success: boolean; data: QueueEntryDto[] }>('/queue/join', input)
      .then(unwrap)
      .then((dtos) => dtos.map(queueEntryDtoToQueueEntry)),

  callNext: (): Promise<QueueEntry[]> =>
    api
      .post<{ success: boolean; data: QueueEntryDto[] }>('/queue/call-next')
      .then(unwrap)
      .then((dtos) => dtos.map(queueEntryDtoToQueueEntry)),

  cancel: (id: string): Promise<QueueEntry[]> =>
    api
      .delete<{ success: boolean; data: QueueEntryDto[] }>(`/queue/${id}`)
      .then(unwrap)
      .then((dtos) => dtos.map(queueEntryDtoToQueueEntry)),
}

// ---- Analytics ----
export const analyticsApi = {
  get: (period: AnalyticsPeriodDto = 'week'): Promise<Analytics> =>
    api
      .get<{ success: boolean; data: AnalyticsReportDto }>('/analytics', { params: { period } })
      .then(unwrap)
      .then(analyticsReportToAnalytics),
}
