import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext.js';
import { fetchProductById } from '../services/api.js';
import { ProductReviews } from '../components/produtos.reviews.jsx';
import './Product.css';

function Product() {
  const { id } = useParams();
  const { addToCart, canAddToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadProduct() {
      try {
        const data = await fetchProductById(id);
        if (active) {
          setProduct(data);
        }
      } catch (error) {
        console.error('Não foi possível carregar o produto.', error);
        if (active) {
          setProduct(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <section>
        <h1>Carregando produto...</h1>
      </section>
    );
  }

  if (!product) {
    return (
      <section>
        <h1>Produto não encontrado</h1>
      </section>
    );
  }

  return (
    <section className="product-page">
      <div className="product-page-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-page-info">
        <h1>{product.name}</h1>
        <p className="product-page-description">{product.description}</p>
        <p className="product-page-size">{product.size}</p>
        <p className="product-page-price">
          {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
        <button
          className="product-page-button"
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
      </div>

      <ProductReviews reviews={product.reviews} />
    </section>
  );
}

export default Product;