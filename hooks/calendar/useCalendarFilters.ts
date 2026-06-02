'use client'
import { useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import {
  CALENDAR_PARAM_VIEW, CALENDAR_PARAM_STAFF_ID,
  CALENDAR_PARAM_STATUS, CALENDAR_PARAM_SERVICE_ID,
} from '@/constants'

export interface CalendarFilters {
  staffIds: string[]
  statuses: string[]
  serviceIds: string[]
}

export function useCalendarFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [filters, setFiltersState] = useState<CalendarFilters>(() => ({
    staffIds: searchParams.getAll(CALENDAR_PARAM_STAFF_ID),
    statuses: searchParams.getAll(CALENDAR_PARAM_STATUS),
    serviceIds: searchParams.getAll(CALENDAR_PARAM_SERVICE_ID),
  }))

  const setFilters = (next: CalendarFilters) => {
    setFiltersState(next)
    const params = new URLSearchParams()
    // Preserve view param if present
    const view = searchParams.get(CALENDAR_PARAM_VIEW)
    if (view) params.set(CALENDAR_PARAM_VIEW, view)
    next.staffIds.forEach((id) => params.append(CALENDAR_PARAM_STAFF_ID, id))
    next.statuses.forEach((s) => params.append(CALENDAR_PARAM_STATUS, s))
    next.serviceIds.forEach((id) => params.append(CALENDAR_PARAM_SERVICE_ID, id))
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const hasActiveFilters =
    filters.staffIds.length > 0 ||
    filters.statuses.length > 0 ||
    filters.serviceIds.length > 0

  return { filters, setFilters, hasActiveFilters }
}
