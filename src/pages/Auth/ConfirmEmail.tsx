import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CheckCircle, XCircle } from "lucide-react";
import { authService } from "../../services/authService";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  text-align: center;
  gap: 20px;
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  max-width: 400px;
`;

export default function ConfirmEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      return;
    }
    authService
      .confirmEmail(token)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [searchParams]);

  if (status === "loading") return <Spinner size="lg" />;

  return (
    <Container>
      {status === "success" ? (
        <>
          <CheckCircle size={64} color="#10B981" />
          <Message>
            Sua conta foi confirmada com sucesso! Já pode fazer o login.
          </Message>
        </>
      ) : (
        <>
          <XCircle size={64} color="#EF4444" />
          <Message>
            Link inválido ou expirado. Solicite um novo e-mail de confirmação.
          </Message>
        </>
      )}
      <Button onClick={() => navigate("/")}>Ir para a página inicial</Button>
    </Container>
  );
}
