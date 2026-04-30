import api from "./api";
import {
  ILoginRequest,
  IRegisterRequest,
  IVerify2FARequest,
  IVerify2FAResponse,
  IForgotPasswordRequest,
  IResetPasswordRequest,
} from "../types";

export const authService = {
  login: async (data: ILoginRequest) => {
    const response = await api.post<{ message: string }>("/auth/login", data);
    return response.data;
  },

  verify2FA: async (data: IVerify2FARequest) => {
    const response = await api.post<IVerify2FAResponse>(
      "/auth/verify-2fa",
      data,
    );
    return response.data;
  },

  register: async (data: IRegisterRequest) => {
    const response = await api.post<{ message: string }>(
      "/auth/register",
      data,
    );
    return response.data;
  },

  confirmEmail: async (token: string) => {
    const response = await api.get<{ message: string }>("/auth/confirm-email", {
      params: { token },
    });
    return response.data;
  },

  forgotPassword: async (data: IForgotPasswordRequest) => {
    const response = await api.post<{ message: string }>(
      "/auth/forgot-password",
      data,
    );
    return response.data;
  },

  resetPassword: async (data: IResetPasswordRequest) => {
    const response = await api.post<{ message: string }>(
      "/auth/reset-password",
      data,
    );
    return response.data;
  },
};
