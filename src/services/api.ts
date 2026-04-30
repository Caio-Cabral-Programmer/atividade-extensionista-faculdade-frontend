import axios from "axios";

let accessTokenGetter: (() => string | null) | null = null;
let logoutCallback: (() => void) | null = null;

export function setAccessTokenGetter(getter: () => string | null) {
  accessTokenGetter = getter;
}

export function setLogoutCallback(callback: () => void) {
  logoutCallback = callback;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = accessTokenGetter?.();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      logoutCallback?.();
    }
    return Promise.reject(error);
  },
);

export default api;
