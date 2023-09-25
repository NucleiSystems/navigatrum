import axios from "axios";

import { useLocation, useNavigate } from "react-router-dom";
import { store } from "../store";

export const setToken = async (token: string): Promise<string | void> => {
  return await localStorage.setItem("token", token);
};

export const setTokenExpire = async (
  expiretime: string
): Promise<string | void> => {
  return await localStorage.setItem("token-expire", expiretime);
};

// const refreshToken = async (token: string) => {
//   const response = await axios.post(
//     "http://localhost:8000/users/refresh",
//     new URLSearchParams({
//       token: token,
//     })
//   );
//   await localStorage.setItem("token", response.data.access_token);
// };

export const fetchToken = async (): Promise<string> => {
  const tokenFromStorage = await localStorage.getItem("token");
  // const refreshedToken = await refreshToken(tokenFromStorage);

  return tokenFromStorage;
};

export const PrivRoutes = ({ children: child }: { children: any }) => {
  const navigation = useNavigate();
  const isLoggedIn = store.getState().token.isLoggedin;

  if (isLoggedIn === false) {
    return navigation("/login");
  } else {
    return child;
  }
};

export const NonPrivRoutes = ({ children: child }: { children: any }) => {
  const isLoggedIn = store.getState().token.isLoggedin;
  const location = useLocation();
  const navigation = useNavigate();

  if (isLoggedIn) {
    navigation("/dashboard", { state: location });
  } else {
    return child;
  }
};
