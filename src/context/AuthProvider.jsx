import { useState } from "react";
import { AuthContext } from "./AuthContext.js";
import { loginUser, registerUser } from "../services/api.js";

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
  const [token, setToken] = useState(() => window.localStorage.getItem(TOKEN_STORAGE_KEY) || null);

  async function login(email, password) {
    const response = await loginUser({ email, senha: password });
    const accessToken = response?.token;

    if (!accessToken) {
      throw new Error("A API não retornou um token de acesso.");
    }

    const authenticatedUser = response?.usuario || null;
    if (!authenticatedUser) {
      throw new Error("A API não retornou os dados do usuário.");
    }

    window.localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authenticatedUser));
    setToken(accessToken);
    setUser(authenticatedUser);
    return { token: accessToken, user: authenticatedUser };
  }

  async function register(payload) {
    const createdUser = await registerUser(payload);
    return createdUser;
  }

  function logout() {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    window.localStorage.removeItem(USER_STORAGE_KEY);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
