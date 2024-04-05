import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./api/config/axios";
import { queryClient } from "./api/config/queryClient";
import App from "./app/App";
import { persistor, store } from "./store";
import "./styles/styles.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
