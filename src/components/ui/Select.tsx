import { forwardRef } from "react";
import styled from "styled-components";

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const StyledSelect = styled.select<{ $hasError?: boolean }>`
  width: 100%;
  padding: 10px 14px;
  font-size: 0.9rem;
  border: 1.5px solid
    ${({ $hasError, theme }) => ($hasError ? theme.colors.danger : "#D1D5DB")};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.default};
  min-height: 44px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;

  &:focus {
    outline: none;
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.danger : theme.colors.secondary};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) =>
        $hasError ? "rgba(239,68,68,0.1)" : "rgba(46,94,168,0.1)"};
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.danger};
`;

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id || props.name;

    return (
      <SelectWrapper>
        {label && <Label htmlFor={selectId}>{label}</Label>}
        <StyledSelect
          ref={ref}
          id={selectId}
          $hasError={!!error}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </StyledSelect>
        {error && (
          <ErrorMessage id={`${selectId}-error`} role="alert">
            {error}
          </ErrorMessage>
        )}
      </SelectWrapper>
    );
  },
);

Select.displayName = "Select";
