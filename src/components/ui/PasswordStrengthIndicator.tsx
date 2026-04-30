import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const BarContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const Bar = styled.div<{ $active: boolean; $color: string }>`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background-color: ${({ $active, $color }) => ($active ? $color : "#E5E7EB")};
  transition: background-color 0.3s ease;
`;

const Label = styled.span<{ $color: string }>`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ $color }) => $color};
`;

function getStrength(password: string): {
  level: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 1, label: "Fraca", color: "#EF4444" };
  if (score <= 2) return { level: 2, label: "Média", color: "#F59E0B" };
  return { level: 3, label: "Forte", color: "#10B981" };
}

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const { level, label, color } = getStrength(password);

  if (!password) return null;

  return (
    <Wrapper>
      <BarContainer>
        <Bar $active={level >= 1} $color={color} />
        <Bar $active={level >= 2} $color={color} />
        <Bar $active={level >= 3} $color={color} />
      </BarContainer>
      <Label $color={color}>{label}</Label>
    </Wrapper>
  );
}
