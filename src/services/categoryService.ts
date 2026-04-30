import api from "./api";
import {
  ICategory,
  ICreateCategoryRequest,
  IUpdateCategoryRequest,
} from "../types";

export const categoryService = {
  getAll: async () => {
    const response = await api.get<ICategory[]>("/categories");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ICategory>(`/categories/${id}`);
    return response.data;
  },

  create: async (data: ICreateCategoryRequest) => {
    const response = await api.post<ICategory>("/categories", data);
    return response.data;
  },

  update: async (id: string, data: IUpdateCategoryRequest) => {
    const response = await api.put<ICategory>(`/categories/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/categories/${id}`);
  },
};
