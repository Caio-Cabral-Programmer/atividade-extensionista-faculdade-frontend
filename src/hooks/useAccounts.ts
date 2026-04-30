import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { accountService } from "../services/accountService";
import { ICreateAccountRequest, IUpdateAccountRequest } from "../types";
import { getApiErrorMessage } from "../utils/errorHandler";

export function useAccounts() {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: accountService.getAll,
  });
}

export function useCreateAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateAccountRequest) => accountService.create(data),
    onSuccess: () => {
      toast.success("Conta criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useUpdateAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateAccountRequest }) =>
      accountService.update(id, data),
    onSuccess: () => {
      toast.success("Conta atualizada!");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useDeleteAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => accountService.delete(id),
    onSuccess: () => {
      toast.success("Conta excluída!");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
