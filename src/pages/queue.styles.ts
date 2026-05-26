import styled, { keyframes } from 'styled-components';
import { theme } from '../lib/theme';
import { Card } from '../components/ui';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

export const LiveDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${theme.colors.success};
  animation: ${pulse} 2s ease infinite;
`;

export const LiveIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing['2']};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.success};
  font-weight: ${theme.typography.weight.medium};
`;

export const SalonSelect = styled.select`
  background: ${theme.colors.bgElevated};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.md};
  padding: 9px 14px;
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

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing['4']};
  margin-bottom: ${theme.spacing['6']};
`;

export const StatBox = styled(Card)`
  text-align: center;
  padding: ${theme.spacing['5']};
`;

export const StatNum = styled.div<{ color?: string }>`
  font-size: ${theme.typography.size['4xl']};
  font-family: ${theme.typography.fontDisplay};
  font-weight: ${theme.typography.weight.bold};
  color: ${({ color }) => color || theme.colors.textPrimary};
  line-height: 1;
`;

export const StatLabel = styled.div`
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing['1']};
`;

export const QueueList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['3']};
`;

export const QueueCard = styled(Card)<{ status: string }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing['5']};
  transition: all ${theme.transitions.base};
  border-left: 3px solid
    ${({ status }) =>
      status === 'SERVING'
        ? theme.colors.success
        : status === 'CALLED'
        ? theme.colors.info
        : theme.colors.warning};

  &:hover {
    transform: translateX(2px);
  }
`;

export const PositionBadge = styled.div<{ status: string }>`
  width: 56px;
  height: 56px;
  border-radius: ${theme.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.size['2xl']};
  font-weight: ${theme.typography.weight.bold};
  font-family: ${theme.typography.fontDisplay};
  flex-shrink: 0;
  background: ${({ status }) =>
    status === 'SERVING'
      ? theme.colors.successMuted
      : status === 'CALLED'
      ? theme.colors.infoMuted
      : theme.colors.warningMuted};
  color: ${({ status }) =>
    status === 'SERVING'
      ? theme.colors.success
      : status === 'CALLED'
      ? theme.colors.info
      : theme.colors.warning};
`;

export const CustomerInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const CustomerName = styled.h3`
  font-size: ${theme.typography.size.lg};
  font-weight: ${theme.typography.weight.semibold};
  color: ${theme.colors.textPrimary};
`;

export const CustomerDetails = styled.p`
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.textSecondary};
  margin-top: 3px;
`;

export const WaitTime = styled.div`
  text-align: center;
  flex-shrink: 0;
  min-width: 80px;

  p:first-child {
    font-size: ${theme.typography.size['2xl']};
    font-family: ${theme.typography.fontDisplay};
    font-weight: ${theme.typography.weight.bold};
    color: ${theme.colors.textPrimary};
    line-height: 1;
  }

  p:last-child {
    font-size: ${theme.typography.size.xs};
    color: ${theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
`;

export const ActionBtns = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['2']};
  flex-shrink: 0;
`;

export const EmptyIcon = styled.div`
  font-size: 48px;
`;
