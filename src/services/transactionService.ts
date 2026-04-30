import api from "./api";
import {
  ITransaction,
  ITransactionFilters,
  ICreateTransactionRequest,
  IUpdateTransactionRequest,
  TransactionStatus,
  IPaginatedResponse,
} from "../types";

export const transactionService = {
  getAll: async (filters: ITransactionFilters) => {
    const response = await api.get<IPaginatedResponse<ITransaction>>(
      "/transactions",
      {
        params: filters,
      },
    );
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ITransaction>(`/transactions/${id}`);
    return response.data;
  },

  create: async (data: ICreateTransactionRequest) => {
    const response = await api.post<ITransaction>("/transactions", data);
    return response.data;
  },

  update: async (id: string, data: IUpdateTransactionRequest) => {
    const response = await api.put<ITransaction>(`/transactions/${id}`, data);
    return response.data;
  },

  updateStatus: async (id: string, status: TransactionStatus) => {
    const response = await api.patch<ITransaction>(
      `/transactions/${id}/status`,
      { status },
    );
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/transactions/${id}`);
  },
};
