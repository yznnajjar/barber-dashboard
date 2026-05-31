import type {
  Service, StaffMember, Booking, QueueEntry, DashboardStats,
  ActivityItem, Client, Analytics, AnalyticsPeriod,
} from '@/types'

const today = new Date()
const iso = (d: Date) => d.toISOString()
const dayOffset = (n: number) => {
  const d = new Date(today)
  d.setDate(d.getDate() + n)
  return iso(d).slice(0, 10)
}
const minsAgo = (m: number) => iso(new Date(today.getTime() - m * 60000))

export const SERVICES: Service[] = [
  { id: 'svc_1', name: 'Classic Haircut', name_ar: 'قصة كلاسيكية', duration: 30, price: 8, isActive: true },
  { id: 'svc_2', name: 'Beard Trim & Shape', name_ar: 'تهذيب اللحية', duration: 20, price: 5, isActive: true },
  { id: 'svc_3', name: 'Hot Towel Shave', name_ar: 'حلاقة بالمنشفة الساخنة', duration: 45, price: 12, isActive: true },
  { id: 'svc_4', name: 'Hair + Beard Combo', name_ar: 'شعر ولحية', duration: 50, price: 14, isActive: true },
  { id: 'svc_5', name: 'Kids Cut', name_ar: 'قصة أطفال', duration: 25, price: 6, isActive: true },
  { id: 'svc_6', name: 'Hair Colour', name_ar: 'صبغة شعر', duration: 90, price: 25, isActive: false },
  { id: 'svc_7', name: 'Facial Treatment', name_ar: 'عناية بالوجه', duration: 40, price: 18, isActive: true },
]

const FULL_WEEK = (start = '09:00', end = '18:00') =>
  (['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const).map((day) => ({
    day, enabled: day !== 'Fri', start, end,
  }))

export const STAFF: StaffMember[] = [
  { id: 'stf_1', name: 'Omar Khalil', name_ar: 'عمر خليل', avatarColor: 1, role: 'Senior Barber', services: ['svc_1', 'svc_2', 'svc_3', 'svc_4'], workingHours: FULL_WEEK() },
  { id: 'stf_2', name: 'Yousef Najjar', name_ar: 'يوسف النجار', avatarColor: 2, role: 'Barber', services: ['svc_1', 'svc_2', 'svc_5'], workingHours: FULL_WEEK('10:00', '19:00') },
  { id: 'stf_3', name: 'Rami Saleh', name_ar: 'رامي صالح', avatarColor: 3, role: 'Barber', services: ['svc_1', 'svc_4', 'svc_7'], workingHours: FULL_WEEK() },
  { id: 'stf_4', name: 'Laith Hadid', name_ar: 'ليث حديد', avatarColor: 6, role: 'Junior Barber', services: ['svc_1', 'svc_5'], workingHours: FULL_WEEK('11:00', '20:00') },
]

const svcName = (id: string) => SERVICES.find((s) => s.id === id)?.name ?? 'Service'

