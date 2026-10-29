import { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://dummyjson.com";

export default function UserRegister() {
  const [formulario, setFormulario] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormulario((atual) => ({ ...atual, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMensagem("");
    setErro("");
    setEnviando(true);

    try {
      const resposta = await fetch(`${API_URL}/users/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formulario),
      });
      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.message || "Não foi possível criar a conta.");
      }

      setMensagem(
        "Cadastro de demonstração realizado. A API não salva novos usuários permanentemente; use uma conta de teste para entrar."
      );
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível criar a conta."
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Criar conta</h1>
        <p>Preencha seus dados para se cadastrar</p>

        <label htmlFor="firstName">Nome</label>
        <input
          id="firstName"
          name="firstName"
          className="form-control mb-3"
          value={formulario.firstName}
          onChange={handleChange}
          autoComplete="given-name"
          required
        />

        <label htmlFor="lastName">Sobrenome</label>
        <input
          id="lastName"
          name="lastName"
          className="form-control mb-3"
          value={formulario.lastName}
          onChange={handleChange}
          autoComplete="family-name"
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
          autoComplete="email"
          required
        />

        <label htmlFor="username">Nome de usuário</label>
        <input
          id="username"
          name="username"
          className="form-control mb-3"
          value={formulario.username}
          onChange={handleChange}
          autoComplete="username"
          required
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          className="form-control mb-3"
          value={formulario.password}
          onChange={handleChange}
          autoComplete="new-password"
          minLength={6}
          required
        />

        {mensagem && <p className="auth-success">{mensagem}</p>}
        {erro && <p className="auth-error">{erro}</p>}

        <button
          className="btn btn-ivone w-100"
          type="submit"
          disabled={enviando}
        >
          {enviando ? "Cadastrando..." : "Cadastrar"}
        </button>

        <p className="mt-3 mb-0">
          Já tem uma conta? <Link to="/login">Entrar</Link>
        </p>
      </form>
    </section>
  );
}