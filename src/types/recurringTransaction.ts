import { TransactionType } from "./transaction";

export type RecurrenceFrequency = "Daily" | "Weekly" | "Monthly" | "Yearly";

export interface IRecurringTransaction {
  recurringTransactionId: string;
  type: TransactionType;
  typeName: string;
  amount: number;
  description: string | null;
  frequency: RecurrenceFrequency;
  frequencyName: string;
  dayOfMonth: number | null;
  startDate: string;
  endDate: string | null;
  isActive: boolean;
  accountId: string;
  accountName: string;
  categoryId: string;
  categoryName: string;
}

export interface ICreateRecurringTransactionRequest {
  type: TransactionType;
  amount: number;
  accountId: string;
  categoryId: string;
  description: string | null;
  frequency: RecurrenceFrequency;
  dayOfMonth: number | null;
  startDate: string;
  endDate: string | null;
}

export interface IUpdateRecurringTransactionRequest {
  amount: number;
  accountId: string;
  categoryId: string;
  description: string | null;
  frequency: RecurrenceFrequency;
  dayOfMonth: number | null;
  endDate: string | null;
  isActive: boolean;
}
