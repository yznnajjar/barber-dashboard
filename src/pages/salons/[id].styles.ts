import styled from 'styled-components';
import { theme } from '../../lib/theme';
import { Card } from '../../components/ui';

// ─── Tabs ──────────────────────────────────────────────────────────────────────
export const TabList = styled.div`
  display: flex;
  gap: 0;
  border-bottom: 1px solid ${theme.colors.border};
  margin-bottom: ${theme.spacing['8']};
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

interface TabBtnProps { active?: boolean; }

export const TabBtn = styled.button<TabBtnProps>`
  padding: ${theme.spacing['3']} ${theme.spacing['5']};
  font-size: ${theme.typography.size.base};
  font-weight: ${({ active }) => active ? theme.typography.weight.semibold : theme.typography.weight.medium};
  color: ${({ active }) => active ? theme.colors.primary : theme.colors.textSecondary};
  border-bottom: 2px solid ${({ active }) => active ? theme.colors.primary : 'transparent'};
  transition: all ${theme.transitions.fast};
  white-space: nowrap;
  margin-bottom: -1px;

  &:hover:not([data-active="true"]) { color: ${theme.colors.textPrimary}; }
`;

// ─── Overview Tab ─────────────────────────────────────────────────────────────
export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing['4']};

  ${theme.media.mobile} { grid-template-columns: 1fr; }
`;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['1']};
`;

export const InfoLabel = styled.p`
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: ${theme.typography.weight.semibold};
`;

export const InfoValue = styled.p`
  font-size: ${theme.typography.size.base};
  color: ${theme.colors.textPrimary};
`;

// ─── Services Tab ─────────────────────────────────────────────────────────────
export const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${theme.spacing['4']};
`;

export const ServiceCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['3']};
`;

export const ServiceHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${theme.spacing['3']};
`;

export const ServiceName = styled.h3`
  font-size: ${theme.typography.size.md};
  font-weight: ${theme.typography.weight.semibold};
  color: ${theme.colors.textPrimary};
`;

export const ServiceMeta = styled.div`
  display: flex;
  gap: ${theme.spacing['4']};
`;

export const ServiceMetaItem = styled.div`
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: ${theme.spacing['1']};
`;

export const ServicePrice = styled.div`
  font-size: ${theme.typography.size['2xl']};
  font-family: ${theme.typography.fontDisplay};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.primary};
`;

// ─── Staff Tab ────────────────────────────────────────────────────────────────
export const StaffGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: ${theme.spacing['4']};
`;

export const StaffCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${theme.spacing['3']};
`;

export const StaffName = styled.h3`
  font-size: ${theme.typography.size.md};
  font-weight: ${theme.typography.weight.semibold};
  color: ${theme.colors.textPrimary};
`;

export const StaffBio = styled.p`
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.textSecondary};
  line-height: ${theme.typography.leading.relaxed};
`;

export const ScheduleChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing['1']};
  justify-content: center;
`;

export const DayChip = styled.span<{ off?: boolean }>`
  padding: 2px 8px;
  border-radius: ${theme.radius.full};
  font-size: ${theme.typography.size.xs};
  font-weight: ${theme.typography.weight.medium};
  background: ${({ off }) => off ? theme.colors.bgElevated : theme.colors.primaryMuted};
  color: ${({ off }) => off ? theme.colors.textMuted : theme.colors.primary};
  text-decoration: ${({ off }) => off ? 'line-through' : 'none'};
`;

// ─── Bookings Tab ─────────────────────────────────────────────────────────────
export const BookingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['3']};
`;

export const BookingRow = styled(Card)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing['4']};
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.colors.borderLight};
  }
`;

export const BookingCustomer = styled.div`
  flex: 1.5;
  min-width: 140px;

  p:first-child {
    font-weight: ${theme.typography.weight.semibold};
    color: ${theme.colors.textPrimary};
  }
  p:last-child {
    font-size: ${theme.typography.size.sm};
    color: ${theme.colors.textSecondary};
  }
`;

export const BookingDetail = styled.div`
  flex: 1;
  min-width: 100px;

  p:first-child {
    font-size: ${theme.typography.size.sm};
    font-weight: ${theme.typography.weight.medium};
    color: ${theme.colors.textPrimary};
  }
  p:last-child {
    font-size: ${theme.typography.size.xs};
    color: ${theme.colors.textSecondary};
  }
`;

// ─── Queue Tab ────────────────────────────────────────────────────────────────
export const QueueGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['3']};
`;

export const QueueCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing['4']};
`;

export const QueueNum = styled.div<{ status: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${theme.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.size.xl};
  font-weight: ${theme.typography.weight.bold};
  font-family: ${theme.typography.fontDisplay};
  flex-shrink: 0;
  background: ${({ status }) =>
    status === 'SERVING' ? theme.colors.successMuted :
    status === 'CALLED' ? theme.colors.infoMuted :
    theme.colors.warningMuted};
  color: ${({ status }) =>
    status === 'SERVING' ? theme.colors.success :
    status === 'CALLED' ? theme.colors.info :
    theme.colors.warning};
`;

export const QueueCustomer = styled.div`
  flex: 1;
  min-width: 0;

  p:first-child {
    font-weight: ${theme.typography.weight.semibold};
    color: ${theme.colors.textPrimary};
  }
  p:last-child {
    font-size: ${theme.typography.size.sm};
    color: ${theme.colors.textSecondary};
    margin-top: 2px;
  }
`;

export const QueueActions = styled.div`
  display: flex;
  gap: ${theme.spacing['2']};
  flex-shrink: 0;
`;
