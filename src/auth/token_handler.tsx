import React from "react";
import { useLocation, Navigate } from "react-router-dom";
/* eslint-disable no-unused-expressions */

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const fetchToken = () => {
  return localStorage.getItem("token");
};

export const RequireToken = ({ children: child }: any) => {
  let auth = fetchToken();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return child;
};

export const LoggedInChecker = ({ children: child }: any) => {
  let auth = fetchToken();
  let location = useLocation();

  if (auth) {
    return <Navigate to="/profile" state={{ from: location }} />;
  }
  return child;
};
