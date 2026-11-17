import '../components/Products.css';
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.js';
import { useWishlist } from '../context/WishlistContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { fetchProducts } from '../services/api.js';

const CATEGORY_NAMES = {
  skincare: 'Skincare',
  maquiagem: 'Maquiagem',
  cabelos: 'Cabelos',
  kits: 'Kits especiais',
};

function Products() {
  const [searchParams] = useSearchParams();
  const { addToCart, canAddToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const category = searchParams.get('categoria');
  const searchTerm = searchParams.get('busca')?.trim() ?? '';

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const data = await fetchProducts({
          category: category || undefined,
          search: searchTerm || undefined,
        });

        if (active) {
          setProducts(data);
        }
      } catch (error) {
        console.error('Não foi possível carregar os produtos.', error);
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
  }, [category, searchTerm]);

  const pageTitle = searchTerm
    ? `Resultados para "${searchTerm}"`
    : category
      ? CATEGORY_NAMES[category] || 'Categoria não encontrada'
      : 'Todos os produtos';

  return (
    <section className="products-page">
      <h1 className="products-page__title">
        {pageTitle}
      </h1>

      {isLoading ? (
        <p className="products-page__empty">Carregando produtos...</p>
      ) : products.length === 0 ? (
        <p className="products-page__empty">
          {searchTerm
            ? `Nenhum produto encontrado para "${searchTerm}".`
            : 'Nenhum produto encontrado nessa categoria.'}
        </p>
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
              <button
                className="add-to-cart"
                type="button"
                onClick={() => addToCart(product)}
                disabled={!canAddToCart(product)}
              >
                {Number(product.estoque) === 0
                  ? 'Sem estoque'
                  : canAddToCart(product)
                    ? 'Adicionar ao carrinho'
                    : 'Limite no carrinho'}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Products;