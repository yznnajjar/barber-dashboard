import styled from 'styled-components';
import { theme } from '../lib/theme';
import { Card } from '../components/ui';

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing['4']};
  margin-bottom: ${theme.spacing['8']};

  ${theme.media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${theme.media.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StatCard = styled(Card)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${theme.spacing['4']};
`;

export const StatContent = styled.div`
  flex: 1;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: ${theme.spacing['6']};

  ${theme.media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const BookingsCard = styled(Card)`
  padding: 0;
`;

export const BookingsCardHeader = styled.div`
  padding: ${theme.spacing['6']} ${theme.spacing['6']} 0;
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${theme.spacing['6']} ${theme.spacing['4']};
`;

export const TableRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing['4']};
  padding: ${theme.spacing['4']} 0;
  border-bottom: 1px solid ${theme.colors.border};
  transition: background ${theme.transitions.fast};

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.div<{ flex?: number; align?: string }>`
  flex: ${({ flex = 1 }) => flex};
  text-align: ${({ align = 'left' }) => align};
  min-width: 0;
`;

export const BookingName = styled.p`
  font-size: ${theme.typography.size.base};
  font-weight: ${theme.typography.weight.medium};
  color: ${theme.colors.textPrimary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const BookingMeta = styled.p`
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.textSecondary};
  margin-top: 2px;
`;

export const BookingPrice = styled.p`
  font-size: ${theme.typography.size.base};
  font-weight: ${theme.typography.weight.semibold};
  color: ${theme.colors.textPrimary};
`;

export const QueueCard = styled(Card)`
  padding: 0;
`;

export const QueueCardHeader = styled.div`
  padding: ${theme.spacing['6']} ${theme.spacing['6']} 0;
`;

export const QueueBody = styled.div`
  padding: 0 ${theme.spacing['6']} ${theme.spacing['4']};
`;

export const QueueItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing['3']};
  padding: ${theme.spacing['3']} 0;
  border-bottom: 1px solid ${theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const QueuePosition = styled.div`
  width: 28px;
  height: 28px;
  border-radius: ${theme.radius.sm};
  background: ${theme.colors.bgElevated};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.size.sm};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.textSecondary};
  flex-shrink: 0;
`;

export const QueueInfo = styled.div`
  flex: 1;
  min-width: 0;

  p:first-child {
    font-size: ${theme.typography.size.base};
    font-weight: ${theme.typography.weight.medium};
    color: ${theme.colors.textPrimary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  p:last-child {
    font-size: ${theme.typography.size.sm};
    color: ${theme.colors.textSecondary};
    margin-top: 1px;
  }
`;

export const SalonSelector = styled.select`
  background: ${theme.colors.bgElevated};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.md};
  padding: 8px 12px;
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.textPrimary};
  font-family: ${theme.typography.fontBody};
  cursor: pointer;

  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
  }

  option {
    background: ${theme.colors.bgCard};
  }
`;

export const SkeletonRow = styled.div`
  flex: 1;
`;
