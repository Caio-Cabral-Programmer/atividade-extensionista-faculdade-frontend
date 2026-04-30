import api from "./api";
import {
  IDashboardSummary,
  IExpenseByCategory,
  IBalanceEvolution,
  IBalanceProjection,
} from "../types";

export const dashboardService = {
  getSummary: async () => {
    const response = await api.get<IDashboardSummary>("/dashboard/summary");
    return response.data;
  },

  getExpensesByCategory: async (year?: number, month?: number) => {
    const response = await api.get<IExpenseByCategory[]>(
      "/dashboard/charts/expenses-by-category",
      {
        params: { year, month },
      },
    );
    return response.data;
  },

  getBalanceEvolution: async (year?: number) => {
    const response = await api.get<IBalanceEvolution[]>(
      "/dashboard/charts/balance-evolution",
      {
        params: { year },
      },
    );
    return response.data;
  },

  getBalanceProjection: async () => {
    const response = await api.get<IBalanceProjection>(
      "/dashboard/balance-projection",
    );
    return response.data;
  },
};