export const BOOKINGS: Booking[] = [
  { id: 'bk_1', customerId: 'c1', customerName: 'Tariq Mansour', staffId: 'stf_1', serviceId: 'svc_1', serviceName: svcName('svc_1'), date: dayOffset(0), startTime: '09:30', endTime: '10:00', status: 'CONFIRMED', depositPaid: true, avatarColor: 1 },
  { id: 'bk_2', customerId: 'c2', customerName: 'Nader Aziz', staffId: 'stf_2', serviceId: 'svc_4', serviceName: svcName('svc_4'), date: dayOffset(0), startTime: '10:00', endTime: '10:50', status: 'PENDING', depositPaid: false, avatarColor: 2 },
  { id: 'bk_3', customerId: 'c3', customerName: 'Sami Odeh', staffId: 'stf_1', serviceId: 'svc_3', serviceName: svcName('svc_3'), date: dayOffset(0), startTime: '11:00', endTime: '11:45', status: 'CONFIRMED', depositPaid: true, avatarColor: 3 },
  { id: 'bk_4', customerId: 'c4', customerName: 'Khaled Issa', staffId: 'stf_3', serviceId: 'svc_2', serviceName: svcName('svc_2'), date: dayOffset(0), startTime: '11:30', endTime: '11:50', status: 'COMPLETED', depositPaid: true, avatarColor: 4 },
  { id: 'bk_5', customerId: 'c5', customerName: 'Faris Deeb', staffId: 'stf_2', serviceId: 'svc_1', serviceName: svcName('svc_1'), date: dayOffset(0), startTime: '12:30', endTime: '13:00', status: 'CONFIRMED', depositPaid: true, avatarColor: 5 },
  { id: 'bk_6', customerId: 'c6', customerName: 'Bilal Hamdan', staffId: 'stf_4', serviceId: 'svc_5', serviceName: svcName('svc_5'), date: dayOffset(0), startTime: '13:00', endTime: '13:25', status: 'PENDING', depositPaid: false, avatarColor: 6 },
  { id: 'bk_7', customerId: 'c7', customerName: 'Ziad Rahman', staffId: 'stf_1', serviceId: 'svc_4', serviceName: svcName('svc_4'), date: dayOffset(0), startTime: '14:00', endTime: '14:50', status: 'CONFIRMED', depositPaid: true, avatarColor: 7 },
  { id: 'bk_8', customerId: 'c8', customerName: 'Marwan Said', staffId: 'stf_3', serviceId: 'svc_7', serviceName: svcName('svc_7'), date: dayOffset(0), startTime: '15:00', endTime: '15:40', status: 'CONFIRMED', depositPaid: true, avatarColor: 8 },
  { id: 'bk_9', customerId: 'c9', customerName: 'Adel Karim', staffId: 'stf_2', serviceId: 'svc_2', serviceName: svcName('svc_2'), date: dayOffset(0), startTime: '16:00', endTime: '16:20', status: 'CANCELLED', depositPaid: false, avatarColor: 2 },
  { id: 'bk_10', customerId: 'c10', customerName: 'Hadi Wael', staffId: 'stf_1', serviceId: 'svc_3', serviceName: svcName('svc_3'), date: dayOffset(0), startTime: '16:30', endTime: '17:15', status: 'CONFIRMED', depositPaid: true, avatarColor: 3 },
  { id: 'bk_11', customerId: 'c2', customerName: 'Nader Aziz', staffId: 'stf_4', serviceId: 'svc_1', serviceName: svcName('svc_1'), date: dayOffset(1), startTime: '10:00', endTime: '10:30', status: 'CONFIRMED', depositPaid: true, avatarColor: 2 },
  { id: 'bk_12', customerId: 'c11', customerName: 'Saeed Noor', staffId: 'stf_2', serviceId: 'svc_4', serviceName: svcName('svc_4'), date: dayOffset(1), startTime: '12:00', endTime: '12:50', status: 'PENDING', depositPaid: false, avatarColor: 1 },
]

export const QUEUE: QueueEntry[] = [
  { id: 'q1', position: 1, customerName: 'Walk-in · Jamal A.', serviceId: 'svc_1', serviceName: svcName('svc_1'), joinedAt: minsAgo(18), estimatedWait: 0, avatarColor: 5 },
  { id: 'q2', position: 2, customerName: 'Walk-in · Hani M.', serviceId: 'svc_2', serviceName: svcName('svc_2'), joinedAt: minsAgo(12), estimatedWait: 15, avatarColor: 1 },
  { id: 'q3', position: 3, customerName: 'Walk-in · Wassim T.', serviceId: 'svc_4', serviceName: svcName('svc_4'), joinedAt: minsAgo(7), estimatedWait: 35, avatarColor: 3 },
  { id: 'q4', position: 4, customerName: 'Walk-in · Fadi R.', serviceId: 'svc_1', serviceName: svcName('svc_1'), joinedAt: minsAgo(3), estimatedWait: 55, avatarColor: 8 },
]

