'use client'
import { useTranslations } from 'next-intl'
import {
  Table, TableHead, TableBody, TableRow, TableCell, Switch, IconButton, Typography,
} from '@mui/material'
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded'
import { useToggleService } from '@/hooks/mutations/useToggleService'
import { formatJD, formatDuration } from '@/lib/utils'
import { SubName } from './ServicesView.styled'
import type { Service } from '@/types'

const HEAD_SX = {
  bgcolor: 'background.default', fontSize: 11, fontWeight: 700, color: 'text.secondary',
  textTransform: 'uppercase', letterSpacing: '0.06em',
} as const

interface Props {
  services: Service[]
  onEdit: (s: Service) => void
  onDelete: (s: Service) => void
}

export default function ServicesTable({ services, onEdit, onDelete }: Props) {
  const t = useTranslations('services')
  const toggle = useToggleService()

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={HEAD_SX}>{t('name')}</TableCell>
          <TableCell sx={HEAD_SX}>{t('duration')}</TableCell>
          <TableCell sx={HEAD_SX}>{t('price')}</TableCell>
          <TableCell sx={HEAD_SX} align="center">{t('active')}</TableCell>
          <TableCell sx={HEAD_SX} align="right" />
        </TableRow>
      </TableHead>
      <TableBody>
        {services.map((s) => (
          <TableRow key={s.id} hover sx={{ cursor: 'pointer' }} onClick={() => onEdit(s)}>
            <TableCell>
              <Typography sx={{ fontWeight: 600 }}>{s.name}</Typography>
              <SubName>{s.name_ar}</SubName>
            </TableCell>
            <TableCell>{formatDuration(s.duration)}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{formatJD(s.price)}</TableCell>
            <TableCell align="center" onClick={(e) => e.stopPropagation()}>
              <Switch checked={s.isActive} onChange={() => toggle.mutate({ id: s.id, isActive: !s.isActive })} />
            </TableCell>
            <TableCell align="right" onClick={(e) => e.stopPropagation()}>
              <IconButton size="small" color="error" onClick={() => onDelete(s)}>
                <DeleteOutlineRounded fontSize="small" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
