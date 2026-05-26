import styled from 'styled-components';
import { theme } from '../lib/theme';

export const Page = styled.div`
  min-height: 100vh;
  background: ${theme.colors.bg};
  display: grid;
  grid-template-columns: 1fr 1fr;

  ${theme.media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const LeftPanel = styled.div`
  background: ${theme.colors.sidebar};
  border-right: 1px solid ${theme.colors.sidebarBorder};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${theme.spacing['16']};
  position: relative;
  overflow: hidden;

  ${theme.media.mobile} {
    display: none;
  }

  &::before {
    content: '✂';
    position: absolute;
    bottom: -40px;
    right: -40px;
    font-size: 240px;
    opacity: 0.04;
    line-height: 1;
    user-select: none;
  }
`;

export const BrandMark = styled.div`
  width: 52px;
  height: 52px;
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: ${theme.spacing['8']};
`;

export const BrandName = styled.h1`
  font-family: ${theme.typography.fontDisplay};
  font-size: ${theme.typography.size['4xl']};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.textPrimary};
  line-height: ${theme.typography.leading.tight};
  margin-bottom: ${theme.spacing['4']};
`;

export const BrandTagline = styled.p`
  font-size: ${theme.typography.size.lg};
  color: ${theme.colors.textSecondary};
  line-height: ${theme.typography.leading.relaxed};
  max-width: 400px;
`;

export const Features = styled.ul`
  list-style: none;
  margin-top: ${theme.spacing['10']};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['4']};
`;

export const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing['3']};
  font-size: ${theme.typography.size.base};
  color: ${theme.colors.textSecondary};

  &::before {
    content: '✦';
    color: ${theme.colors.primary};
    font-size: 12px;
    flex-shrink: 0;
  }
`;

export const RightPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing['8']};
`;

export const LoginBox = styled.div`
  width: 100%;
  max-width: 400px;
`;

export const LoginHeader = styled.div`
  margin-bottom: ${theme.spacing['10']};
`;

export const LoginTitle = styled.h2`
  font-family: ${theme.typography.fontDisplay};
  font-size: ${theme.typography.size['3xl']};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing['2']};
`;

export const LoginSubtitle = styled.p`
  font-size: ${theme.typography.size.base};
  color: ${theme.colors.textSecondary};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['5']};
`;

export const GlobalError = styled.div`
  background: ${theme.colors.errorMuted};
  border: 1px solid ${theme.colors.error}30;
  border-radius: ${theme.radius.md};
  padding: ${theme.spacing['3']} ${theme.spacing['4']};
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.error};
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
  width: 36px;
  height: 36px;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

export const MobileBrandText = styled.span`
  font-family: ${theme.typography.fontDisplay};
  font-size: ${theme.typography.size.xl};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.textPrimary};
`;

export const TestAccounts = styled.div`
  margin-top: ${theme.spacing['8']};
  padding: ${theme.spacing['4']};
  background: ${theme.colors.bgCard};
  border-radius: ${theme.radius.md};
  border: 1px solid ${theme.colors.border};
`;

export const TestAccountsLabel = styled.p`
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.textMuted};
  margin-bottom: ${theme.spacing['2']};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: ${theme.typography.weight.semibold};
`;

export const TestAccountItem = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing['2']} 0;
  border-bottom: 1px solid ${theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const TestAccountRole = styled.span`
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.textSecondary};
`;

export const TestAccountEmail = styled.span`
  font-size: ${theme.typography.size.xs};
  color: ${theme.colors.textMuted};
  font-family: ${theme.typography.fontMono};
`;
