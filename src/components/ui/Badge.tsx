import styled from "styled-components";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "default";

const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
  success: { bg: "rgba(16,185,129,0.1)", text: "#10B981" },
  warning: { bg: "rgba(245,158,11,0.1)", text: "#F59E0B" },
  danger: { bg: "rgba(239,68,68,0.1)", text: "#EF4444" },
  info: { bg: "rgba(46,94,168,0.1)", text: "#2E5EA8" },
  default: { bg: "rgba(107,114,128,0.1)", text: "#6B7280" },
};

const StyledBadge = styled.span<{ $variant: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ $variant }) => variantColors[$variant].bg};
  color: ${({ $variant }) => variantColors[$variant].text};
`;

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

export function Badge({ variant = "default", children }: BadgeProps) {
  return <StyledBadge $variant={variant}>{children}</StyledBadge>;
}
