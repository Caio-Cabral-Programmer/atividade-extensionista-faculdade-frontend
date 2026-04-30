import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatCurrency = (value: number): string =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const formatDate = (date: string | Date): string => {
  const parsed = typeof date === "string" ? parseISO(date) : date;
  return format(parsed, "dd/MM/yyyy", { locale: ptBR });
};

export const formatDateISO = (date: Date): string => format(date, "yyyy-MM-dd");
