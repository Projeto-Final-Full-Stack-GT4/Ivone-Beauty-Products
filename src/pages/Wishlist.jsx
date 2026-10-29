import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext.js';
import { useWishlist } from '../context/WishlistContext.jsx';
import '../components/Products.css';
import './Wishlist.css';

function Wishlist() {
  const { items, toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <section className="wishlist-page">
      <h1 className="wishlist-page__title">Minha lista de desejos</h1>

      {items.length === 0 ? (
        <div className="wishlist-empty">
          <p>Sua lista ainda está vazia.</p>
          <Link to="/products">Explore nossos produtos</Link>
        </div>
      ) : (
        <div className="products-grid">
          {items.map((product) => (
            <article className="product-card" key={product.id}>
              <button
                className={`product-wishlist${isInWishlist(product.id) ? ' product-wishlist--active' : ''}`}
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label={`Remover ${product.name} da lista de desejos`}
                aria-pressed={isInWishlist(product.id)}
              >
                <FontAwesomeIcon icon={faHeart} aria-hidden="true" />
              </button>
              <div className="product-image">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
              </div>
              <div className="product-info">
                <Link to={`/product/${product.id}`}>
                  <h2>{product.name}</h2>
                </Link>
                <p className="product-size">{product.size}</p>
              </div>
              <p className="product-price">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
              <button className="add-to-cart" type="button" onClick={() => addToCart(product)}>
                Adicionar ao carrinho
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Wishlist;