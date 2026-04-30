import api from "./api";
import {
  ICreditCard,
  ICreateCreditCardRequest,
  IUpdateCreditCardRequest,
} from "../types";

export const creditCardService = {
  getAll: async () => {
    const response = await api.get<ICreditCard[]>("/credit-cards");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ICreditCard>(`/credit-cards/${id}`);
    return response.data;
  },

  create: async (data: ICreateCreditCardRequest) => {
    const response = await api.post<ICreditCard>("/credit-cards", data);
    return response.data;
  },

  update: async (id: string, data: IUpdateCreditCardRequest) => {
    const response = await api.put<ICreditCard>(`/credit-cards/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/credit-cards/${id}`);
  },
};
