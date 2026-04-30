import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { authService } from "../../services/authService";
import { getApiErrorMessage } from "../../utils/errorHandler";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
`;

const FormCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 40px 32px;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 24px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const resetSchema = z
  .object({
    newPassword: z.string().min(8, "A senha deve ter ao menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type ResetFormData = z.infer<typeof resetSchema>;

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  });

  const mutation = useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      toast.success("Senha redefinida com sucesso!");
      navigate("/");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Link inválido ou expirado."));
    },
  });

  const onSubmit = (data: ResetFormData) => {
    mutation.mutate({ token, newPassword: data.newPassword });
  };

  return (
    <Container>
      <FormCard>
        <Title>Redefinir senha</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nova senha"
            type="password"
            placeholder="Mínimo 8 caracteres"
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />
          <Input
            label="Confirmar nova senha"
            type="password"
            placeholder="Repita a senha"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <Button type="submit" fullWidth isLoading={mutation.isPending}>
            Redefinir senha
          </Button>
        </Form>
      </FormCard>
    </Container>
  );
}
