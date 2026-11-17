import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.js";
import { fetchCurrentUser, loginUser, registerUser } from "../services/api.js";

const USER_STORAGE_KEY = "ivone-user";
const TOKEN_STORAGE_KEY = "ivone-access-token";

function readStoredUser() {
  if (!window.localStorage.getItem(TOKEN_STORAGE_KEY)) {
    window.localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }

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
  const [token, setToken] = useState(() => window.localStorage.getItem(TOKEN_STORAGE_KEY) || null);
  const [user, setUser] = useState(readStoredUser);
  const [isLoading, setIsLoading] = useState(() => Boolean(window.localStorage.getItem(TOKEN_STORAGE_KEY)));
  const [sessionError, setSessionError] = useState("");

  useEffect(() => {
    let active = true;

    if (!token) {
      return () => {
        active = false;
      };
    }

    fetchCurrentUser(token)
      .then((authenticatedUser) => {
        if (!active) return;
        window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authenticatedUser));
        setUser(authenticatedUser);
        setSessionError("");
      })
      .catch((error) => {
        if (!active) return;

        if (error.status === 401) {
          window.localStorage.removeItem(TOKEN_STORAGE_KEY);
          window.localStorage.removeItem(USER_STORAGE_KEY);
          setToken(null);
          setUser(null);
          setSessionError("");
          setIsLoading(false);
          return;
        }

        console.error("Não foi possível validar a sessão salva.", error);
        setSessionError("Não foi possível validar sua sessão. Confira sua conexão e tente novamente.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [token]);

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
    setIsLoading(true);
    setToken(accessToken);
    setUser(authenticatedUser);
    setSessionError("");
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
    setSessionError("");
    setIsLoading(false);
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, sessionError, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
