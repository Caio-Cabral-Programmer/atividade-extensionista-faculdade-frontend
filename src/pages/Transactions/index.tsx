import { useState } from "react";
import styled from "styled-components";
import { Plus, Check, Clock, Trash2, Edit2 } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import {
  useTransactions,
  useUpdateTransactionStatus,
  useDeleteTransaction,
} from "../../hooks/useTransactions";
import { ITransactionFilters, ITransaction } from "../../types";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { TransactionFormModal } from "./TransactionFormModal";

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
`;

const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};
  gap: 12px;
  flex-wrap: wrap;

  &:last-child {
    border-bottom: none;
  }
`;

const TransactionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
`;

const CategoryDot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  flex-shrink: 0;
`;

const TransactionDetails = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const TransactionDesc = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TransactionMeta = styled.span`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Amount = styled.span<{ $type: string }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ $type, theme }) =>
    $type === "Income"
      ? theme.colors.success
      : $type === "Expense"
        ? theme.colors.danger
        : theme.colors.secondary};
  white-space: nowrap;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 6px;
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  min-height: 44px;
  min-width: 44px;
  justify-content: center;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
`;

const PaginationInfo = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default function Transactions() {
  const [filters, setFilters] = useState<ITransactionFilters>({
    page: 1,
    pageSize: 20,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<ITransaction | null>(null);

  const { data, isLoading } = useTransactions(filters);
  const statusMutation = useUpdateTransactionStatus();
  const deleteMutation = useDeleteTransaction();

  const handleToggleStatus = (transaction: ITransaction) => {
    const newStatus = transaction.status === "Paid" ? "Pending" : "Paid";
    statusMutation.mutate({ id: transaction.transactionId, status: newStatus });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta transação?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (transaction: ITransaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const totalPages = data ? Math.ceil(data.total / data.pageSize) : 0;

  return (
    <div>
      <PageHeader>
        <PageTitle>Transações</PageTitle>
        <Button
          onClick={() => {
            setEditingTransaction(null);
            setIsModalOpen(true);
          }}
        >
          <Plus size={18} />
          Nova Transação
        </Button>
      </PageHeader>

      <Card>
        {isLoading ? (
          <Spinner />
        ) : data && data.data.length > 0 ? (
          <>
            {data.data.map((transaction) => (
              <TransactionItem key={transaction.transactionId}>
                <TransactionInfo>
                  <CategoryDot $color={transaction.categoryColor} />
                  <TransactionDetails>
                    <TransactionDesc>
                      {transaction.description || transaction.categoryName}
                    </TransactionDesc>
                    <TransactionMeta>
                      {formatDate(transaction.date)} • {transaction.accountName}
                    </TransactionMeta>
                  </TransactionDetails>
                </TransactionInfo>
                <Amount $type={transaction.type}>
                  {transaction.type === "Income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </Amount>
                <Badge
                  variant={
                    transaction.status === "Paid" ? "success" : "warning"
                  }
                >
                  {transaction.statusName}
                </Badge>
                <Actions>
                  <IconButton
                    onClick={() => handleToggleStatus(transaction)}
                    aria-label={
                      transaction.status === "Paid"
                        ? "Marcar como pendente"
                        : "Marcar como pago"
                    }
                  >
                    {transaction.status === "Paid" ? (
                      <Clock size={16} />
                    ) : (
                      <Check size={16} />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={() => handleEdit(transaction)}
                    aria-label="Editar"
                  >
                    <Edit2 size={16} />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(transaction.transactionId)}
                    aria-label="Excluir"
                  >
                    <Trash2 size={16} />
                  </IconButton>
                </Actions>
              </TransactionItem>
            ))}
            {totalPages > 1 && (
              <Pagination>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={filters.page === 1}
                  onClick={() =>
                    setFilters((f) => ({ ...f, page: (f.page || 1) - 1 }))
                  }
                >
                  Anterior
                </Button>
                <PaginationInfo>
                  {filters.page} de {totalPages}
                </PaginationInfo>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={filters.page === totalPages}
                  onClick={() =>
                    setFilters((f) => ({ ...f, page: (f.page || 1) + 1 }))
                  }
                >
                  Próxima
                </Button>
              </Pagination>
            )}
          </>
        ) : (
          <EmptyState
            title="Nenhuma transação encontrada"
            subtitle="Comece adicionando sua primeira transação."
            actionLabel="Nova Transação"
            onAction={() => setIsModalOpen(true)}
          />
        )}
      </Card>

      <TransactionFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        transaction={editingTransaction}
      />
    </div>
  );
}
