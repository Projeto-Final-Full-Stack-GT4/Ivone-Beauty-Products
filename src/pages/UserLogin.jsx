
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    setErro("");
    setEnviando(true);

    try {
      await login(username, password);
      navigate("/perfil", { replace: true });
    } catch (error) {
      setErro(error.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h1>Ivone Beauty</h1>
        <p>Entre na sua conta</p>

        <label htmlFor="username">Nome de usuário</label>
        <input
          id="username"
          className="form-control mb-3"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
          required
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          className="form-control mb-3"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />

        {erro && <p className="auth-error">{erro}</p>}

        <button
          className="btn btn-ivone w-100"
          type="submit"
          disabled={enviando}
        >
          {enviando ? "Entrando..." : "Entrar"}
        </button>

        <p className="mt-3 mb-0">
          Ainda não tem cadastro? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </form>
    </section>
  );
}