export const DASHBOARD_STATS: DashboardStats = {
  todayBookings: 24, todayRevenue: 312.5, queueLength: 4, newClients: 6,
  bookingsTrend: 12, revenueTrend: 8, newClientsTrend: -3,
}

export const ACTIVITY: ActivityItem[] = [
  { id: 'a1', type: 'booking', text: 'New booking — Tariq Mansour, Classic Haircut', time: minsAgo(5) },
  { id: 'a2', type: 'payment', text: 'Payment received — 14.000 JD', time: minsAgo(22) },
  { id: 'a3', type: 'queue', text: 'Walk-in joined the queue — Fadi R.', time: minsAgo(3) },
  { id: 'a4', type: 'cancel', text: 'Booking cancelled — Adel Karim', time: minsAgo(48) },
  { id: 'a5', type: 'review', text: 'New 5★ review from Sami Odeh', time: minsAgo(95) },
]

const visit = (id: string, d: number, svc: string, staff: string, amt: number) => ({
  id, date: dayOffset(-d), serviceName: svc, staffName: staff, amount: amt,
})

export const CLIENTS: Client[] = [
  { id: 'cl_1', name: 'Tariq Mansour', phone: '+962 79 555 1020', totalVisits: 14, lastVisit: dayOffset(0), totalSpend: 168, avatarColor: 1, notes: 'Prefers Omar. Fade on the sides, scissors on top.', history: [visit('v1', 0, 'Classic Haircut', 'Omar Khalil', 8), visit('v2', 21, 'Hair + Beard Combo', 'Omar Khalil', 14), visit('v3', 49, 'Classic Haircut', 'Omar Khalil', 8)] },
  { id: 'cl_2', name: 'Nader Aziz', phone: '+962 78 441 7781', totalVisits: 9, lastVisit: dayOffset(-3), totalSpend: 126, avatarColor: 2, notes: 'Allergic to certain shampoos — check before colour.', history: [visit('v4', 3, 'Hair + Beard Combo', 'Yousef Najjar', 14), visit('v5', 30, 'Hot Towel Shave', 'Omar Khalil', 12)] },
  { id: 'cl_3', name: 'Sami Odeh', phone: '+962 77 902 3344', totalVisits: 22, lastVisit: dayOffset(-1), totalSpend: 264, avatarColor: 3, notes: 'VIP. Always books the 45-min shave.', history: [visit('v6', 1, 'Hot Towel Shave', 'Omar Khalil', 12), visit('v7', 15, 'Hot Towel Shave', 'Omar Khalil', 12)] },
  { id: 'cl_4', name: 'Khaled Issa', phone: '+962 79 118 6655', totalVisits: 5, lastVisit: dayOffset(-12), totalSpend: 40, avatarColor: 4, notes: '', history: [visit('v8', 12, 'Beard Trim & Shape', 'Rami Saleh', 5)] },
  { id: 'cl_5', name: 'Faris Deeb', phone: '+962 78 770 2210', totalVisits: 11, lastVisit: dayOffset(-2), totalSpend: 110, avatarColor: 5, notes: 'Comes every other Thursday.', history: [visit('v9', 2, 'Classic Haircut', 'Yousef Najjar', 8)] },
  { id: 'cl_6', name: 'Ziad Rahman', phone: '+962 79 334 8890', totalVisits: 7, lastVisit: dayOffset(-6), totalSpend: 98, avatarColor: 7, notes: '', history: [visit('v10', 6, 'Hair + Beard Combo', 'Omar Khalil', 14)] },
  { id: 'cl_7', name: 'Marwan Said', phone: '+962 77 221 5567', totalVisits: 3, lastVisit: dayOffset(-9), totalSpend: 54, avatarColor: 8, notes: 'New client — referred by Sami.', history: [visit('v11', 9, 'Facial Treatment', 'Rami Saleh', 18)] },
]

