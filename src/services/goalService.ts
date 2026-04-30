import api from "./api";
import {
  IFinancialGoal,
  ICreateGoalRequest,
  IUpdateGoalRequest,
  IGoalDepositRequest,
  IGoalWithdrawRequest,
} from "../types";

export const goalService = {
  getAll: async () => {
    const response = await api.get<IFinancialGoal[]>("/financial-goals");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<IFinancialGoal>(`/financial-goals/${id}`);
    return response.data;
  },

  create: async (data: ICreateGoalRequest) => {
    const response = await api.post<IFinancialGoal>("/financial-goals", data);
    return response.data;
  },

  update: async (id: string, data: IUpdateGoalRequest) => {
    const response = await api.put<IFinancialGoal>(
      `/financial-goals/${id}`,
      data,
    );
    return response.data;
  },

  deposit: async (id: string, data: IGoalDepositRequest) => {
    const response = await api.patch<IFinancialGoal>(
      `/financial-goals/${id}/deposit`,
      data,
    );
    return response.data;
  },

  withdraw: async (id: string, data: IGoalWithdrawRequest) => {
    const response = await api.patch<IFinancialGoal>(
      `/financial-goals/${id}/withdraw`,
      data,
    );
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/financial-goals/${id}`);
  },
};
