
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function UserProfile() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormulario((atual) => ({
      ...atual,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMensagem("");
    setErro("");
    setSalvando(true);

    try {
      await updateUser(formulario);
      setMensagem("Seus dados foram atualizados!");
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <section className="auth-container">
      <div className="auth-card">
        <h1>Meu perfil</h1>
        <p>Olá, {user?.firstName}!</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">Nome</label>
          <input
            id="firstName"
            name="firstName"
            className="form-control mb-3"
            value={formulario.firstName}
            onChange={handleChange}
            required
          />

          <label htmlFor="lastName">Sobrenome</label>
          <input
            id="lastName"
            name="lastName"
            className="form-control mb-3"
            value={formulario.lastName}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control mb-3"
            value={formulario.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Telefone</label>
          <input
            id="phone"
            name="phone"
            className="form-control mb-3"
            value={formulario.phone}
            onChange={handleChange}
          />

          {mensagem && (
            <p className="auth-success">{mensagem}</p>
          )}

          {erro && <p className="auth-error">{erro}</p>}

          <button
            type="submit"
            className="btn btn-ivone w-100"
            disabled={salvando}
          >
            {salvando ? "Salvando..." : "Salvar alterações"}
          </button>
        </form>

        <button
          type="button"
          className="btn btn-outline-secondary w-100 mt-3"
          onClick={handleLogout}
        >
          Sair da conta
        </button>
      </div>
    </section>
  );
}
