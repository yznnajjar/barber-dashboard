import styled, { css, keyframes } from 'styled-components';
import { theme } from '../../lib/theme';

// ─── Button ───────────────────────────────────────────────────────────────────
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const buttonVariants: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background: ${theme.colors.primary};
    color: ${theme.colors.textInverse};
    &:hover:not(:disabled) { background: ${theme.colors.primaryLight}; box-shadow: ${theme.shadows.glow}; }
    &:active:not(:disabled) { background: ${theme.colors.primaryDark}; }
  `,
  secondary: css`
    background: ${theme.colors.bgElevated};
    color: ${theme.colors.textPrimary};
    border: 1px solid ${theme.colors.border};
    &:hover:not(:disabled) { background: ${theme.colors.bgHover}; border-color: ${theme.colors.borderLight}; }
  `,
  ghost: css`
    background: transparent;
    color: ${theme.colors.textSecondary};
    &:hover:not(:disabled) { background: ${theme.colors.bgHover}; color: ${theme.colors.textPrimary}; }
  `,
  danger: css`
    background: ${theme.colors.errorMuted};
    color: ${theme.colors.error};
    border: 1px solid ${theme.colors.error}30;
    &:hover:not(:disabled) { background: ${theme.colors.error}25; }
  `,
  success: css`
    background: ${theme.colors.successMuted};
    color: ${theme.colors.success};
    border: 1px solid ${theme.colors.success}30;
    &:hover:not(:disabled) { background: ${theme.colors.success}25; }
  `,
};

const buttonSizes: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    padding: 6px 12px;
    font-size: ${theme.typography.size.sm};
    border-radius: ${theme.radius.sm};
    gap: ${theme.spacing['1']};
  `,
  md: css`
    padding: 9px 18px;
    font-size: ${theme.typography.size.base};
    border-radius: ${theme.radius.md};
    gap: ${theme.spacing['2']};
  `,
  lg: css`
    padding: 12px 24px;
    font-size: ${theme.typography.size.md};
    border-radius: ${theme.radius.lg};
    gap: ${theme.spacing['2']};
  `,
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.typography.weight.medium};
  font-family: ${theme.typography.fontBody};
  transition: all ${theme.transitions.fast};
  cursor: pointer;
  border: none;
  white-space: nowrap;
  position: relative;
  overflow: hidden;

  ${({ variant = 'primary' }) => buttonVariants[variant]}
  ${({ size = 'md' }) => buttonSizes[size]}
  ${({ fullWidth }) => fullWidth && css`width: 100%;`}

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

// ─── Badge ────────────────────────────────────────────────────────────────────
type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'gold';

interface BadgeProps {
  variant?: BadgeVariant;
  dot?: boolean;
}

const badgeVariants: Record<BadgeVariant, ReturnType<typeof css>> = {
  default: css`background: ${theme.colors.bgElevated}; color: ${theme.colors.textSecondary};`,
  success: css`background: ${theme.colors.successMuted}; color: ${theme.colors.success};`,
  warning: css`background: ${theme.colors.warningMuted}; color: ${theme.colors.warning};`,
  error: css`background: ${theme.colors.errorMuted}; color: ${theme.colors.error};`,
  info: css`background: ${theme.colors.infoMuted}; color: ${theme.colors.info};`,
  gold: css`background: ${theme.colors.primaryMuted}; color: ${theme.colors.primary};`,
};

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: ${theme.radius.full};
  font-size: ${theme.typography.size.xs};
  font-weight: ${theme.typography.weight.semibold};
  letter-spacing: 0.02em;
  text-transform: uppercase;
  ${({ variant = 'default' }) => badgeVariants[variant]}

  ${({ dot, variant = 'default' }) => dot && css`
    &::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
      flex-shrink: 0;
    }
  `}
`;

// ─── Card ─────────────────────────────────────────────────────────────────────
interface CardProps {
  hoverable?: boolean;
  padding?: keyof typeof theme.spacing;
}

export const Card = styled.div<CardProps>`
  background: ${theme.colors.bgCard};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  padding: ${({ padding = '6' }) => theme.spacing[padding]};
  box-shadow: ${theme.shadows.card};

  ${({ hoverable }) => hoverable && css`
    transition: border-color ${theme.transitions.base}, box-shadow ${theme.transitions.base};
    &:hover {
      border-color: ${theme.colors.borderLight};
      box-shadow: ${theme.shadows.md};
    }
  `}
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing['6']};
  gap: ${theme.spacing['4']};
