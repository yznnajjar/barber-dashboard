import styled from 'styled-components'
import { COLORS } from '@/lib/colors'

export const SearchBar = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${COLORS.ink20};
`

export const StatTile = styled.div`
  padding: 12px;
  background: ${COLORS.pebble};
  border-radius: 8px;
`

export const StatTileLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${COLORS.ink60};
`

export const StatTileValue = styled.div`
  font-weight: 700;
  font-size: 15px;
`

export const StatTileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
`

export const SectionLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: ${COLORS.ink60};
  text-transform: uppercase;
`

export const HistoryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
  border-bottom: 1px solid ${COLORS.ink20};
`

export const SavedFlag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${COLORS.success};
  font-size: 12px;
  font-weight: 600;
`

export const DrawerHead = styled.div`
  padding: 18px 24px;
  border-bottom: 1px solid ${COLORS.ink20};
  display: flex;
  align-items: center;
  gap: 16px;
`

export const DATAGRID_SX = {
  border: 'none',
  '& .MuiDataGrid-row': { cursor: 'pointer' },
  '& .MuiDataGrid-row:hover': { backgroundColor: COLORS.pebble },
  '& .MuiDataGrid-columnHeaders': { bgcolor: COLORS.pebble },
  // Match Barber.html .tbl thead th — 11px/700 uppercase, ink-60.
  '& .MuiDataGrid-columnHeaderTitle': {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: COLORS.ink60,
  },
  '& .MuiDataGrid-cell': { fontSize: 13.5 },
  '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': { outline: 'none' },
} as const
