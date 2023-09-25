import { useLocation, useNavigate } from "react-router-dom";
import { store } from "../store";

export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const setTokenExpire = (expiretime: string): void => {
  localStorage.setItem("token-expire", expiretime);
};

export const fetchToken = (): string | null => {
  return localStorage.getItem("token");
};

export const PrivRoutes = ({ children }: { children: any }) => {
  const navigation = useNavigate();
  const isLoggedIn = store.getState().token.isLoggedin;

  if (isLoggedIn === false) {
    return navigation("/login");
  } else {
    return children;
  }
};

export const NonPrivRoutes = ({ children }: { children: any }) => {
  const isLoggedIn = store.getState().token.isLoggedin;
  const location = useLocation();
  const navigation = useNavigate();

  if (isLoggedIn) {
    navigation("/dashboard", { state: location });
  } else {
    return children;
  }
};
