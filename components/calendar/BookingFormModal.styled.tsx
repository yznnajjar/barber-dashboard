import { Box, Stack, styled } from '@mui/material'

export const DrawerHeader = styled(Box)(({ theme }) => ({
  padding: '18px 24px',
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}))

export const DrawerBody = styled(Stack)({
  padding: '20px 24px',
  flex: 1,
  overflowY: 'auto',
})

export const DrawerFooter = styled(Box)(({ theme }) => ({
  padding: '14px 24px',
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  gap: theme.spacing(1),
}))
