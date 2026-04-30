import axios from "axios";

export function getApiErrorMessage(
  error: unknown,
  fallback = "Ocorreu um erro inesperado.",
): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "Erro de conexão. Verifique sua internet.";
    }
    const data = error.response.data;
    if (data?.message) return data.message;
    if (data?.title) return data.title;
    if (data?.detail) return data.detail;
    return fallback;
  }
  return fallback;
}
