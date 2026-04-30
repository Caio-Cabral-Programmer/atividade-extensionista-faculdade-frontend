import styled from "styled-components";

const BarBackground = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
`;

const BarFill = styled.div<{ $percent: number; $color: string }>`
  height: 100%;
  width: ${({ $percent }) => Math.min($percent, 100)}%;
  background-color: ${({ $color }) => $color};
  border-radius: 4px;
  transition: width 0.3s ease;
`;

function getProgressColor(percent: number): string {
  if (percent >= 90) return "#EF4444";
  if (percent >= 70) return "#F59E0B";
  return "#10B981";
}

const BarLabel = styled.span<{ $color: string }>`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ $color }) => $color};
`;

interface ProgressBarProps {
  percent: number;
  showLabel?: boolean;
}

export function ProgressBar({ percent, showLabel = false }: ProgressBarProps) {
  const color = getProgressColor(percent);

  return (
    <div>
      <BarBackground>
        <BarFill
          $percent={percent}
          $color={color}
          role="progressbar"
          aria-valuenow={Math.round(percent)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </BarBackground>
      {showLabel && <BarLabel $color={color}>{Math.round(percent)}%</BarLabel>}
    </div>
  );
}
