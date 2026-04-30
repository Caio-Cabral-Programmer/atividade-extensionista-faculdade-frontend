import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboardService";

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: dashboardService.getSummary,
  });
}

export function useExpensesByCategory(year?: number, month?: number) {
  return useQuery({
    queryKey: ["dashboard", "expenses-by-category", year, month],
    queryFn: () => dashboardService.getExpensesByCategory(year, month),
  });
}

export function useBalanceEvolution(year?: number) {
  return useQuery({
    queryKey: ["dashboard", "balance-evolution", year],
    queryFn: () => dashboardService.getBalanceEvolution(year),
  });
}

export function useBalanceProjection() {
  return useQuery({
    queryKey: ["dashboard", "balance-projection"],
    queryFn: dashboardService.getBalanceProjection,
  });
}
