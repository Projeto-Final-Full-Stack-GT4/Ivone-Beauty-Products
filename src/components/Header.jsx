import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMagnifyingGlass, faBagShopping, faTruck, faUser } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext.js";
import { useAuth } from "../context/AuthContext.js";
import { fetchCategories } from "../services/api.js";
import "./Header.css";

const STATIC_MENU = [
  { texto: "Início", to: "/" },
  { texto: "Produtos", to: "/products" },
  { texto: "Sobre nós", to: "/sobre" },
];

export default function Header() {
  const [categories, setCategories] = useState([]);
  const { pathname, search } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user } = useAuth();
  const atual = pathname + search;

  useEffect(() => {
    let active = true;

    fetchCategories({ useInMenu: true })
      .then((result) => {
        if (active) setCategories(result);
      })
      .catch((error) => {
        console.error("Não foi possível carregar as categorias do menu.", error);
      });

    return () => {
      active = false;
    };
  }, [pathname]);

  const menu = [
    ...STATIC_MENU.slice(0, 2),
    ...categories.map((category) => ({
      texto: category.slug === "kits" ? "Kits" : category.nome,
      to: `/products?categoriaId=${category.id}`,
    })),
    STATIC_MENU[2],
  ];

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
            <Link
              to={user ? "/dados-pessoais" : "/login"}
              className="header__topo-item"
            >
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
          {menu.map(({ texto, to }) => (
            <Link key={to} to={to} className={"header__link" + (atual === to ? " header__link--ativo" : "")} aria-current={atual === to ? "page" : undefined}>
              {texto}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className={"header__link" + (pathname === "/admin" ? " header__link--ativo" : "")}
              aria-current={pathname === "/admin" ? "page" : undefined}
            >
              Administração
            </Link>
          )}
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
