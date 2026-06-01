'use client'
import { useMemo, useState, type ReactNode } from 'react'
import { Popover } from '@mui/material'
import SearchRounded from '@mui/icons-material/SearchRounded'
import {
  FilterChipBtn, FilterBadge, Caret,
  PopWrap, PopHead, PopReset, PopSearch, PopList, PopOption, PopCheckbox,
  PopOptName, PopOptRole, PopOptRight, PopGroup, PopFoot, PopCount, QuickChips, QuickChip,
} from './CalendarView.styled'

export interface FilterOption {
  value: string
  primary: ReactNode
  /** Plain text used by the search box. */
  searchText?: string
  secondary?: ReactNode
  left?: ReactNode
  right?: ReactNode
  /** Group key — options sharing a key are listed under one heading. */
  group?: string
}

interface Props {
  icon?: ReactNode
  /** Label when nothing is selected (e.g. "All team"). */
  emptyLabel: string
  /** Label when something is selected (e.g. "Team"). */
  activeLabel: string
  title: string
  options: FilterOption[]
  value: string[]
  onChange: (next: string[]) => void
  searchPlaceholder?: string
  /** Optional quick filter chips above the list. */
  quickChips?: { id: string; label: string; active: boolean; onClick: () => void }[]
  /** Hide the [Reset] button + [n selected | Apply] footer (for short, no-search lists). */
  compact?: boolean
  /** Narrower popover (used for the Status filter). */
  width?: number
}

export default function CalendarFilterChip({
  icon, emptyLabel, activeLabel, title, options, value, onChange,
  searchPlaceholder, quickChips, compact, width,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [query, setQuery] = useState('')
  const [draft, setDraft] = useState<string[]>(value)

  const open = Boolean(anchorEl)
  const active = value.length > 0

  const openPop = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDraft(value)
    setQuery('')
    setAnchorEl(e.currentTarget)
  }
  const closePop = () => setAnchorEl(null)

  const toggle = (id: string) => {
    setDraft((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]))
  }

  const apply = () => {
    onChange(draft)
    closePop()
  }

  const reset = () => {
    setDraft([])
    if (!compact) return // for compact lists, reset also commits
    onChange([])
    closePop()
  }

  const filtered = useMemo(() => {
    if (!query.trim()) return options
    const q = query.toLowerCase()
    return options.filter((o) => (o.searchText ?? String(o.primary)).toLowerCase().includes(q))
  }, [options, query])

  const grouped = useMemo(() => {
    const map = new Map<string | undefined, FilterOption[]>()
    filtered.forEach((o) => {
      const arr = map.get(o.group) ?? []
      arr.push(o)
      map.set(o.group, arr)
    })
    return Array.from(map.entries())
  }, [filtered])

  const selectAllInGroup = (group: string | undefined) => {
    const ids = options.filter((o) => o.group === group).map((o) => o.value)
    const allOn = ids.every((id) => draft.includes(id))
    setDraft((d) => (allOn ? d.filter((x) => !ids.includes(x)) : Array.from(new Set([...d, ...ids]))))
  }

  return (
    <>
      <FilterChipBtn $active={active} onClick={openPop} type="button">
        {icon}
        {active ? activeLabel : emptyLabel}
        {active && <FilterBadge>{value.length}</FilterBadge>}
        <Caret />
      </FilterChipBtn>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={closePop}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              borderRadius: '12px',
              border: '1px solid #CDCECF',
              boxShadow: '0 8px 28px rgba(20,20,20,.12), 0 2px 6px rgba(20,20,20,.06)',
              overflow: 'hidden',
            },
          },
        }}
      >
        <PopWrap style={width ? { width } : undefined}>
          <PopHead>
            <b>{title}</b>
            <PopReset onClick={reset} disabled={draft.length === 0}>Reset</PopReset>
          </PopHead>

          {searchPlaceholder && (
            <PopSearch>
              <SearchRounded />
              <input
                placeholder={searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </PopSearch>
          )}

          {quickChips && quickChips.length > 0 && (
            <QuickChips>
              {quickChips.map((c) => (
                <QuickChip key={c.id} $active={c.active} onClick={c.onClick} type="button">
                  {c.label}
                </QuickChip>
              ))}
            </QuickChips>
          )}

          <PopList>
            {grouped.map(([group, opts]) => (
              <div key={group ?? '_'}>
                {group && (
                  <PopGroup>
                    <span>{group}</span>
                    <button type="button" onClick={() => selectAllInGroup(group)}>Select all</button>
                  </PopGroup>
                )}
                {opts.map((o) => (
                  <PopOption key={o.value} onClick={() => toggle(o.value)} type="button">
                    <PopCheckbox $on={draft.includes(o.value)} />
                    {o.left}
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <PopOptName>{o.primary}</PopOptName>
                      {o.secondary && <PopOptRole>{o.secondary}</PopOptRole>}
                    </span>
                    {o.right && <PopOptRight>{o.right}</PopOptRight>}
                  </PopOption>
                ))}
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: '14px 10px', fontSize: 12.5, color: '#9B9DA0', textAlign: 'center' }}>
                No matches
              </div>
            )}
          </PopList>

          {!compact && (
            <PopFoot>
              <PopCount>
                {draft.length} of {options.length} selected
              </PopCount>
              <button
                type="button"
                onClick={apply}
                style={{
                  background: '#7B69FF', color: '#fff', border: 0, borderRadius: 8,
                  padding: '6px 14px', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700, cursor: 'pointer',
                }}
              >
                Apply
              </button>
            </PopFoot>
          )}
        </PopWrap>
      </Popover>
    </>
  )
}
