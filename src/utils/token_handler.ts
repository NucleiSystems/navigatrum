import { useLocation, useNavigate } from "react-router-dom";
import { store } from "../features/store";

/**
 * The function sets a token in the local storage.
 * @param {string} token - The `token` parameter is a string that represents a token value.
 */
export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

/**
 * The function sets the expiration time for a token in the local storage.
 * @param {string} expireTime - The `expireTime` parameter is a string that represents the expiration
 * time of a token.
 */
export const setTokenExpire = (expireTime: string): void => {
  localStorage.setItem("token-expire", expireTime);
};

/**
 * The function fetchToken retrieves a token from the localStorage and returns it as a string or null
 * if it doesn't exist.
 * @returns The function `fetchToken` returns a string value if there is a token stored in the
 * `localStorage`, otherwise it returns `null`.
 */
export const fetchToken = (): string | null => {
  return localStorage.getItem("token");
};

/**
 * The function `expTime` calculates the expiration time by adding 30 days to the current date and
 * time.
 * @returns The function `expTime` returns the current date and time in seconds, plus a time difference
 * of 30 days.
 */
export const expTime = () => {
  const date = Date.now();
  const timeDiff = 60 * 60 * 24 * 30;
  return date / 1000 + timeDiff;
};

/**
 * The `PrivRoutes` function checks if a user is logged in and redirects them to the login page if not,
 * otherwise it renders the children components.
 * @param  - - `children`: The child components that will be rendered if the user is logged in.
 * @returns If `isLoggedIn` is `false`, the function returns `navigation("/login")`. Otherwise, it
 * returns `children`.
 */
export const PrivRoutes = ({ children }: { children: any }) => {
  const navigation = useNavigate();
  const isLoggedIn = store.getState().token.isLoggedIn;
  if (isLoggedIn === false) {
    return navigation("/login");
  } else {
    return children;
  }
};

/**
 * The `NonPrivRoutes` function redirects to the dashboard if the user is logged in, otherwise it
 * renders its children.
 * @param  - - `NonPrivRoutes`: This is a functional component that takes in a single prop `children`.
 * @returns If the user is logged in, the function will navigate to the "/dashboard" route. If the user
 * is not logged in, the function will return the `children` component.
 */
export const NonPrivRoutes = ({ children }: { children: any }) => {
  const isLoggedIn = store.getState().token.isLoggedIn;
  const navigation = useNavigate();
  if (isLoggedIn) {
    navigation("/dashboard");
  } else {
    return children;
  }
};
