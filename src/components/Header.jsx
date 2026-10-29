import { Link } from 'react-router-dom';
import './Header.css';

function Header({
  brand = 'Ivone Beauty Products',
  description = 'Beleza e cuidado para você',
}) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-header__brand" to="/" aria-label={`${brand} - início`}>
          <span className="site-header__name">{brand}</span>
          <span className="site-header__description">{description}</span>
        </Link>

        <nav className="site-header__nav" aria-label="Navegação principal">
          <Link className="site-header__link" to="/">Início</Link>
          <Link className="site-header__link" to="/products">Produtos</Link>
          <Link className="site-header__link" to="/wishlist">Lista de desejos</Link>
          <Link className="site-header__link" to="/cart">Carrinho</Link>
          <Link className="site-header__link" to="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;