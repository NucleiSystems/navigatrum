import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../sass/index.scss";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import LoginComponent from "./pages/auth/Login.tsx";
import RegisterComponent from "./pages/auth/register.tsx";
import GalleryView from "./pages/dataView/galleryView.tsx";
import ProfilePage from "./pages/profile.tsx";
import Logout from "./pages/auth/logout.tsx";
import AuthProvider from "./components/providers/AuthProvider.tsx";
import UploadView from "./pages/dataView/uploadView.tsx";

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
    path: "/profile",
    element: <AuthProvider ProtectedPage={<ProfilePage />}></AuthProvider>,
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
