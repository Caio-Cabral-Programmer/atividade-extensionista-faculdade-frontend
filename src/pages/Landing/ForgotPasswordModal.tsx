import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { authService } from "../../services/authService";
import { getApiErrorMessage } from "../../utils/errorHandler";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const SuccessMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.success};
  font-size: 0.9rem;
`;

const forgotSchema = z.object({
  email: z.string().email("E-mail inválido"),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

export function ForgotPasswordModal({
  isOpen,
  onClose,
  onBackToLogin,
}: ForgotPasswordModalProps) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  const mutation = useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: () => {
      setSent(true);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });

  const onSubmit = (data: ForgotFormData) => {
    mutation.mutate(data);
  };

  const handleClose = () => {
    setSent(false);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Recuperar senha">
      {sent ? (
        <div>
          <SuccessMessage>
            Se esse e-mail estiver cadastrado, você receberá um link para
            redefinir sua senha.
          </SuccessMessage>
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <LinkButton type="button" onClick={onBackToLogin}>
              Voltar para o login
            </LinkButton>
          </div>
        </div>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <Button type="submit" fullWidth isLoading={mutation.isPending}>
            Enviar link de recuperação
          </Button>
          <div style={{ textAlign: "center" }}>
            <LinkButton type="button" onClick={onBackToLogin}>
              Voltar para o login
            </LinkButton>
          </div>
        </Form>
      )}
    </Modal>
  );
}
