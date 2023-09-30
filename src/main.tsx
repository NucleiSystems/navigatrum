import React from "react";
import ReactDOM from "react-dom/client";
import { store, persistor } from "./features/store.ts";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../sass/index.scss";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import LandingPage from "./pages/LandingPage.tsx";
import LoginComponent from "./pages/Login.tsx";
import RegisterComponent from "./pages/register.tsx";
import GalleryView from "./pages/galleryView.tsx";
import UploadView from "./pages/uploadView.tsx";
import Logout from "./pages/logout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginComponent,
  },
  {
    path: "/register",
    Component: RegisterComponent,
  },
  {
    path: "/dashboard",
    Component: GalleryView,
  },
  {
    path: "/upload",
    Component: UploadView,
  },
  {
    path: "/logout",
    Component: Logout,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NextUIProvider>
        <React.StrictMode>
          <RouterProvider router={router}></RouterProvider>
        </React.StrictMode>
      </NextUIProvider>
    </PersistGate>
  </Provider>
);
