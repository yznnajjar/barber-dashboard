import styled, { css } from 'styled-components';
import { theme } from '../lib/theme';

export const SidebarWrap = styled.aside<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: ${theme.sidebar.width};
  height: 100vh;
  background: ${theme.colors.sidebar};
  border-right: 1px solid ${theme.colors.sidebarBorder};
  display: flex;
  flex-direction: column;
  z-index: ${theme.zIndex.sticky};
  overflow: hidden;
  transition: transform ${theme.transitions.slow};

  ${theme.media.mobile} {
    transform: ${({ open }) => (open ? 'translateX(0)' : `translateX(-100%)`)};
    box-shadow: ${({ open }) => (open ? theme.shadows.xl : 'none')};
  }
`;

export const SidebarLogo = styled.div`
  padding: ${theme.spacing['6']};
  border-bottom: 1px solid ${theme.colors.sidebarBorder};
  display: flex;
  align-items: center;
  gap: ${theme.spacing['3']};
`;

export const LogoMark = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
`;

export const LogoText = styled.div`
  h1 {
    font-family: ${theme.typography.fontDisplay};
    font-size: ${theme.typography.size.md};
    font-weight: ${theme.typography.weight.bold};
    color: ${theme.colors.textPrimary};
    line-height: 1.2;
  }
  p {
    font-size: ${theme.typography.size.xs};
    color: ${theme.colors.textMuted};
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
`;

export const SidebarNav = styled.nav`
  flex: 1;
  padding: ${theme.spacing['4']} ${theme.spacing['3']};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['1']};
  overflow-y: auto;
`;

export const NavLabel = styled.div`
  font-size: ${theme.typography.size.xs};
  font-weight: ${theme.typography.weight.semibold};
  color: ${theme.colors.textMuted};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: ${theme.spacing['4']} ${theme.spacing['3']} ${theme.spacing['2']};
`;

export const NavItem = styled.a<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing['3']};
  padding: ${theme.spacing['3']} ${theme.spacing['3']};
  border-radius: ${theme.radius.md};
  font-size: ${theme.typography.size.base};
  font-weight: ${theme.typography.weight.medium};
  color: ${theme.colors.textSecondary};
  transition: all ${theme.transitions.fast};
  cursor: pointer;
  position: relative;

  .icon {
    font-size: 18px;
    width: 24px;
    text-align: center;
    flex-shrink: 0;
  }

  ${({ active }) =>
    active &&
    css`
      background: ${theme.colors.primaryMuted};
      color: ${theme.colors.primary};
      font-weight: ${theme.typography.weight.semibold};

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 60%;
        background: ${theme.colors.primary};
        border-radius: 0 2px 2px 0;
      }
    `}

  &:not([data-active='true']):hover {
    background: ${theme.colors.bgHover};
    color: ${theme.colors.textPrimary};
  }
`;

export const SidebarFooter = styled.div`
  padding: ${theme.spacing['4']} ${theme.spacing['3']};
  border-top: 1px solid ${theme.colors.sidebarBorder};
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing['3']};
  padding: ${theme.spacing['3']};
  border-radius: ${theme.radius.md};
  cursor: pointer;
  transition: background ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.bgHover};
  }
`;

export const UserAvatar = styled.div<{ small?: boolean }>`
  width: ${({ small }) => (small ? '32px' : '34px')};
  height: ${({ small }) => (small ? '32px' : '34px')};
  border-radius: 50%;
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ small }) => (small ? '12px' : '14px')};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.textInverse};
  flex-shrink: 0;
`;

export const UserName = styled.div`
  flex: 1;
  min-width: 0;

  p:first-child {
    font-size: ${theme.typography.size.sm};
    font-weight: ${theme.typography.weight.semibold};
    color: ${theme.colors.textPrimary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  p:last-child {
    font-size: ${theme.typography.size.xs};
    color: ${theme.colors.textMuted};
    text-transform: capitalize;
  }
`;

export const LogoutIcon = styled.span`
  color: ${theme.colors.textMuted};
  font-size: 14px;
`;

export const TopBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: ${theme.colors.sidebar};
  border-bottom: 1px solid ${theme.colors.sidebarBorder};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${theme.spacing['4']};
  z-index: ${theme.zIndex.sticky};

  ${theme.media.lg} {
    display: none;
  }
`;

export const HamburgerBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: ${theme.radius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.textSecondary};
  font-size: 20px;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.bgHover};
    color: ${theme.colors.textPrimary};
  }
`;

export const TopBarTitle = styled.div`
  font-family: ${theme.typography.fontDisplay};
  font-size: ${theme.typography.size.md};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.textPrimary};
`;

export const Overlay = styled.div<{ visible: boolean }>`
  display: none;
  ${theme.media.mobile} {
    display: ${({ visible }) => (visible ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: ${theme.zIndex.sticky - 1};
    backdrop-filter: blur(2px);
  }
`;

export const Main = styled.main`
  min-height: 100vh;
  padding-left: ${theme.sidebar.width};
  padding-bottom: ${theme.spacing['8']};

  ${theme.media.mobile} {
    padding-left: 0;
    padding-top: 56px;
  }
`;

export const PageContent = styled.div`
  padding: ${theme.spacing['8']};
  max-width: 1400px;
  margin: 0 auto;
  animation: fadeIn 0.3s ease;

  ${theme.media.mobile} {
    padding: ${theme.spacing['4']};
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const BottomNav = styled.nav`
  display: none;
  ${theme.media.mobile} {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: ${theme.colors.sidebar};
    border-top: 1px solid ${theme.colors.sidebarBorder};
    z-index: ${theme.zIndex.sticky};
    padding: 0 ${theme.spacing['2']};
  }
`;

export const BottomNavItem = styled.a<{ active?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  font-size: ${theme.typography.size.xs};
  color: ${({ active }) => (active ? theme.colors.primary : theme.colors.textMuted)};
  transition: color ${theme.transitions.fast};
  cursor: pointer;

  .icon {
    font-size: 20px;
  }
`;

export const LoadingScreen = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.bg};
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${theme.spacing['4']};
  margin-bottom: ${theme.spacing['8']};
  flex-wrap: wrap;

  ${theme.media.mobile} {
    margin-bottom: ${theme.spacing['5']};
  }
`;

export const PageTitle = styled.h1`
  font-family: ${theme.typography.fontDisplay};
  font-size: ${theme.typography.size['3xl']};
  font-weight: ${theme.typography.weight.bold};
  color: ${theme.colors.textPrimary};
  line-height: ${theme.typography.leading.tight};

  span {
    color: ${theme.colors.primary};
  }

  ${theme.media.mobile} {
    font-size: ${theme.typography.size['2xl']};
  }
`;

export const PageSubtitle = styled.p`
  font-size: ${theme.typography.size.base};
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing['1']};
`;

export const PageActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing['3']};
  flex-shrink: 0;
`;
