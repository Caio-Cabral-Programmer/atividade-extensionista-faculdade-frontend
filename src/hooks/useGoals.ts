import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { goalService } from "../services/goalService";
import { ICreateGoalRequest, IUpdateGoalRequest } from "../types";
import { getApiErrorMessage } from "../utils/errorHandler";

export function useGoals() {
  return useQuery({
    queryKey: ["goals"],
    queryFn: goalService.getAll,
  });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateGoalRequest) => goalService.create(data),
    onSuccess: () => {
      toast.success("Meta criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useUpdateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateGoalRequest }) =>
      goalService.update(id, data),
    onSuccess: () => {
      toast.success("Meta atualizada!");
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useDepositGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, amount }: { id: string; amount: number }) =>
      goalService.deposit(id, { amount }),
    onSuccess: () => {
      toast.success("Depósito realizado!");
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useWithdrawGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, amount }: { id: string; amount: number }) =>
      goalService.withdraw(id, { amount }),
    onSuccess: () => {
      toast.success("Retirada realizada!");
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => goalService.delete(id),
    onSuccess: () => {
      toast.success("Meta excluída!");
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
