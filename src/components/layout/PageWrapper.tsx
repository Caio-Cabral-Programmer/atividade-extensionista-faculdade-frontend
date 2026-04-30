import styled from "styled-components";
import { Sidebar } from "./Sidebar";

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 0;
  background: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  padding: 8px 16px;
  z-index: 1000;
  border-radius: ${({ theme }) => theme.radii.md};

  &:focus {
    top: 8px;
    left: 8px;
  }
`;

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 24px;
  min-width: 0;

  @media (min-width: 1024px) {
    padding: 32px 40px;
  }
`;

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <LayoutContainer>
      <SkipLink href="#main-content">Pular para o conteúdo principal</SkipLink>
      <Sidebar />
      <MainContent id="main-content">{children}</MainContent>
    </LayoutContainer>
  );
}
