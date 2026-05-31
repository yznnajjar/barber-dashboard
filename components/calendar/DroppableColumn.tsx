'use client'
import { useDroppable } from '@dnd-kit/core'
import { StaffCol } from './CalendarView.styled'

interface Props {
  columnId: string // staff id (day view) or date key (week view)
  children: React.ReactNode
}

// Wraps a calendar column so an appointment can be dropped into it.
// We expose the live DOM node via the droppable ref so the parent can measure
// the drop Y-offset and translate it into a time.
export default function DroppableColumn({ columnId, children }: Props) {
  const { setNodeRef } = useDroppable({ id: columnId, data: { columnId } })
  return <StaffCol ref={setNodeRef} data-column-id={columnId}>{children}</StaffCol>
}
