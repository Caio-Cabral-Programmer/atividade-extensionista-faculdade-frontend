import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { PasswordStrengthIndicator } from "../../components/ui/PasswordStrengthIndicator";
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

const Footer = styled.div`
  text-align: center;
  margin-top: 16px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const registerSchema = z
  .object({
    name: z.string().min(3, "Nome deve ter ao menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(8, "A senha deve ter ao menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export function RegisterModal({
  isOpen,
  onClose,
  onLogin,
}: RegisterModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password", "");

  const mutation = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success("Conta criada! Verifique seu e-mail para confirmar.");
      reset();
      onClose();
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Criar conta">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nome completo"
          placeholder="Seu nome"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <div>
          <Input
            label="Senha"
            type="password"
            placeholder="Mínimo 8 caracteres"
            error={errors.password?.message}
            {...register("password")}
          />
          <PasswordStrengthIndicator password={password} />
        </div>
        <Input
          label="Confirmar senha"
          type="password"
          placeholder="Repita a senha"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Button type="submit" fullWidth isLoading={mutation.isPending}>
          Criar conta
        </Button>
      </Form>
      <Footer>
        Já tem conta?{" "}
        <LinkButton type="button" onClick={onLogin}>
          Entrar
        </LinkButton>
      </Footer>
    </Modal>
  );
}
