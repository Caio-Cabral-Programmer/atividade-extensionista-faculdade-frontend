import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div<{ $size: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $size }) => ($size === "lg" ? "80px" : "20px")} 0;
`;

const SpinnerCircle = styled.div<{ $size: string }>`
  width: ${({ $size }) =>
    $size === "sm" ? "16px" : $size === "md" ? "28px" : "44px"};
  height: ${({ $size }) =>
    $size === "sm" ? "16px" : $size === "md" ? "28px" : "44px"};
  border: 3px solid ${({ theme }) => theme.colors.background};
  border-top-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
}

export function Spinner({ size = "md" }: SpinnerProps) {
  return (
    <SpinnerWrapper $size={size} role="status" aria-label="Carregando">
      <SpinnerCircle $size={size} />
    </SpinnerWrapper>
  );
}
