
import { Link } from 'react-router-dom';
import products from '../data/products';
import { useWishlist } from '../context/WishlistContext.jsx';
import './Wishlist.css';

function Wishlist() {
  const { wishlistIds, removeFromWishlist } = useWishlist();

  const favoriteProducts = products.filter((product) =>
    wishlistIds.includes(product.id)
  );

  return (
    <section className="wishlist-section">
      <div className="wishlist-heading">
        <span>SELEÇÃO ESPECIAL</span>
        <h1>Minha Wishlist ♡</h1>
        <p>Seus produtos favoritos estão aqui.</p>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">♡</div>
          <h2>Sua wishlist está vazia</h2>
          <p>
            Você ainda não salvou nenhum produto.
            Explore nossa coleção e escolha seus favoritos!
          </p>
          <Link to="/products" className="wishlist-back-button">
            Explorar produtos
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {favoriteProducts.map((product) => (
            <article className="wishlist-card" key={product.id}>
              <div className="wishlist-image">
                <Link to={`/product/${product.id}`}>
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <div
                      className="wishlist-illustration"
                      role="img"
                      aria-label={product.name}
                    >
                      {product.illustration}
                    </div>
                  )}
                </Link>
              </div>

              <div className="wishlist-info">
                <h3>{product.name}</h3>
                <p className="wishlist-size">{product.size}</p>
                <p className="wishlist-price">
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>
              </div>

              <div className="wishlist-actions">
                <Link
                  to={`/product/${product.id}`}
                  className="wishlist-back-button"
                >
                  Ver produto
                </Link>

                <button
                  className="wishlist-remove-button"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  Remover dos favoritos
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Wishlist;
