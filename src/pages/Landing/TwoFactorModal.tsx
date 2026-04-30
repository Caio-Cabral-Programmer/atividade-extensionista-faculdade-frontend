import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { authService } from "../../services/authService";
import { useAuth } from "../../store/AuthContext";
import { getApiErrorMessage } from "../../utils/errorHandler";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Timer = styled.p<{ $expired: boolean }>`
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ $expired, theme }) =>
    $expired ? theme.colors.danger : theme.colors.textMuted};
`;

const ResendButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

const twoFASchema = z.object({
  code: z
    .string()
    .length(6, "O código deve ter 6 dígitos")
    .regex(/^\d+$/, "Apenas números"),
});

type TwoFAFormData = z.infer<typeof twoFASchema>;

interface TwoFactorModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export function TwoFactorModal({
  isOpen,
  onClose,
  email,
}: TwoFactorModalProps) {
  const [secondsLeft, setSecondsLeft] = useState(600);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TwoFAFormData>({
    resolver: zodResolver(twoFASchema),
  });

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(600);
      reset();
      return;
    }
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, reset]);

  const mutation = useMutation({
    mutationFn: authService.verify2FA,
    onSuccess: (data) => {
      login({ email, name: email.split("@")[0] }, data.accessToken);
      toast.success("Login realizado com sucesso!");
      onClose();
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Código inválido ou expirado."));
    },
  });

  const resendMutation = useMutation({
    mutationFn: () => authService.login({ email, password: "" }),
    onSuccess: () => {
      setSecondsLeft(600);
      toast.info("Novo código enviado.");
    },
  });

  const onSubmit = (data: TwoFAFormData) => {
    mutation.mutate({ email, code: data.code });
  };

  const handleResend = useCallback(() => {
    resendMutation.mutate();
  }, [resendMutation]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isExpired = secondsLeft === 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Verificação em duas etapas">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <p
          style={{ fontSize: "0.9rem", color: "#6B7280", textAlign: "center" }}
        >
          Digite o código de 6 dígitos enviado para {email}
        </p>
        <Input
          label="Código"
          placeholder="000000"
          maxLength={6}
          error={errors.code?.message}
          autoComplete="one-time-code"
          {...register("code")}
        />
        <Timer $expired={isExpired}>
          {isExpired
            ? "Código expirado."
            : `Código expira em ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
        </Timer>
        {isExpired && (
          <ResendButton type="button" onClick={handleResend}>
            Solicitar novo código
          </ResendButton>
        )}
        <Button
          type="submit"
          fullWidth
          isLoading={mutation.isPending}
          disabled={isExpired}
        >
          Verificar
        </Button>
      </Form>
    </Modal>
  );
}
