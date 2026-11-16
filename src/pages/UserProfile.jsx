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

  const nomeCompleto = user.nome || "Usuário";

  return (
    <section className="account-page">
      <div className="account-card">
        <h1>Dados pessoais</h1>
        <p className="account-card__description">
          Olá, {nomeCompleto}
        </p>

        <div className="account-details">
          <p>
            <strong>Nome:</strong> {nomeCompleto}
          </p>
          <p>
            <strong>E-mail:</strong> {user.email}
          </p>
          <p>
            <strong>CPF:</strong> {user.cpf || "Não informado"}
          </p>
          <p>
            <strong>Perfil:</strong> {user.role || "cliente"}
          </p>
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
