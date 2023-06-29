import React from "react";
import axios from "axios";

import { useLocation, Navigate } from "react-router-dom";

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

export const LoginInspector = async () => {
  let token = fetchToken()
  const tokenChecker = await axios.post(
    "https://single-orca-f1izhs.ziska44n.traefikhub.io/users/token/check",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      token: `${localStorage.getItem("token")}`
    }
  ).then(
    (response=>{
      console.log(response.data)
    })
  )
};