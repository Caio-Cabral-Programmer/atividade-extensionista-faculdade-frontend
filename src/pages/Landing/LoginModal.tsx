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
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 16px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
  onForgotPassword: () => void;
  onRegister: () => void;
}

export function LoginModal({
  isOpen,
  onClose,
  onSuccess,
  onForgotPassword,
  onRegister,
}: LoginModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (_data, variables) => {
      toast.info("Código de verificação enviado para o seu e-mail.");
      reset();
      onSuccess(variables.email);
    },
    onError: (error) => {
      toast.error(
        getApiErrorMessage(
          error,
          "Credenciais inválidas. Verifique seus dados.",
        ),
      );
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Entrar">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Senha"
          type="password"
          placeholder="Sua senha"
          error={errors.password?.message}
          {...register("password")}
        />
        <LinkButton type="button" onClick={onForgotPassword}>
          Esqueci minha senha
        </LinkButton>
        <Button type="submit" fullWidth isLoading={mutation.isPending}>
          Entrar
        </Button>
      </Form>
      <Footer>
        Não tem conta?{" "}
        <LinkButton type="button" onClick={onRegister}>
          Cadastre-se
        </LinkButton>
      </Footer>
    </Modal>
  );
}
