import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom';
=======
import { BrowserRouter } from "react-router";

import { AuthProvider } from "./auth/AuthContext.jsx";
>>>>>>> origin/main

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
      <App />
=======
      <AuthProvider>
        <App />
      </AuthProvider>
>>>>>>> origin/main
    </BrowserRouter>
  </StrictMode>
);