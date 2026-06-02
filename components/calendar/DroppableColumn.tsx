'use client'
import { memo } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { StaffCol } from './CalendarView.styled'

interface Props {
  columnId: string // staff id (day view) or date key (week view)
  children: React.ReactNode
}

const DroppableColumn = memo(function DroppableColumn({ columnId, children }: Props) {
  const { setNodeRef } = useDroppable({ id: columnId, data: { columnId } })
  return <StaffCol ref={setNodeRef} data-column-id={columnId}>{children}</StaffCol>
})

export default DroppableColumn
