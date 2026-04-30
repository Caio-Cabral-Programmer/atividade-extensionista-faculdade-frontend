import api from "./api";
import {
  IRecurringTransaction,
  ICreateRecurringTransactionRequest,
  IUpdateRecurringTransactionRequest,
} from "../types";

export const recurringTransactionService = {
  getAll: async () => {
    const response = await api.get<IRecurringTransaction[]>(
      "/recurring-transactions",
    );
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<IRecurringTransaction>(
      `/recurring-transactions/${id}`,
    );
    return response.data;
  },

  create: async (data: ICreateRecurringTransactionRequest) => {
    const response = await api.post<IRecurringTransaction>(
      "/recurring-transactions",
      data,
    );
    return response.data;
  },

  update: async (id: string, data: IUpdateRecurringTransactionRequest) => {
    const response = await api.put<IRecurringTransaction>(
      `/recurring-transactions/${id}`,
      data,
    );
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/recurring-transactions/${id}`);
  },
};
