import api from "./api";
import {
  IBudget,
  IBudgetFilters,
  ICreateBudgetRequest,
  IUpdateBudgetRequest,
} from "../types";

export const budgetService = {
  getAll: async (filters?: IBudgetFilters) => {
    const response = await api.get<IBudget[]>("/budgets", { params: filters });
    return response.data;
  },

  create: async (data: ICreateBudgetRequest) => {
    const response = await api.post<IBudget>("/budgets", data);
    return response.data;
  },

  update: async (id: string, data: IUpdateBudgetRequest) => {
    const response = await api.put<IBudget>(`/budgets/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/budgets/${id}`);
  },
};
