import { useState } from "react";
import styled from "styled-components";
import { Plus, Trash2 } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import {
  useBudgets,
  useCreateBudget,
  useDeleteBudget,
} from "../../hooks/useBudgets";
import { useCategories } from "../../hooks/useCategories";
import { formatCurrency } from "../../utils/formatters";
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

const BudgetName = styled.span`
  font-weight: 500;
  font-size: 0.95rem;
`;

const BudgetGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BudgetItem = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BudgetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BudgetInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CategoryDot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`;

const BudgetValues = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
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

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const budgetSchema = z.object({
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  year: z.coerce.number().min(2020),
  month: z.coerce.number().min(1).max(12),
  limitAmount: z.coerce.number().positive("Limite deve ser maior que zero"),
});

export default function Budgets() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentDate = new Date();

  const { data: budgets, isLoading } = useBudgets({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
  });
  const { data: categories } = useCategories();
  const createBudget = useCreateBudget();
  const deleteBudget = useDeleteBudget();

  const form = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      categoryId: "",
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      limitAmount: 0,
    },
  });

  const handleCreate = form.handleSubmit((data) => {
    createBudget.mutate(data, {
      onSuccess: () => {
        setIsModalOpen(false);
        form.reset();
      },
    });
  });

  const categoryOptions = (categories || [])
    .filter((c) => c.type === "Expense")
    .map((c) => ({ value: c.categoryId, label: c.name }));

  return (
    <div>
      <PageHeader>
        <PageTitle>Orçamentos</PageTitle>
        <Button size="sm" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> Novo Orçamento
        </Button>
      </PageHeader>

      {isLoading ? (
        <Spinner size="lg" />
      ) : budgets && budgets.length > 0 ? (
        <BudgetGrid>
          {budgets.map((budget) => (
            <BudgetItem key={budget.budgetId}>
              <BudgetHeader>
                <BudgetInfo>
                  <CategoryDot $color={budget.categoryColor} />
                  <BudgetName>{budget.categoryName}</BudgetName>
                </BudgetInfo>
                <IconButton
                  onClick={() => {
                    if (window.confirm("Excluir orçamento?"))
                      deleteBudget.mutate(budget.budgetId);
                  }}
                  aria-label="Excluir"
                >
                  <Trash2 size={16} />
                </IconButton>
              </BudgetHeader>
              <ProgressBar percent={budget.progressPercent} />
              <BudgetValues>
                <span>Gasto: {formatCurrency(budget.spentAmount)}</span>
                <span>Limite: {formatCurrency(budget.limitAmount)}</span>
              </BudgetValues>
            </BudgetItem>
          ))}
        </BudgetGrid>
      ) : (
        <Card>
          <EmptyState
            title="Nenhum orçamento definido"
            subtitle="Defina limites de gastos por categoria para controlar suas despesas."
            actionLabel="Novo Orçamento"
            onAction={() => setIsModalOpen(true)}
          />
        </Card>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo Orçamento"
      >
        <Form onSubmit={handleCreate}>
          <Select
            label="Categoria"
            options={categoryOptions}
            placeholder="Selecione a categoria"
            error={form.formState.errors.categoryId?.message}
            {...form.register("categoryId")}
          />
          <Input
            label="Ano"
            type="number"
            error={form.formState.errors.year?.message}
            {...form.register("year")}
          />
          <Input
            label="Mês"
            type="number"
            min={1}
            max={12}
            error={form.formState.errors.month?.message}
            {...form.register("month")}
          />
          <Input
            label="Valor limite"
            type="number"
            step="0.01"
            placeholder="0,00"
            error={form.formState.errors.limitAmount?.message}
            {...form.register("limitAmount")}
          />
          <Button type="submit" fullWidth isLoading={createBudget.isPending}>
            Criar Orçamento
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
