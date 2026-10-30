import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import "./Account.css";

export default function UserLogin() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/dados-pessoais" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(username.trim(), password);
      navigate("/dados-pessoais", { replace: true });
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Não foi possível entrar."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="account-page">
      <div className="account-card">
        <h1>Entrar</h1>
        <p className="account-card__description">
          Acesse sua conta Ivone Beauty.
        </p>

        <form className="account-form" onSubmit={handleSubmit}>
          <div className="account-form__field">
            <label htmlFor="login-username">Nome de usuário</label>
            <input
              id="login-username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <div className="account-form__field">
            <label htmlFor="login-password">Senha</label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error && (
            <p className="account-form__error" role="alert">
              {error}
            </p>
          )}

          <button
            className="account-form__submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="account-card__link">
          Ainda não tem conta? <Link to="/registro">Cadastre-se</Link>
        </p>
      </div>
    </section>
  );
}