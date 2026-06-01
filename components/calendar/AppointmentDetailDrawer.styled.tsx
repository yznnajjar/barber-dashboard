import { Box, Stack, Typography, styled } from '@mui/material'

export const CustomerRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  marginBottom: 24,
})

export const DetailRows = styled(Stack)({ gap: 12 })

export const DetailRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
})

export const DetailLabel = styled(Typography)({ color: 'text.secondary' })
DetailLabel.defaultProps = { variant: 'body2' }

export const DetailValue = styled(Typography)({ fontWeight: 600 })
DetailValue.defaultProps = { variant: 'body2' }

export const RescheduleBox = styled(Box)({ marginTop: 20 })

export const ActionsRow = styled(Box)({ display: 'flex', gap: 8 })
