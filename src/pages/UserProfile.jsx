import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import "./Account.css";

export default function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <section className="account-page">
      <div className="account-card">
        <h1>Dados pessoais</h1>
        <p className="account-card__description">
          Olá, {user.firstName} {user.lastName}
        </p>

        <div className="account-details">
          <p>
            <strong>Nome:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Usuário:</strong> {user.username}
          </p>
          <p>
            <strong>E-mail:</strong> {user.email}
          </p>
          {user.phone && (
            <p>
              <strong>Telefone:</strong> {user.phone}
            </p>
          )}
        </div>

        <button
          className="account-card__button"
          type="button"
          onClick={handleLogout}
        >
          Sair da conta
        </button>
      </div>
    </section>
  );
}
