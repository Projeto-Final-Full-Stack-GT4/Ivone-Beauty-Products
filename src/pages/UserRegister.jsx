import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import './UserRegister.css';

const initialForm = {
  nome: '',
  email: '',
  cpf: '',
  senha: '',
  confirmarSenha: '',
};

export default function UserRegister() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === 'cpf') {
      setForm((currentForm) => ({
        ...currentForm,
        cpf: value.replace(/\D/g, '').slice(0, 11),
      }));
      return;
    }

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setStatus('');

    if (form.senha !== form.confirmarSenha) {
      setError('As senhas devem ser iguais.');
      return;
    }

    if (form.cpf.replace(/\D/g, '').length !== 11) {
      setError('Informe um CPF com 11 dígitos.');
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        nome: form.nome.trim(),
        email: form.email.trim().toLowerCase(),
        cpf: form.cpf.replace(/\D/g, ''),
        senha: form.senha,
      });

      setStatus('Cadastro realizado com sucesso! Faça login para continuar.');
      setForm(initialForm);
      setTimeout(() => navigate('/login', { replace: true }), 900);
    } catch (registerError) {
      setError(
        registerError instanceof Error
          ? registerError.message
          : 'Não foi possível concluir o cadastro.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="user-register" aria-labelledby="user-register-title">
      <div className="user-register__card">
        <p className="user-register__eyebrow">Sua beleza, do seu jeito</p>
        <h1 id="user-register-title" className="user-register__title">
          Crie sua conta
        </h1>
        <p className="user-register__description">
          Preencha seus dados para fazer parte da nossa comunidade.
        </p>

        <form className="user-register__form" onSubmit={handleSubmit}>
          <div className="user-register__field">
            <label htmlFor="register-name">Nome completo</label>
            <input
              id="register-name"
              name="nome"
              type="text"
              autoComplete="name"
              placeholder="Seu nome completo"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="user-register__field">
            <label htmlFor="register-email">E-mail</label>
            <input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="voce@exemplo.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="user-register__field">
            <label htmlFor="register-cpf">CPF</label>
            <input
              id="register-cpf"
              name="cpf"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="Digite seu CPF"
              maxLength={11}
              value={form.cpf}
              onChange={handleChange}
              pattern="[0-9]{11,}"
              title="Informe pelo menos 11 dígitos."
              aria-describedby="register-cpf-help"
              required
            />
            <small id="register-cpf-help">Informe pelo menos 11 dígitos, sem pontos ou traço.</small>
          </div>

          <div className="user-register__field">
            <label htmlFor="register-password">Senha</label>
            <input
              id="register-password"
              name="senha"
              type="password"
              autoComplete="new-password"
              placeholder="Crie uma senha"
              minLength={8}
              pattern="(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Use pelo menos 8 caracteres, com uma letra maiúscula e uma minúscula."
              aria-describedby="register-password-help"
              value={form.senha}
              onChange={handleChange}
              required
            />
            <small id="register-password-help">
              Mínimo de 8 caracteres, com pelo menos uma letra maiúscula e uma minúscula.
            </small>
          </div>

          <div className="user-register__field">
            <label htmlFor="register-confirm-password">Confirmar senha</label>
            <input
              id="register-confirm-password"
              name="confirmarSenha"
              type="password"
              autoComplete="new-password"
              placeholder="Repita a senha"
              value={form.confirmarSenha}
              onChange={handleChange}
              required
            />
          </div>

          <button className="user-register__submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Cadastrando...' : 'Criar conta'}
          </button>

          {error && (
            <p className="user-register__status" role="alert">
              {error}
            </p>
          )}

          {status && (
            <p className="user-register__status" role="status">
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}