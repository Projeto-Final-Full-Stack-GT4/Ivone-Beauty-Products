
import './Products.css';
import products from '../data/products';
import { useCart } from '../context/CartContext.js';
import { useWishlist } from '../context/WishlistContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function Products() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <section className="products-section">
      <div className="products-heading">
        <span>PRODUTOS EM DESTAQUE</span>
      </div>

      <div className="products-grid">
        {products.slice(0, 8).map((product) => (
          <article className="product-card" key={product.id}>
            <span className="product-tag">{product.tag}</span>
            <button
              className={`product-wishlist${isInWishlist(product.id) ? ' product-wishlist--active' : ''}`}
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-label={`${isInWishlist(product.id) ? 'Remover' : 'Adicionar'} ${product.name} ${isInWishlist(product.id) ? 'da' : 'à'} lista de desejos`}
              aria-pressed={isInWishlist(product.id)}
            >
              <FontAwesomeIcon icon={faHeart} aria-hidden="true" />
            </button>

            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>

            <div className="product-info">
              <h3>{product.name}</h3>
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
    </section>
  );
}

export default Products;
