export type UserRole = 'CUSTOMER' | 'SALON_OWNER' | 'ADMIN'
export type GenderType = 'MALE' | 'FEMALE' | 'UNISEX'
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW'
export type SalonStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING_REVIEW'

export interface User {
  id: string; fullName: string; email: string
  phone: string | null; role: UserRole; avatarUrl: string | null; createdAt: string
}
export interface Salon {
  id: string; ownerId: string; name: string; description: string | null
  address: string; city: string; latitude: number; longitude: number
  phone: string | null; genderType: GenderType; status: SalonStatus
  walkInEnabled: boolean; openingHours: Record<string, unknown> | null
  coverImageUrl: string | null; createdAt: string
  staff?: StaffMember[]; services?: Service[]
  _count?: { reviews: number; bookings: number }
}
export interface StaffMember {
  id: string; salonId: string; name: string
  bio: string | null; specialty: string | null; avatarUrl: string | null; isActive: boolean
}
export interface Service {
  id: string; salonId: string; name: string; description: string | null
  genderTarget: GenderType; durationMin: number; price: string; isActive: boolean
}
export interface Booking {
  id: string; customerId: string; salonId: string; staffId: string | null
  serviceId: string; scheduledAt: string; status: BookingStatus
  notes: string | null; createdAt: string
  customer?: Pick<User, 'fullName' | 'phone'>
  service?: Pick<Service, 'name' | 'price' | 'durationMin'>
  staff?: Pick<StaffMember, 'name'>
}
