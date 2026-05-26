import styled from 'styled-components';
import { theme } from '../lib/theme';
import { Card, Input } from '../components/ui';

export const FilterBar = styled.div`
  display: flex;
  gap: ${theme.spacing['3']};
  margin-bottom: ${theme.spacing['6']};
  flex-wrap: wrap;
  align-items: center;
`;

export const FilterSelect = styled.select`
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

export const SearchInput = styled(Input)`
  max-width: 280px;
  font-size: ${theme.typography.size.sm};
  padding: 9px 14px;
`;

export const BookingsTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['2']};
`;

export const BookingCard = styled(Card)`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.2fr 1fr 0.8fr auto;
  align-items: center;
  gap: ${theme.spacing['4']};
  transition: border-color ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.borderLight};
  }

  ${theme.media.mobile} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }
`;

export const ColHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.2fr 1fr 0.8fr auto;
  gap: ${theme.spacing['4']};
  padding: ${theme.spacing['3']} ${theme.spacing['6']};
  font-size: ${theme.typography.size.xs};
  font-weight: ${theme.typography.weight.semibold};
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.06em;

  ${theme.media.mobile} {
    display: none;
  }
`;

export const CellPrimary = styled.p`
  font-weight: ${theme.typography.weight.medium};
  color: ${theme.colors.textPrimary};
  font-size: ${theme.typography.size.base};
`;

export const CellSecondary = styled.p`
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.textSecondary};
  margin-top: 2px;
`;

export const Price = styled.span`
  font-weight: ${theme.typography.weight.semibold};
  color: ${theme.colors.primary};
`;

export const BookingActions = styled.div`
  display: flex;
  gap: ${theme.spacing['2']};
`;
