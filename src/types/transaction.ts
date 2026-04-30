import { ITag } from "./tag";

export type TransactionType = "Income" | "Expense" | "Transfer";
export type TransactionStatus = "Pending" | "Paid";

export interface ITransaction {
  transactionId: string;
  type: TransactionType;
  typeName: string;
  amount: number;
  date: string;
  description: string | null;
  status: TransactionStatus;
  statusName: string;
  isInstallment: boolean;
  installmentNumber: number | null;
  totalInstallments: number | null;
  accountId: string;
  accountName: string;
  destinationAccountId: string | null;
  destinationAccountName: string | null;
  creditCardId: string | null;
  creditCardName: string | null;
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  categoryColor: string;
  tags: ITag[];
  createdAt: string;
}

export interface ITransactionFilters {
  type?: TransactionType;
  status?: TransactionStatus;
  accountId?: string;
  categoryId?: string;
  tagId?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  pageSize?: number;
}

export interface ICreateTransactionRequest {
  type: TransactionType;
  amount: number;
  date: string;
  accountId: string;
  destinationAccountId: string | null;
  creditCardId: string | null;
  categoryId: string;
  description: string | null;
  status: TransactionStatus;
  isInstallment: boolean;
  totalInstallments: number | null;
  isRecurring: boolean;
  recurringTransactionId: string | null;
  tagIds: string[] | null;
}

export interface IUpdateTransactionRequest {
  amount: number;
  date: string;
  accountId: string;
  creditCardId: string | null;
  categoryId: string;
  description: string | null;
  status: TransactionStatus;
  tagIds: string[] | null;
}
