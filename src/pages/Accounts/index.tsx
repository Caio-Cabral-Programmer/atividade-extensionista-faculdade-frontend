import { useState } from "react";
import styled from "styled-components";
import { Plus, Trash2, CreditCard } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import {
  useAccounts,
  useCreateAccount,
  useDeleteAccount,
} from "../../hooks/useAccounts";
import {
  useCreditCards,
  useCreateCreditCard,
  useDeleteCreditCard,
} from "../../hooks/useCreditCards";
import { formatCurrency } from "../../utils/formatters";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const PageTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 24px;
`;

const Section = styled.section`
  margin-bottom: 32px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 1.15rem;
`;

const AccountGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const AccountItem = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AccountInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AccountDot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`;

const AccountName = styled.span`
  font-weight: 500;
  font-size: 0.9rem;
`;

const AccountBalance = styled.span`
  font-weight: 600;
  font-size: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 6px;
  color: ${({ theme }) => theme.colors.textMuted};
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.danger};
  }
`;

const AccountActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CardMeta = styled.span`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const CardLimitInfo = styled.div`
  text-align: right;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const accountSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  type: z.enum(["CheckingAccount", "Savings", "Cash", "Investment"]),
  initialBalance: z.coerce.number(),
  color: z.string().min(1, "Cor é obrigatória"),
  icon: z.string().min(1, "Ícone é obrigatório"),
});

const creditCardSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  creditLimit: z.coerce.number().positive("Limite deve ser maior que zero"),
  closingDay: z.coerce.number().min(1).max(31),
  dueDay: z.coerce.number().min(1).max(31),
  color: z.string().min(1, "Cor é obrigatória"),
});

