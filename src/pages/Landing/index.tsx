import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Shield, PieChart } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../store/AuthContext";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";
import { TwoFactorModal } from "./TwoFactorModal";
import { ForgotPasswordModal } from "./ForgotPasswordModal";

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 24px;
  min-height: calc(100vh - 70px);

  @media (min-width: 768px) {
    padding: 120px 48px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  max-width: 700px;
  margin-bottom: 20px;
  line-height: 1.3;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 550px;
  margin-bottom: 36px;
  line-height: 1.7;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  max-width: 900px;
  width: 100%;
  margin-top: 60px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 28px 24px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
`;

const FeatureIcon = styled.div`
  color: ${({ theme }) => theme.colors.accent};
`;

const FeatureTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const FeatureText = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
`;

export default function Landing() {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<
    "login" | "register" | "2fa" | "forgot" | null
  >(null);
  const [loginEmail, setLoginEmail] = useState("");

  const handleCTA = () => {
    if (state.isAuthenticated) {
      navigate("/dashboard");
    } else {
      setActiveModal("register");
    }
  };

  const handleLoginSuccess = (email: string) => {
    setLoginEmail(email);
    setActiveModal("2fa");
  };

  return (
    <PageContainer>
      <Header onLoginClick={() => setActiveModal("login")} />
      <HeroSection>
        <HeroTitle>
          Cuidando do meu dinheiro hoje... vivendo feliz... construindo meu
          futuro amanhã.
        </HeroTitle>
        <HeroSubtitle>
          Organize suas finanças de forma simples e visual. Acompanhe seus
          gastos, receitas e metas para conquistar a tranquilidade financeira
          que você merece.
        </HeroSubtitle>
        <Button size="lg" onClick={handleCTA}>
          Começar agora
        </Button>

        <Features>
          <FeatureCard>
            <FeatureIcon>
              <TrendingUp size={32} />
            </FeatureIcon>
            <FeatureTitle>Controle Total</FeatureTitle>
            <FeatureText>
              Veja para onde seu dinheiro está indo com gráficos simples e
              claros.
            </FeatureText>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>
              <Shield size={32} />
            </FeatureIcon>
            <FeatureTitle>Seguro</FeatureTitle>
            <FeatureText>
              Seus dados protegidos com autenticação em duas etapas.
            </FeatureText>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>
              <PieChart size={32} />
            </FeatureIcon>
            <FeatureTitle>Metas</FeatureTitle>
            <FeatureText>
              Defina objetivos financeiros e acompanhe seu progresso
              diariamente.
            </FeatureText>
          </FeatureCard>
        </Features>
      </HeroSection>

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={() => setActiveModal(null)}
        onSuccess={handleLoginSuccess}
        onForgotPassword={() => setActiveModal("forgot")}
        onRegister={() => setActiveModal("register")}
      />
      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={() => setActiveModal(null)}
        onLogin={() => setActiveModal("login")}
      />
      <TwoFactorModal
        isOpen={activeModal === "2fa"}
        onClose={() => setActiveModal(null)}
        email={loginEmail}
      />
      <ForgotPasswordModal
        isOpen={activeModal === "forgot"}
        onClose={() => setActiveModal(null)}
        onBackToLogin={() => setActiveModal("login")}
      />
    </PageContainer>
  );
}