const series = (vals: number[], labels: string[]) => vals.map((value, i) => ({ label: labels[i], value }))
const DAY_LABELS = ['09', '11', '13', '15', '17', '19']
const WEEK_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_LABELS = ['W1', 'W2', 'W3', 'W4']

const HEATMAP = [
  [0, 1, 2, 3, 3, 2, 1, 2, 3, 4, 3, 1],
  [0, 1, 2, 2, 3, 3, 2, 3, 4, 4, 2, 1],
  [1, 2, 3, 3, 2, 2, 3, 3, 3, 2, 1, 0],
  [1, 2, 2, 3, 4, 3, 2, 3, 4, 3, 2, 1],
  [2, 3, 4, 4, 3, 3, 4, 4, 4, 3, 2, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 3, 3, 4, 4, 4, 3, 4, 4, 3, 2, 1],
]

export const ANALYTICS: Record<AnalyticsPeriod, Analytics> = {
  today: {
    totalRevenue: 312.5, totalBookings: 24, newClients: 6, avgBookingValue: 13.02,
    revenueSeries: series([28, 64, 92, 70, 110, 48], DAY_LABELS),
    heatmap: HEATMAP,
    topServices: [{ name: 'Classic Haircut', count: 11 }, { name: 'Hair + Beard Combo', count: 6 }, { name: 'Hot Towel Shave', count: 4 }, { name: 'Beard Trim & Shape', count: 2 }, { name: 'Kids Cut', count: 1 }],
    topClients: [{ name: 'Sami Odeh', spend: 36, visits: 3, avatarColor: 3 }, { name: 'Tariq Mansour', spend: 22, visits: 2, avatarColor: 1 }, { name: 'Ziad Rahman', spend: 14, visits: 1, avatarColor: 7 }],
  },
  week: {
    totalRevenue: 1842.0, totalBookings: 138, newClients: 27, avgBookingValue: 13.35,
    revenueSeries: series([240, 300, 280, 360, 410, 0, 252], WEEK_LABELS),
    heatmap: HEATMAP,
    topServices: [{ name: 'Classic Haircut', count: 62 }, { name: 'Hair + Beard Combo', count: 34 }, { name: 'Hot Towel Shave', count: 21 }, { name: 'Beard Trim & Shape', count: 14 }, { name: 'Facial Treatment', count: 7 }],
    topClients: [{ name: 'Sami Odeh', spend: 84, visits: 7, avatarColor: 3 }, { name: 'Tariq Mansour', spend: 56, visits: 4, avatarColor: 1 }, { name: 'Faris Deeb', spend: 40, visits: 5, avatarColor: 5 }, { name: 'Nader Aziz', spend: 42, visits: 3, avatarColor: 2 }, { name: 'Ziad Rahman', spend: 28, visits: 2, avatarColor: 7 }],
  },
  month: {
    totalRevenue: 7920.0, totalBookings: 592, newClients: 104, avgBookingValue: 13.38,
    revenueSeries: series([1680, 1920, 2010, 2310], MONTH_LABELS),
    heatmap: HEATMAP,
    topServices: [{ name: 'Classic Haircut', count: 268 }, { name: 'Hair + Beard Combo', count: 142 }, { name: 'Hot Towel Shave', count: 88 }, { name: 'Beard Trim & Shape', count: 61 }, { name: 'Facial Treatment', count: 33 }],
    topClients: [{ name: 'Sami Odeh', spend: 264, visits: 22, avatarColor: 3 }, { name: 'Tariq Mansour', spend: 168, visits: 14, avatarColor: 1 }, { name: 'Nader Aziz', spend: 126, visits: 9, avatarColor: 2 }, { name: 'Faris Deeb', spend: 110, visits: 11, avatarColor: 5 }, { name: 'Ziad Rahman', spend: 98, visits: 7, avatarColor: 7 }],
  },
}
