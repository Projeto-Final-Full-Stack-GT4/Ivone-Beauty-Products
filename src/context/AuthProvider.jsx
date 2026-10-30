import { useState } from "react";
import { AuthContext } from "./AuthContext.js";

const API_URL = "https://dummyjson.com";
const USER_STORAGE_KEY = "ivone-user";
const TOKEN_STORAGE_KEY = "ivone-access-token";

function readStoredUser() {
  const storedUser = window.localStorage.getItem(USER_STORAGE_KEY);
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Não foi possível carregar a sessão salva.", error);
    window.localStorage.removeItem(USER_STORAGE_KEY);
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  async function login(username, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, expiresInMins: 60 }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Não foi possível entrar.");
    }

    const accessToken = data.accessToken || data.token;
    if (!accessToken) {
      throw new Error("A API não retornou um token de acesso.");
    }

    window.localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
    setUser(data);
    return data;
  }

  function logout() {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    window.localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
