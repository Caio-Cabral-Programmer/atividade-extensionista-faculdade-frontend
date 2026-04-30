import styled, { css } from "styled-components";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $isLoading?: boolean;
  $fullWidth?: boolean;
}

const sizeStyles = {
  sm: css`
    padding: 6px 14px;
    font-size: 0.8rem;
  `,
  md: css`
    padding: 10px 20px;
    font-size: 0.9rem;
  `,
  lg: css`
    padding: 14px 28px;
    font-size: 1rem;
  `,
};

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: #fff;
    border: none;
    &:hover:not(:disabled) {
      opacity: 0.88;
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
    border: none;
    &:hover:not(:disabled) {
      opacity: 0.88;
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.danger};
    color: #fff;
    border: none;
    &:hover:not(:disabled) {
      opacity: 0.88;
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.secondary};
    border: 1.5px solid ${({ theme }) => theme.colors.secondary};
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.secondary};
      color: #fff;
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.secondary};
    border: none;
    &:hover:not(:disabled) {
      background-color: rgba(46, 94, 168, 0.08);
    }
  `,
};

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  border-radius: ${({ theme }) => theme.radii.md};
  transition: ${({ theme }) => theme.transitions.default};
  cursor: pointer;
  min-height: 44px;
  ${({ $size = "md" }) => sizeStyles[$size]}
  ${({ $variant = "primary" }) => variantStyles[$variant]}
  ${({ $fullWidth }) => $fullWidth && "width: 100%;"}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SpinIcon = styled(Loader2)`
  animation: spin 0.7s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

interface ButtonComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  children,
  disabled,
  ...props
}: ButtonComponentProps) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $isLoading={isLoading}
      $fullWidth={fullWidth}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <SpinIcon size={16} />}
      {children}
    </StyledButton>
  );
}
