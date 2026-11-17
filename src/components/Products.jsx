
import './Products.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.js';
import { useWishlist } from '../context/WishlistContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { fetchProducts } from '../services/api.js';

function Products() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const data = await fetchProducts();
        if (active) {
          setProducts(data.slice(0, 8));
        }
      } catch (error) {
        console.error('Não foi possível carregar os produtos em destaque.', error);
        if (active) {
          setProducts([]);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="products-section">
      <div className="products-heading">
        <span>PRODUTOS EM DESTAQUE</span>
      </div>

      {isLoading ? (
        <p className="products-page__empty">Carregando produtos...</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
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
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
              </div>

              <div className="product-info">
                <Link to={`/product/${product.id}`}>
                  <h3>{product.name}</h3>
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

export default Products;
