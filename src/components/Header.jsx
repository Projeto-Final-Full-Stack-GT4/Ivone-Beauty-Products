import { Link, useLocation } from "react-router-dom";
import "./Header.css";

// Edite aqui os links do menu (to = rota)
const MENU = [
  { texto: "Início", to: "/" },
  { texto: "Produtos", to: "/products" },
  { texto: "Skincare", to: "/products?categoria=skincare" },
  { texto: "Maquiagem", to: "/products?categoria=maquiagem" },
  { texto: "Kits", to: "/products?categoria=kits" },
  { texto: "Sobre nós", to: "/sobre" },
];

const icone = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };

export default function Header({ qtdCarrinho = 0 }) {
  const { pathname, search } = useLocation();
  const atual = pathname + search;

  return (
    <header className="header">
      <div className="header__topo">
        <div className="header__topo-inner">
          <span className="header__topo-item">
            <svg viewBox="0 0 24 24" {...icone}><path d="M2 6h12v10H2zM14 9h4l4 4v3h-8" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>
            Frete grátis acima de R$ 199
          </span>
          <span className="header__topo-centro">Beleza que valoriza o que te faz única</span>
          <span className="header__topo-dir">
            <a href="#atendimento" className="header__topo-item">
              <svg viewBox="0 0 24 24" {...icone}><path d="M4 20l1.3-4.2A8 8 0 1112 20a8 8 0 01-3.8-1L4 20z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2L9 9.5z" /></svg>
              Atendimento
            </a>
            <Link to="/login" className="header__topo-item">
              <svg viewBox="0 0 24 24" {...icone}><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-4 3.5-6 7-6s6.2 2 7 6" /></svg>
              Minha conta
            </Link>
          </span>
        </div>
      </div>

      <div className="header__principal">
        <Link to="/" className="header__logo" aria-label="Ivone Beauty Product, página inicial">
          <span className="header__logo-nome">IVONE</span>
          <span className="header__logo-sub">Beauty Product</span>
        </Link>

        <nav className="header__nav" aria-label="Menu principal">
          {MENU.map(({ texto, to }) => (
            <Link key={to} to={to} className={"header__link" + (atual === to ? " header__link--ativo" : "")} aria-current={atual === to ? "page" : undefined}>
              {texto}
            </Link>
          ))}
        </nav>

        <div className="header__acoes">
          <button type="button" className="header__icone" aria-label="Buscar">
            <svg viewBox="0 0 24 24" {...icone}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg>
          </button>
          <Link to="/wishlist" className="header__icone" aria-label="Lista de desejos">
            <svg viewBox="0 0 24 24" {...icone}><path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 9c0 6-8 11-8 11z" /></svg>
          </Link>
          <Link to="/cart" className="header__icone" aria-label={`Carrinho, ${qtdCarrinho} itens`}>
            <svg viewBox="0 0 24 24" {...icone}><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6a3 3 0 016 0v2" /></svg>
            {qtdCarrinho > 0 && <span className="header__badge">{qtdCarrinho}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
