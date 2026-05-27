import styled from 'styled-components';
import { theme } from '@/shared/theme/tokens';

export const Page = styled.div`
  display: flex;
  min-height: 100vh;

  ${theme.media.mobile} {
    flex-direction: column;
  }
`;

export const LeftPanel = styled.div`
  flex: 1;
  background: linear-gradient(135deg, ${theme.colors.primaryDark} 0%, ${theme.colors.primary} 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${theme.spacing['16']};
  color: ${theme.colors.textInverse};

  ${theme.media.mobile} {
    display: none;
  }
`;

export const BrandMark = styled.div`
  font-size: 48px;
  margin-bottom: ${theme.spacing['6']};
  opacity: 0.9;
`;

export const BrandName = styled.h1`
  font-family: ${theme.typography.fontDisplay};
  font-size: ${theme.typography.size['4xl']};
  font-weight: ${theme.typography.weight.bold};
  line-height: ${theme.typography.leading.tight};
  margin-bottom: ${theme.spacing['4']};
`;

export const BrandTagline = styled.p`
  font-size: ${theme.typography.size.md};
  opacity: 0.8;
  margin-bottom: ${theme.spacing['12']};
  line-height: ${theme.typography.leading.relaxed};
`;

export const Features = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['4']};
`;

export const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing['3']};
  font-size: ${theme.typography.size.base};
  opacity: 0.85;

  &::before {
    content: '✓';
    font-weight: ${theme.typography.weight.bold};
    opacity: 0.7;
    font-size: ${theme.typography.size.md};
  }
`;

export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing['8']};
  background: ${theme.colors.bg};
`;

export const LoginBox = styled.div`
  width: 100%;
  max-width: 400px;
`;

export const LoginHeader = styled.div`
  margin-bottom: ${theme.spacing['8']};
`;

export const LoginTitle = styled.h2`
  font-family: ${theme.typography.fontDisplay};
  font-size: ${theme.typography.size['3xl']};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.textPrimary};
  line-height: ${theme.typography.leading.tight};
`;

export const LoginSubtitle = styled.p`
  font-size: ${theme.typography.size.base};
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing['2']};
`;

export const MobileBrand = styled.div`
  display: none;
  ${theme.media.mobile} {
    display: flex;
    align-items: center;
    gap: ${theme.spacing['3']};
    margin-bottom: ${theme.spacing['8']};
  }
`;

export const MobileBrandIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: ${theme.colors.textInverse};
`;

export const MobileBrandText = styled.h1`
  font-family: ${theme.typography.fontDisplay};
  font-size: ${theme.typography.size.xl};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.textPrimary};
`;

export const TestAccounts = styled.div`
  margin-top: ${theme.spacing['8']};
  padding: ${theme.spacing['4']};
  background: ${theme.colors.bgElevated};
  border-radius: ${theme.radius.md};
`;

export const TestAccountsLabel = styled.p`
  font-size: ${theme.typography.size.xs};
  font-weight: ${theme.typography.weight.semibold};
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: ${theme.spacing['3']};
`;

export const TestAccountItem = styled.div`
  display: flex;
  gap: ${theme.spacing['2']};
  padding: ${theme.spacing['2']} 0;
  cursor: pointer;
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.size.sm};
  transition: color ${theme.transitions.fast};

  &:hover { color: ${theme.colors.primary}; }
`;

export const TestAccountRole = styled.span`
  font-weight: ${theme.typography.weight.semibold};
  min-width: 80px;
`;

export const TestAccountEmail = styled.span`
  color: ${theme.colors.textMuted};
`;
