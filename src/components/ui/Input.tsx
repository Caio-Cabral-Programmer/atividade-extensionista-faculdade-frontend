import { forwardRef, useState } from "react";
import styled from "styled-components";
import { Eye, EyeOff } from "lucide-react";

const InputWrapper = styled.div`
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

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
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

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.danger : theme.colors.secondary};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) =>
        $hasError ? "rgba(239,68,68,0.1)" : "rgba(46,94,168,0.1)"};
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 4px;
  display: flex;
  align-items: center;
  min-height: 44px;
  min-width: 44px;
  justify-content: center;
`;

const ErrorMessage = styled.span`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.danger};
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type = "text", id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputId = id || props.name;

    return (
      <InputWrapper>
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <InputContainer>
          <StyledInput
            ref={ref}
            id={inputId}
            type={isPassword && showPassword ? "text" : type}
            $hasError={!!error}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          {isPassword && (
            <ToggleButton
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </ToggleButton>
          )}
        </InputContainer>
        {error && (
          <ErrorMessage id={`${inputId}-error`} role="alert">
            {error}
          </ErrorMessage>
        )}
      </InputWrapper>
    );
  },
);

Input.displayName = "Input";
