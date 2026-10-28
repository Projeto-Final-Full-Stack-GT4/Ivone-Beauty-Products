import { useState } from 'react';
import './UserRegister.css';

export default function UserRegister() {
  const [cpf, setCpf] = useState('');
  const [status, setStatus] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setStatus('Dados validados. O envio do cadastro ainda não está conectado.');
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
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Seu nome completo"
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
              value={cpf}
              onChange={(event) => setCpf(event.target.value.replace(/\D/g, '').slice(0, 11))}
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
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Crie uma senha"
              minLength={8}
              pattern="(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Use pelo menos 8 caracteres, com uma letra maiúscula e uma minúscula."
              aria-describedby="register-password-help"
              required
            />
            <small id="register-password-help">
              Mínimo de 8 caracteres, com pelo menos uma letra maiúscula e uma minúscula.
            </small>
          </div>

          <button className="user-register__submit" type="submit">
            Criar conta
          </button>
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