import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMagnifyingGlass, faBagShopping, faTruck, faUser } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext.js";
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

export default function Header() {
  const { pathname, search } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const atual = pathname + search;

  function handleSearch(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("busca")?.toString().trim() ?? "";
    navigate(query ? `/products?busca=${encodeURIComponent(query)}` : "/products");
  }

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

        <nav className="site-header__nav" aria-label="Navegação principal">
          <Link className="site-header__link" to="/">Início</Link>
          <Link className="site-header__link" to="/products">Produtos</Link>
          <Link className="site-header__link" to="/wishlist">Lista de desejos</Link>
          <Link className="site-header__link" to="/cart">Carrinho</Link>
        </nav>

        <div className="header__acoes">
          <form
            key={searchParams.get("busca") ?? ""}
            className="header__busca"
            role="search"
            onSubmit={handleSearch}
          >
            <input
              type="search"
              name="busca"
              defaultValue={searchParams.get("busca") ?? ""}
              placeholder="Buscar produtos"
              aria-label="Buscar produtos pelo nome"
            />
            <button type="submit" className="header__icone" aria-label="Pesquisar produtos">
              <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
            </button>
          </form>
          <Link to="/wishlist" className="header__icone" aria-label="Lista de desejos">
            <FontAwesomeIcon icon={faHeart} aria-hidden="true" />
          </Link>
          <Link to="/cart" className="header__icone" aria-label={`Carrinho, ${totalItems} itens`}>
            <FontAwesomeIcon icon={faBagShopping} aria-hidden="true" />
            {totalItems > 0 && <span className="header__badge">{totalItems}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}