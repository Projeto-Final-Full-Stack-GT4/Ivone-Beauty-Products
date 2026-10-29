
import { createContext, useContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const API_URL = "https://dummyjson.com";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verifica se já existe uma sessão salva
  useEffect(() => {
    async function verificarSessao() {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const resposta = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!resposta.ok) {
          throw new Error("Sessão inválida");
        }

        const dados = await resposta.json();

        const perfilSalvo = JSON.parse(
          localStorage.getItem("perfilEditado") || "{}"
        );

        setUser({ ...dados, ...perfilSalvo });
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("perfilEditado");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    verificarSessao();
  }, []);

  // Login pela DummyJSON
  async function login(username, password) {
    const resposta = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 60,
      }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.message || "Não foi possível entrar.");
    }

    localStorage.setItem("accessToken", dados.accessToken);

    if (dados.refreshToken) {
      localStorage.setItem("refreshToken", dados.refreshToken);
    }

    localStorage.removeItem("perfilEditado");
    setUser(dados);

    return dados;
  }

  // Atualiza os dados do perfil
  async function updateUser(dadosUsuario) {
    if (!user?.id) {
      throw new Error("Usuário não autenticado.");
    }

    const token = localStorage.getItem("accessToken");

    const resposta = await fetch(`${API_URL}/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dadosUsuario),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.message || "Erro ao atualizar os dados.");
    }

    // A DummyJSON simula a atualização.
    const usuarioAtualizado = { ...user, ...dados, ...dadosUsuario };

    setUser(usuarioAtualizado);
    localStorage.setItem(
      "perfilEditado",
      JSON.stringify(usuarioAtualizado)
    );

    return usuarioAtualizado;
  }

  // Encerra a sessão
  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("perfilEditado");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar a autenticação nas páginas
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  }

  return context;
}
