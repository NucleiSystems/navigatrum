import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import store from "./store.ts";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <NextUIProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </NextUIProvider>
  </Provider>
);
