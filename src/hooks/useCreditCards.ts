import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { creditCardService } from "../services/creditCardService";
import { ICreateCreditCardRequest, IUpdateCreditCardRequest } from "../types";
import { getApiErrorMessage } from "../utils/errorHandler";

export function useCreditCards() {
  return useQuery({
    queryKey: ["credit-cards"],
    queryFn: creditCardService.getAll,
  });
}

export function useCreateCreditCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateCreditCardRequest) =>
      creditCardService.create(data),
    onSuccess: () => {
      toast.success("Cartão criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["credit-cards"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useUpdateCreditCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: IUpdateCreditCardRequest;
    }) => creditCardService.update(id, data),
    onSuccess: () => {
      toast.success("Cartão atualizado!");
      queryClient.invalidateQueries({ queryKey: ["credit-cards"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useDeleteCreditCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => creditCardService.delete(id),
    onSuccess: () => {
      toast.success("Cartão excluído!");
      queryClient.invalidateQueries({ queryKey: ["credit-cards"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
