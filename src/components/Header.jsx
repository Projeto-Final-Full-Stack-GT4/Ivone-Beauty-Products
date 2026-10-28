import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMagnifyingGlass, faBagShopping, faTruck, faUser } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
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

export default function Header({ qtdCarrinho = 0 }) {
  const { pathname, search } = useLocation();
  const atual = pathname + search;

  return (
    <header className="header">
      <div className="header__topo">
        <div className="header__topo-inner">
          <span className="header__topo-item">
            <FontAwesomeIcon icon={faTruck} aria-hidden="true" />
            Frete grátis acima de R$ 199
          </span>
          <span className="header__topo-centro">Beleza que valoriza o que te faz única</span>
          <span className="header__topo-dir">
            <a href="#atendimento" className="header__topo-item">
              <FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" />
              Atendimento
            </a>
            <Link to="/login" className="header__topo-item">
              <FontAwesomeIcon icon={faUser} aria-hidden="true" />
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
            <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
          </button>
          <Link to="/wishlist" className="header__icone" aria-label="Lista de desejos">
            <FontAwesomeIcon icon={faHeart} aria-hidden="true" />
          </Link>
          <Link to="/cart" className="header__icone" aria-label={`Carrinho, ${qtdCarrinho} itens`}>
            <FontAwesomeIcon icon={faBagShopping} aria-hidden="true" />
            {qtdCarrinho > 0 && <span className="header__badge">{qtdCarrinho}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
