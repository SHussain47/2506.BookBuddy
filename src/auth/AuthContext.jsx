import { createContext, useContext, useEffect, useState } from "react";

const API = import.meta.env.VITE_API;
const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

 
  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
  }, []);

 
  async function register(credentials) {
    const res = await fetch(`${API}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await res.json();
    if (!res.ok) throw Error(result.message || "Register failed");

    setToken(result.token);
    localStorage.setItem("token", result.token);
    return result;
  }

  async function login(credentials) {
    const res = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await res.json();
    if (!res.ok) throw Error(result.message || "Login failed");

    setToken(result.token);
    localStorage.setItem("token", result.token);
    return result;
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  const value = { token, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw Error("useAuth can only be used within <AuthProvider>");
  return ctx;
}
