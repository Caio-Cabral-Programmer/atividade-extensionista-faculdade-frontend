import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styled from "styled-components";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Button } from "../../components/ui/Button";
import {
  useCreateTransaction,
  useUpdateTransaction,
} from "../../hooks/useTransactions";
import { useAccounts } from "../../hooks/useAccounts";
import { useCategories } from "../../hooks/useCategories";
import { ITransaction } from "../../types";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const transactionSchema = z.object({
  type: z.enum(["Income", "Expense", "Transfer"]),
  amount: z.coerce.number().positive("Valor deve ser maior que zero"),
  date: z.string().min(1, "Data é obrigatória"),
  accountId: z.string().min(1, "Conta é obrigatória"),
  destinationAccountId: z.string().optional(),
  creditCardId: z.string().optional(),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  description: z.string().optional(),
  status: z.enum(["Pending", "Paid"]),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: ITransaction | null;
}

export function TransactionFormModal({
  isOpen,
  onClose,
  transaction,
}: TransactionFormModalProps) {
  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();
  const { data: accounts } = useAccounts();
  const { data: categories } = useCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema) as never,
    defaultValues: {
      type: "Expense",
      status: "Paid",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const selectedType = watch("type");

  useEffect(() => {
    if (transaction) {
      reset({
        type: transaction.type,
        amount: transaction.amount,
        date: transaction.date,
        accountId: transaction.accountId,
        destinationAccountId: transaction.destinationAccountId || undefined,
        creditCardId: transaction.creditCardId || undefined,
        categoryId: transaction.categoryId,
        description: transaction.description || undefined,
        status: transaction.status,
      });
    } else {
      reset({
        type: "Expense",
        status: "Paid",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [transaction, reset]);

  const onSubmit = (data: TransactionFormData) => {
    if (transaction) {
      updateMutation.mutate(
        {
          id: transaction.transactionId,
          data: {
            amount: data.amount,
            date: data.date,
            accountId: data.accountId,
            creditCardId: data.creditCardId || null,
            categoryId: data.categoryId,
            description: data.description || null,
            status: data.status,
            tagIds: null,
          },
        },
        { onSuccess: onClose },
      );
    } else {
      createMutation.mutate(
        {
          type: data.type,
          amount: data.amount,
          date: data.date,
          accountId: data.accountId,
          destinationAccountId: data.destinationAccountId || null,
          creditCardId: data.creditCardId || null,
          categoryId: data.categoryId,
          description: data.description || null,
          status: data.status,
          isInstallment: false,
          totalInstallments: null,
          isRecurring: false,
          recurringTransactionId: null,
          tagIds: null,
        },
        { onSuccess: onClose },
      );
    }
  };

  const accountOptions = (accounts || []).map((a) => ({
    value: a.accountId,
    label: a.name,
  }));
  const categoryOptions = (categories || []).flatMap((c) => [
    { value: c.categoryId, label: c.name },
    ...c.subCategories.map((s) => ({
      value: s.categoryId,
      label: `  └ ${s.name}`,
    })),
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={transaction ? "Editar Transação" : "Nova Transação"}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        {!transaction && (
          <Select
            label="Tipo"
            options={[
              { value: "Income", label: "Receita" },
              { value: "Expense", label: "Despesa" },
              { value: "Transfer", label: "Transferência" },
            ]}
            error={errors.type?.message}
            {...register("type")}
          />
        )}
        <Row>
          <Input
            label="Valor"
            type="number"
            step="0.01"
            placeholder="0,00"
            error={errors.amount?.message}
            {...register("amount")}
          />
          <Input
            label="Data"
            type="date"
            error={errors.date?.message}
            {...register("date")}
          />
        </Row>
        <Select
          label="Conta"
          options={accountOptions}
          placeholder="Selecione a conta"
          error={errors.accountId?.message}
          {...register("accountId")}
        />
        {selectedType === "Transfer" && (
          <Select
            label="Conta de destino"
            options={accountOptions}
            placeholder="Selecione a conta de destino"
            error={errors.destinationAccountId?.message}
            {...register("destinationAccountId")}
          />
        )}
        <Select
          label="Categoria"
          options={categoryOptions}
          placeholder="Selecione a categoria"
          error={errors.categoryId?.message}
          {...register("categoryId")}
        />
        <Input
          label="Descrição"
          placeholder="Descrição (opcional)"
          {...register("description")}
        />
        <Select
          label="Status"
          options={[
            { value: "Paid", label: "Pago" },
            { value: "Pending", label: "Pendente" },
          ]}
          error={errors.status?.message}
          {...register("status")}
        />
        <Button
          type="submit"
          fullWidth
          isLoading={createMutation.isPending || updateMutation.isPending}
        >
          {transaction ? "Salvar" : "Criar Transação"}
        </Button>
      </Form>
    </Modal>
  );
}