export default function Accounts() {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isCreditCardModalOpen, setIsCreditCardModalOpen] = useState(false);

  const { data: accounts, isLoading: accountsLoading } = useAccounts();
  const { data: creditCards, isLoading: cardsLoading } = useCreditCards();
  const createAccount = useCreateAccount();
  const deleteAccount = useDeleteAccount();
  const createCreditCard = useCreateCreditCard();
  const deleteCreditCard = useDeleteCreditCard();

  const accountForm = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CheckingAccount" as const,
      initialBalance: 0,
      color: "#2E5EA8",
      icon: "building-2",
    },
  });

  const creditCardForm = useForm({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      name: "",
      creditLimit: 0,
      closingDay: 1,
      dueDay: 10,
      color: "#1B2A4A",
    },
  });

  const handleCreateAccount = accountForm.handleSubmit((data) => {
    createAccount.mutate(data, {
      onSuccess: () => {
        setIsAccountModalOpen(false);
        accountForm.reset();
      },
    });
  });

  const handleCreateCreditCard = creditCardForm.handleSubmit((data) => {
    createCreditCard.mutate(data, {
      onSuccess: () => {
        setIsCreditCardModalOpen(false);
        creditCardForm.reset();
      },
    });
  });

  return (
    <div>
      <PageTitle>Contas e Cartões</PageTitle>

      <Section>
        <SectionHeader>
          <SectionTitle>Contas Bancárias</SectionTitle>
          <Button size="sm" onClick={() => setIsAccountModalOpen(true)}>
            <Plus size={16} /> Nova Conta
          </Button>
        </SectionHeader>
        {accountsLoading ? (
          <Spinner />
        ) : accounts && accounts.length > 0 ? (
          <AccountGrid>
            {accounts.map((account) => (
              <AccountItem key={account.accountId}>
                <AccountInfo>
                  <AccountDot $color={account.color} />
                  <div>
                    <AccountName>{account.name}</AccountName>
                    <Badge variant={account.isActive ? "success" : "default"}>
                      {account.isActive ? "Ativa" : "Inativa"}
                    </Badge>
                  </div>
                </AccountInfo>
                <AccountActions>
                  <AccountBalance>
                    {formatCurrency(account.currentBalance)}
                  </AccountBalance>
                  <IconButton
                    onClick={() => {
                      if (window.confirm("Excluir conta?"))
                        deleteAccount.mutate(account.accountId);
                    }}
                    aria-label="Excluir conta"
                  >
                    <Trash2 size={16} />
                  </IconButton>
                </AccountActions>
              </AccountItem>
            ))}
          </AccountGrid>
        ) : (
          <Card>
            <EmptyState
              title="Nenhuma conta cadastrada"
              actionLabel="Nova Conta"
              onAction={() => setIsAccountModalOpen(true)}
            />
          </Card>
        )}
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Cartões de Crédito</SectionTitle>
          <Button size="sm" onClick={() => setIsCreditCardModalOpen(true)}>
            <Plus size={16} /> Novo Cartão
          </Button>
        </SectionHeader>
        {cardsLoading ? (
          <Spinner />
        ) : creditCards && creditCards.length > 0 ? (
          <AccountGrid>
            {creditCards.map((card) => (
              <AccountItem key={card.creditCardId}>
                <AccountInfo>
                  <CreditCard size={20} color={card.color} />
                  <div>
                    <AccountName>{card.name}</AccountName>
                    <CardMeta>
                      Fecha dia {card.closingDay} • Vence dia {card.dueDay}
                    </CardMeta>
                  </div>
                </AccountInfo>
                <AccountActions>
                  <CardLimitInfo>
                    <CardMeta>Disponível</CardMeta>
                    <AccountBalance>
                      {formatCurrency(card.availableLimit)}
                    </AccountBalance>
                  </CardLimitInfo>
                  <IconButton
                    onClick={() => {
                      if (window.confirm("Excluir cartão?"))
                        deleteCreditCard.mutate(card.creditCardId);
                    }}
                    aria-label="Excluir cartão"
                  >
                    <Trash2 size={16} />
                  </IconButton>
                </AccountActions>
              </AccountItem>
            ))}
          </AccountGrid>
        ) : (
          <Card>
            <EmptyState
              title="Nenhum cartão cadastrado"
              actionLabel="Novo Cartão"
              onAction={() => setIsCreditCardModalOpen(true)}
            />
          </Card>
        )}
      </Section>

      <Modal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        title="Nova Conta"
      >
        <Form onSubmit={handleCreateAccount}>
          <Input
            label="Nome"
            placeholder="Ex: Nubank"
            error={accountForm.formState.errors.name?.message}
            {...accountForm.register("name")}
          />
          <Select
            label="Tipo"
            options={[
              { value: "CheckingAccount", label: "Conta Corrente" },
              { value: "Savings", label: "Poupança" },
              { value: "Cash", label: "Dinheiro" },
              { value: "Investment", label: "Investimento" },
            ]}
            error={accountForm.formState.errors.type?.message}
            {...accountForm.register("type")}
          />
          <Input
            label="Saldo inicial"
            type="number"
            step="0.01"
            error={accountForm.formState.errors.initialBalance?.message}
            {...accountForm.register("initialBalance")}
          />
          <Input
            label="Cor (hex)"
            placeholder="#2E5EA8"
            error={accountForm.formState.errors.color?.message}
            {...accountForm.register("color")}
          />
          <Button type="submit" fullWidth isLoading={createAccount.isPending}>
            Criar Conta
          </Button>
        </Form>
      </Modal>

      <Modal
        isOpen={isCreditCardModalOpen}
        onClose={() => setIsCreditCardModalOpen(false)}
        title="Novo Cartão"
      >
        <Form onSubmit={handleCreateCreditCard}>
          <Input
            label="Nome"
            placeholder="Ex: Visa Gold"
            error={creditCardForm.formState.errors.name?.message}
            {...creditCardForm.register("name")}
          />
          <Input
            label="Limite"
            type="number"
            step="0.01"
            error={creditCardForm.formState.errors.creditLimit?.message}
            {...creditCardForm.register("creditLimit")}
          />
          <Input
            label="Dia de fechamento"
            type="number"
            min={1}
            max={31}
            error={creditCardForm.formState.errors.closingDay?.message}
            {...creditCardForm.register("closingDay")}
          />
          <Input
            label="Dia de vencimento"
            type="number"
            min={1}
            max={31}
            error={creditCardForm.formState.errors.dueDay?.message}
            {...creditCardForm.register("dueDay")}
          />
          <Input
            label="Cor (hex)"
            placeholder="#1B2A4A"
            error={creditCardForm.formState.errors.color?.message}
            {...creditCardForm.register("color")}
          />
          <Button
            type="submit"
            fullWidth
            isLoading={createCreditCard.isPending}
          >
            Criar Cartão
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
