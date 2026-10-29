import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const REDES_SOCIAIS = [
  { nome: "Instagram", icone: faInstagram },
  { nome: "Facebook", icone: faFacebookF },
  { nome: "TikTok", icone: faTiktok },
  { nome: "YouTube", icone: faYoutube },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a className="brand-name" href="/" aria-label="Ivone Beauty Product, página inicial">
          <span>IVONE</span>
          <small>Beauty Product</small>
        </a>

        <div className="newsletter">
          <p>Receba novidades, promoções exclusivas e dicas de beleza.</p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Seu e-mail"
              aria-label="Seu e-mail"
              required
            />
            <button type="submit">Quero receber</button>
          </form>
        </div>

        <nav className="social-links" aria-label="Redes sociais">
          {REDES_SOCIAIS.map(({ nome, icone }) => (
            <a key={nome} href="#" aria-label={nome}>
              <FontAwesomeIcon icon={icone} aria-hidden="true" />
              <span>{nome}</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="footer-bottom">
        <nav className="footer-links" aria-label="Informações">
          <a href="#">Ajuda</a>
          <a href="#">Trocas e Devoluções</a>
          <a href="#">Política de Privacidade</a>
          <a href="#">Termos de Uso</a>
        </nav>

        <p className="copyright">
          Ivone Beauty Product © 2026. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
 