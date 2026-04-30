import ReactModal from "react-modal";
import styled from "styled-components";
import { X } from "lucide-react";

ReactModal.setAppElement("#root");

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.sm};
  min-height: 44px;
  min-width: 44px;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const modalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "16px",
  },
  content: {
    position: "relative",
    inset: "auto",
    maxWidth: "480px",
    width: "100%",
    maxHeight: "90vh",
    overflow: "auto",
    borderRadius: "12px",
    border: "none",
    padding: "32px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
  },
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      contentLabel={title}
    >
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
        <CloseButton onClick={onClose} aria-label="Fechar">
          <X size={20} />
        </CloseButton>
      </ModalHeader>
      {children}
    </ReactModal>
  );
}
