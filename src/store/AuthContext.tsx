import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { IAuthState, AuthAction, IUser } from "../types";
import { setAccessTokenGetter, setLogoutCallback } from "../services/api";

const initialState: IAuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
};

function authReducer(state: IAuthState, action: AuthAction): IAuthState {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        isAuthenticated: true,
        isLoading: false,
      };
    case "LOGOUT":
      return { ...initialState };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

interface IAuthContext {
  state: IAuthState;
  login: (user: IUser, accessToken: string) => void;
  logout: () => void;
  getAccessToken: () => string | null;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback((user: IUser, accessToken: string) => {
    dispatch({ type: "LOGIN", payload: { user, accessToken } });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
  }, []);

  const getAccessToken = useCallback(() => {
    return state.accessToken;
  }, [state.accessToken]);

  useEffect(() => {
    setAccessTokenGetter(() => state.accessToken);
    setLogoutCallback(() => {
      dispatch({ type: "LOGOUT" });
    });
  }, [state.accessToken]);

  const value = useMemo(
    () => ({ state, login, logout, getAccessToken }),
    [state, login, logout, getAccessToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
