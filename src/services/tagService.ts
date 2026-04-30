import api from "./api";
import { ITag, ICreateTagRequest, IUpdateTagRequest } from "../types";

export const tagService = {
  getAll: async () => {
    const response = await api.get<ITag[]>("/tags");
    return response.data;
  },

  create: async (data: ICreateTagRequest) => {
    const response = await api.post<ITag>("/tags", data);
    return response.data;
  },

  update: async (id: string, data: IUpdateTagRequest) => {
    const response = await api.put<ITag>(`/tags/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/tags/${id}`);
  },
};
