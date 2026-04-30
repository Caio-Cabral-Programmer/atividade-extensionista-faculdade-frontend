export type AccountType = "CheckingAccount" | "Savings" | "Cash" | "Investment";

export interface IAccount {
  accountId: string;
  name: string;
  type: AccountType;
  typeName: string;
  initialBalance: number;
  currentBalance: number;
  color: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
}

export interface ICreateAccountRequest {
  name: string;
  type: AccountType;
  initialBalance: number;
  color: string;
  icon: string;
}

export interface IUpdateAccountRequest {
  name: string;
  type: AccountType;
  initialBalance: number;
  color: string;
  icon: string;
  isActive: boolean;
}
