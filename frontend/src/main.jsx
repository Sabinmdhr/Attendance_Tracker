import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext"; // make sure the path is correct
import UserAppProvider from "./context/UserAppContext";
import AdminAppProvider from "./context/AdminAppContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <UserAppProvider>
    <AdminAppProvider>
      <App />
    </AdminAppProvider>
    </UserAppProvider>
  </AuthProvider>,
);
