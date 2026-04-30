import { useState } from "react";
import styled from "styled-components";
import { Plus, Trash2, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import {
  useGoals,
  useCreateGoal,
  useDeleteGoal,
  useDepositGoal,
  useWithdrawGoal,
} from "../../hooks/useGoals";
import { IFinancialGoal } from "../../types";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const PageTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 24px;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`;

const GoalsGrid = styled.div`
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

const GoalCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const GoalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GoalName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
`;

const GoalValues = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const GoalDeadline = styled.span`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const GoalActions = styled.div`
  display: flex;
  gap: 8px;
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

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AmountModalDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const goalSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  targetAmount: z.coerce.number().positive("Valor deve ser maior que zero"),
  deadline: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
});

const amountSchema = z.object({
  amount: z.coerce.number().positive("Valor deve ser maior que zero"),
});

export default function Goals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amountModal, setAmountModal] = useState<{
    goal: IFinancialGoal;
    type: "deposit" | "withdraw";
  } | null>(null);

  const { data: goals, isLoading } = useGoals();
  const createGoal = useCreateGoal();
  const deleteGoal = useDeleteGoal();
  const depositGoal = useDepositGoal();
  const withdrawGoal = useWithdrawGoal();

  const form = useForm({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      name: "",
      targetAmount: 0,
      deadline: "",
      description: "",
      icon: "",
    },
  });

  const amountForm = useForm({
    resolver: zodResolver(amountSchema),
    defaultValues: { amount: 0 },
  });

  const handleCreate = form.handleSubmit((data) => {
    createGoal.mutate(
      {
        ...data,
        deadline: data.deadline || null,
        description: data.description || null,
        icon: data.icon || null,
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          form.reset();
        },
      },
    );
  });

  const handleAmount = amountForm.handleSubmit((data) => {
    if (!amountModal) return;
    const mutation =
      amountModal.type === "deposit" ? depositGoal : withdrawGoal;
    mutation.mutate(
      { id: amountModal.goal.financialGoalId, amount: data.amount },
      {
        onSuccess: () => {
          setAmountModal(null);
          amountForm.reset();
        },
      },
    );
  });

  return (
    <div>
      <PageHeader>
        <PageTitle>Metas Financeiras</PageTitle>
        <Button size="sm" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> Nova Meta
        </Button>
      </PageHeader>

      {isLoading ? (
        <Spinner size="lg" />
      ) : goals && goals.length > 0 ? (
        <GoalsGrid>
          {goals.map((goal) => (
            <GoalCard key={goal.financialGoalId}>
              <GoalHeader>
                <GoalName>{goal.name}</GoalName>
                {goal.isCompleted && <Badge variant="success">Concluída</Badge>}
              </GoalHeader>
              <ProgressBar percent={goal.progressPercent} showLabel />
              <GoalValues>
                <span>{formatCurrency(goal.currentAmount)}</span>
                <span>{formatCurrency(goal.targetAmount)}</span>
              </GoalValues>
              {goal.deadline && (
                <GoalDeadline>Prazo: {formatDate(goal.deadline)}</GoalDeadline>
              )}
              <GoalActions>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setAmountModal({ goal, type: "deposit" })}
                >
                  <ArrowUpCircle size={14} /> Depositar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setAmountModal({ goal, type: "withdraw" })}
                >
                  <ArrowDownCircle size={14} /> Retirar
                </Button>
                <IconButton
                  onClick={() => {
                    if (window.confirm("Excluir meta?"))
                      deleteGoal.mutate(goal.financialGoalId);
                  }}
                  aria-label="Excluir"
                >
                  <Trash2 size={16} />
                </IconButton>
              </GoalActions>
            </GoalCard>
          ))}
        </GoalsGrid>
      ) : (
        <Card>
          <EmptyState
            title="Nenhuma meta definida"
            subtitle="Defina metas financeiras e acompanhe seu progresso."
            actionLabel="Nova Meta"
            onAction={() => setIsModalOpen(true)}
          />
        </Card>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nova Meta"
      >
        <Form onSubmit={handleCreate}>
          <Input
            label="Nome"
            placeholder="Ex: Viagem de férias"
            error={form.formState.errors.name?.message}
            {...form.register("name")}
          />
          <Input
            label="Valor alvo"
            type="number"
            step="0.01"
            placeholder="0,00"
            error={form.formState.errors.targetAmount?.message}
            {...form.register("targetAmount")}
          />
          <Input
            label="Prazo (opcional)"
            type="date"
            {...form.register("deadline")}
          />
          <Input
            label="Descrição (opcional)"
            placeholder="Detalhes sobre a meta"
            {...form.register("description")}
          />
          <Button type="submit" fullWidth isLoading={createGoal.isPending}>
            Criar Meta
          </Button>
        </Form>
      </Modal>

      <Modal
        isOpen={!!amountModal}
        onClose={() => setAmountModal(null)}
        title={
          amountModal?.type === "deposit"
            ? "Depositar na Meta"
            : "Retirar da Meta"
        }
      >
        <Form onSubmit={handleAmount}>
          <AmountModalDescription>
            {amountModal?.goal.name} — Saldo atual:{" "}
            {amountModal ? formatCurrency(amountModal.goal.currentAmount) : ""}
          </AmountModalDescription>
          <Input
            label="Valor"
            type="number"
            step="0.01"
            placeholder="0,00"
            error={amountForm.formState.errors.amount?.message}
            {...amountForm.register("amount")}
          />
          <Button
            type="submit"
            fullWidth
            isLoading={depositGoal.isPending || withdrawGoal.isPending}
          >
            {amountModal?.type === "deposit" ? "Depositar" : "Retirar"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
