import { createContext, useContext, useState } from "react";

const API = import.meta.env.VITE_API;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();

  // REGISTER LOGIC
  const register = async (credentials) => {
    const response = await fetch(`${API}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    if (!response) {
      throw Error(result.message);
    }
    setToken(result.token);
    localStorage.setItem("token", result.token);
  };

  // LOGIN LOGIC
  const login = async (credentials) => {
    const response = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    if (!response) {
      throw Error(result.message);
    }
    setToken(result.token);
    localStorage.setItem("token", result.token);
  };

  // LOGOUT LOGIC
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const value = { token, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth can only be used within AuthProvider");
  return context;
}
