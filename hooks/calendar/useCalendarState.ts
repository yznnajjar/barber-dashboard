'use client'
import { useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { addDays } from 'date-fns'
import { CALENDAR_VIEW_DAY, CALENDAR_VIEW_WEEK, CALENDAR_PARAM_VIEW, type CalendarViewType } from '@/constants'
import type { ColorMode } from '@/components/calendar/calendarConfig'

export function useCalendarState() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [view, setViewState] = useState<CalendarViewType>(
    (searchParams.get(CALENDAR_PARAM_VIEW) as CalendarViewType) ?? CALENDAR_VIEW_DAY,
  )
  const [anchor, setAnchor] = useState<Date>(new Date())
  const [colorMode, setColorMode] = useState<ColorMode>('staff')
  const [dateAnchor, setDateAnchor] = useState<HTMLButtonElement | null>(null)

  const setView = (v: CalendarViewType) => {
    setViewState(v)
    const params = new URLSearchParams(searchParams.toString())
    params.set(CALENDAR_PARAM_VIEW, v)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const step = (dir: number) =>
    setAnchor((d) => addDays(d, dir * (view === CALENDAR_VIEW_WEEK ? 7 : 1)))

  return { view, setView, anchor, setAnchor, step, colorMode, setColorMode, dateAnchor, setDateAnchor }
}
