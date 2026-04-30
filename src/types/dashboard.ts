export interface IDashboardSummary {
  totalBalance: number;
  monthIncome: number;
  monthExpenses: number;
  billsDueNext7Days: number;
  pendingTransactionsCount: number;
}

export interface IExpenseByCategory {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  totalAmount: number;
  percentage: number;
}

export interface IBalanceEvolution {
  year: number;
  month: number;
  monthName: string;
  income: number;
  expenses: number;
  netBalance: number;
}

export interface IBalanceProjection {
  currentBalance: number;
  pendingExpenses: number;
  pendingIncome: number;
  projectedBalance: number;
}
