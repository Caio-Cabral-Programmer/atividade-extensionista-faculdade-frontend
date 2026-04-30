import styled from "styled-components";

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 24px;
  transition: ${({ theme }) => theme.transitions.default};
`;

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return <StyledCard className={className}>{children}</StyledCard>;
}
