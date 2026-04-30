export interface IBudget {
  budgetId: string;
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  categoryColor: string;
  year: number;
  month: number;
  limitAmount: number;
  spentAmount: number;
  remainingAmount: number;
  progressPercent: number;
}

export interface IBudgetFilters {
  year?: number;
  month?: number;
}

export interface ICreateBudgetRequest {
  categoryId: string;
  year: number;
  month: number;
  limitAmount: number;
}

export interface IUpdateBudgetRequest {
  limitAmount: number;
}
