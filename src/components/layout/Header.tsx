import styled from "styled-components";
import { Wallet, LogOut } from "lucide-react";
import { useAuth } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 100;

  @media (min-width: 768px) {
    padding: 16px 48px;
  }
`;

const Logo = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
`;

const LogoIcon = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 8px;
  display: flex;
  align-items: center;
`;

const LogoText = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};

  @media (max-width: 480px) {
    display: none;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

interface HeaderProps {
  onLoginClick?: () => void;
}

export function Header({ onLoginClick }: HeaderProps) {
  const { state, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(state.isAuthenticated ? "/dashboard" : "/");
  };

  return (
    <HeaderContainer>
      <Logo onClick={handleLogoClick} aria-label="Ir para a página inicial">
        <LogoIcon>
          <Wallet size={22} />
        </LogoIcon>
        <LogoText>My Smart Money</LogoText>
      </Logo>
      <Actions>
        {state.isAuthenticated ? (
          <>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut size={16} />
              Sair
            </Button>
          </>
        ) : (
          <Button variant="primary" size="sm" onClick={onLoginClick}>
            Entrar
          </Button>
        )}
      </Actions>
    </HeaderContainer>
  );
}
