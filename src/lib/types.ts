export type Role = 'CUSTOMER' | 'SALON_OWNER' | 'ADMIN';
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
export type QueueStatus = 'WAITING' | 'CALLED' | 'SERVING' | 'DONE' | 'LEFT';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
export type GenderPolicy = 'MALE_ONLY' | 'FEMALE_ONLY' | 'MIXED';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  avatarUrl?: string;
  createdAt: string;
}

export interface Salon {
  id: string;
  ownerId: string;
  name: string;
  nameAr?: string;
  description?: string;
  address: string;
  city: string;
  lat?: number;
  lng?: number;
  genderPolicy: GenderPolicy;
  isActive: boolean;
  isApproved: boolean;
  openTime: string;
  closeTime: string;
  workingDays: number[];
  avatarUrl?: string;
  coverUrl?: string;
  rating: number;
  totalReviews: number;
  phone?: string;
  services?: Service[];
  staff?: Staff[];
  reviews?: Review[];
  promotions?: Promotion[];
}

export interface Service {
  id: string;
  salonId: string;
  name: string;
  nameAr?: string;
  description?: string;
  price: number;
  durationMin: number;
  isActive: boolean;
  order: number;
}

export interface Staff {
  id: string;
  salonId: string;
  name: string;
  nameAr?: string;
  bio?: string;
  avatarUrl?: string;
  isActive: boolean;
  order: number;
  schedules?: StaffSchedule[];
  services?: { service: Service }[];
  _count?: { followers: number };
}

export interface StaffSchedule {
  id: string;
  staffId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isOff: boolean;
}

export interface Booking {
  id: string;
  salonId: string;
  customerId: string;
  staffId?: string;
  serviceId: string;
  status: BookingStatus;
  startTime: string;
  endTime: string;
  totalPrice: number;
  notes?: string;
  cancelReason?: string;
  createdAt: string;
  salon?: Pick<Salon, 'id' | 'name' | 'nameAr' | 'address'>;
  customer?: Pick<User, 'id' | 'name' | 'phone'>;
  staff?: Pick<Staff, 'id' | 'name' | 'nameAr'>;
  service?: Pick<Service, 'id' | 'name' | 'nameAr' | 'price' | 'durationMin'>;
  payment?: Payment;
}

export interface QueueEntry {
  id: string;
  salonId: string;
  customerId: string;
  staffId?: string;
  serviceId?: string;
  status: QueueStatus;
  position: number;
  waitMinutes: number;
  estimatedWaitMin?: number;
  joinedAt: string;
  calledAt?: string;
  servedAt?: string;
  customer?: Pick<User, 'id' | 'name' | 'avatarUrl'>;
  staff?: Pick<Staff, 'id' | 'name' | 'nameAr'>;
  service?: Pick<Service, 'id' | 'name' | 'nameAr' | 'durationMin'>;
}

export interface Review {
  id: string;
  salonId: string;
  customerId: string;
  bookingId?: string;
  rating: number;
  comment?: string;
  reply?: string;
  repliedAt?: string;
  createdAt: string;
  customer?: Pick<User, 'id' | 'name' | 'avatarUrl'>;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: string;
  paidAt?: string;
}

export interface Promotion {
  id: string;
  salonId: string;
  title: string;
  titleAr?: string;
  description?: string;
  discount: number;
  code?: string;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  titleAr?: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  data?: Record<string, unknown>;
}

export interface DashboardStats {
  totalBookings: number;
  todayBookings: number;
  totalRevenue: number;
  todayRevenue: number;
  queueLength: number;
  avgRating: number;
  newCustomers: number;
  completionRate: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}
