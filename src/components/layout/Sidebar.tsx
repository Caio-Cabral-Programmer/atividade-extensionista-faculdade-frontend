import { useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Building2,
  Tags,
  PiggyBank,
  Target,
  LogOut,
  Menu,
  X,
  Wallet,
} from "lucide-react";
import { useAuth } from "../../store/AuthContext";

const SidebarOverlay = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 199;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 260px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  display: flex;
  flex-direction: column;
  z-index: 200;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease;

  @media (min-width: 1024px) {
    transform: translateX(0);
    position: sticky;
    top: 0;
    height: 100vh;
  }
`;

const MobileToggle = styled.button`
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 201;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  min-width: 44px;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const SidebarLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 24px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const LogoIcon = styled.div`
  color: ${({ theme }) => theme.colors.accent};
`;

const LogoText = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
`;

const Nav = styled.nav`
  flex: 1;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 500;
  transition: ${({ theme }) => theme.transitions.default};
  min-height: 44px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
    color: #fff;
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.12);
    color: #fff;
  }
`;

const UserSection = styled.div`
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserName = styled.span`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  padding: 8px;
  border-radius: ${({ theme }) => theme.radii.sm};
  display: flex;
  align-items: center;
  min-height: 44px;
  min-width: 44px;
  justify-content: center;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/transactions", icon: ArrowLeftRight, label: "Transações" },
  { to: "/accounts", icon: Building2, label: "Contas" },
  { to: "/categories", icon: Tags, label: "Categorias" },
  { to: "/budgets", icon: PiggyBank, label: "Orçamentos" },
  { to: "/goals", icon: Target, label: "Metas" },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { state, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <MobileToggle onClick={() => setIsOpen(!isOpen)} aria-label="Abrir menu">
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </MobileToggle>
      <SidebarOverlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <SidebarContainer $isOpen={isOpen}>
        <SidebarLogo>
          <LogoIcon>
            <Wallet size={24} />
          </LogoIcon>
          <LogoText>My Smart Money</LogoText>
        </SidebarLogo>
        <Nav aria-label="Navegação principal">
          {navItems.map(({ to, icon: Icon, label }) => (
            <StyledNavLink key={to} to={to} onClick={() => setIsOpen(false)}>
              <Icon size={20} />
              {label}
            </StyledNavLink>
          ))}
        </Nav>
        <UserSection>
          <UserName>{state.user?.name || "Usuário"}</UserName>
          <LogoutButton onClick={handleLogout} aria-label="Sair">
            <LogOut size={18} />
          </LogoutButton>
        </UserSection>
      </SidebarContainer>
    </>
  );
}