`;

export const CardTitle = styled.h3`
  font-size: ${theme.typography.size.md};
  font-weight: ${theme.typography.weight.semibold};
  color: ${theme.colors.textPrimary};
  line-height: ${theme.typography.leading.tight};
`;

// ─── Shimmer / Skeleton ───────────────────────────────────────────────────────
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

interface SkeletonProps {
  width?: string;
  height?: string;
  radius?: string;
}

export const Skeleton = styled.div<SkeletonProps>`
  width: ${({ width = '100%' }) => width};
  height: ${({ height = '16px' }) => height};
  border-radius: ${({ radius = theme.radius.sm }) => radius};
  background: linear-gradient(
    90deg,
    ${theme.colors.bgCard} 0%,
    ${theme.colors.bgElevated} 50%,
    ${theme.colors.bgCard} 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.6s ease infinite;
`;

// ─── Avatar ───────────────────────────────────────────────────────────────────
interface AvatarProps {
  size?: number;
  src?: string;
  name?: string;
}

export const AvatarWrapper = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  overflow: hidden;
  background: ${theme.colors.bgElevated};
  border: 1px solid ${theme.colors.border};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ size }) => Math.floor(size * 0.4)}px;
  font-weight: ${theme.typography.weight.semibold};
  color: ${theme.colors.primary};
  font-family: ${theme.typography.fontBody};
  user-select: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export function Avatar({ size = 36, src, name }: AvatarProps) {
  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  return (
    <AvatarWrapper size={size}>
      {src ? <img src={src} alt={name || 'avatar'} /> : initials}
    </AvatarWrapper>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
interface InputProps {
  hasError?: boolean;
}

export const Input = styled.input<InputProps>`
  width: 100%;
  background: ${theme.colors.bgElevated};
  border: 1px solid ${({ hasError }) => hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${theme.radius.md};
  padding: 10px 14px;
  font-size: ${theme.typography.size.base};
  color: ${theme.colors.textPrimary};
  font-family: ${theme.typography.fontBody};
  transition: border-color ${theme.transitions.fast}, box-shadow ${theme.transitions.fast};

  &::placeholder { color: ${theme.colors.textMuted}; }
  &:focus {
    border-color: ${({ hasError }) => hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ hasError }) => hasError ? theme.colors.error : theme.colors.primary}20;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: ${theme.typography.size.sm};
  font-weight: ${theme.typography.weight.medium};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing['2']};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['1']};
`;

export const ErrorText = styled.p`
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.error};
  margin-top: ${theme.spacing['1']};
`;

// ─── Divider ──────────────────────────────────────────────────────────────────
export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.border};
  margin: ${theme.spacing['4']} 0;
`;

// ─── Empty State ──────────────────────────────────────────────────────────────
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing['16']} ${theme.spacing['8']};
  text-align: center;
  gap: ${theme.spacing['3']};
  color: ${theme.colors.textMuted};
  font-size: ${theme.typography.size.base};
`;

// ─── Spinner ──────────────────────────────────────────────────────────────────
const spin = keyframes`to { transform: rotate(360deg); }`;

export const Spinner = styled.div<{ size?: number; color?: string }>`
  width: ${({ size = 20 }) => size}px;
  height: ${({ size = 20 }) => size}px;
  border: 2px solid ${theme.colors.border};
  border-top-color: ${({ color = theme.colors.primary }) => color};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  flex-shrink: 0;
`;

// ─── Stat Card ────────────────────────────────────────────────────────────────
interface StatTrendProps {
  positive?: boolean;
}

export const StatValue = styled.div`
  font-size: ${theme.typography.size['3xl']};
  font-weight: ${theme.typography.weight.bold};
  font-family: ${theme.typography.fontDisplay};
  color: ${theme.colors.textPrimary};
  line-height: 1;
`;

export const StatLabel = styled.div`
  font-size: ${theme.typography.size.sm};
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing['1']};
`;

export const StatTrend = styled.div<StatTrendProps>`
  font-size: ${theme.typography.size.sm};
  font-weight: ${theme.typography.weight.medium};
  color: ${({ positive }) => positive ? theme.colors.success : theme.colors.error};
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const IconBox = styled.div<{ color?: string }>`
  width: 44px;
  height: 44px;
  border-radius: ${theme.radius.md};
  background: ${({ color = theme.colors.primaryMuted }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
`;
