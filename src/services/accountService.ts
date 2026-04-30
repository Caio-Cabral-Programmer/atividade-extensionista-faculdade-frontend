import api from "./api";
import {
  IAccount,
  ICreateAccountRequest,
  IUpdateAccountRequest,
} from "../types";

export const accountService = {
  getAll: async () => {
    const response = await api.get<IAccount[]>("/accounts");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<IAccount>(`/accounts/${id}`);
    return response.data;
  },

  create: async (data: ICreateAccountRequest) => {
    const response = await api.post<IAccount>("/accounts", data);
    return response.data;
  },

  update: async (id: string, data: IUpdateAccountRequest) => {
    const response = await api.put<IAccount>(`/accounts/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/accounts/${id}`);
  },
};
