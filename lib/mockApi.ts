import { MOCK_LATENCY_MS } from '@/constants'
import {
  SERVICES, STAFF, BOOKINGS, QUEUE, DASHBOARD_STATS, ACTIVITY, CLIENTS, ANALYTICS,
} from './mockData'
import type {
  Service, StaffMember, Booking, QueueEntry, DashboardStats,
  ActivityItem, Client, Analytics, AnalyticsPeriod,
} from '@/types'

// Simulates a network round-trip so React Query loading/skeleton states are real.
// To go live, replace each function body with `const { data } = await api.get(...); return data`.
const delay = <T>(value: T, ms = MOCK_LATENCY_MS): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), ms))

export const mockApi = {
  getDashboardStats: (): Promise<DashboardStats> => delay(DASHBOARD_STATS),
  getActivity: (): Promise<ActivityItem[]> => delay(ACTIVITY),
  getBookings: (): Promise<Booking[]> => delay(BOOKINGS),
  getQueue: (): Promise<QueueEntry[]> => delay(QUEUE, 300),
  getServices: (): Promise<Service[]> => delay(SERVICES),
  getStaff: (): Promise<StaffMember[]> => delay(STAFF),
  getClients: (): Promise<Client[]> => delay(CLIENTS),
  getAnalytics: (period: AnalyticsPeriod): Promise<Analytics> => delay(ANALYTICS[period]),
}
