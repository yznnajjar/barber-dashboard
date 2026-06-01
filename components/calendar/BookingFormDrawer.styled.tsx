import { Box, Stack, styled } from '@mui/material'

export const DrawerHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
}))

export const DrawerBody = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(3),
  flex: 1,
  overflowY: 'auto',
}))

export const DrawerFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  gap: theme.spacing(1),
}))
