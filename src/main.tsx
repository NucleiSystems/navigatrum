import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../sass/index.scss";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import LoginComponent from "./pages/Login.tsx";
import RegisterComponent from "./pages/register.tsx";
import GalleryView from "./pages/galleryView.tsx";
import UploadView from "./pages/uploadView.tsx";
import Logout from "./pages/logout.tsx";
import AuthProvider from "./components/providers/AuthProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <LoginComponent />,
  },
  {
    path: "/auth/register",
    element: <RegisterComponent />,
  },
  {
    path: "/",
    element: <AuthProvider ProtectedPage={<GalleryView />}></AuthProvider>,
  },
  {
    path: "/upload",
    element: <AuthProvider ProtectedPage={<UploadView />}></AuthProvider>,
  },
  {
    path: "/logout",
    Component: Logout,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router}></RouterProvider>
    </NextUIProvider>
  </React.StrictMode>
);
