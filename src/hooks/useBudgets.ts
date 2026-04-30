import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { budgetService } from "../services/budgetService";
import {
  IBudgetFilters,
  ICreateBudgetRequest,
  IUpdateBudgetRequest,
} from "../types";
import { getApiErrorMessage } from "../utils/errorHandler";

export function useBudgets(filters?: IBudgetFilters) {
  return useQuery({
    queryKey: ["budgets", filters],
    queryFn: () => budgetService.getAll(filters),
  });
}

export function useCreateBudget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateBudgetRequest) => budgetService.create(data),
    onSuccess: () => {
      toast.success("Orçamento criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useUpdateBudget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateBudgetRequest }) =>
      budgetService.update(id, data),
    onSuccess: () => {
      toast.success("Orçamento atualizado!");
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useDeleteBudget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => budgetService.delete(id),
    onSuccess: () => {
      toast.success("Orçamento excluído!");
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
