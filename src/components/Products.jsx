
import './Products.css';
import products from '../data/products';

function Products() {
  return (
    <section className="products-section">
      <div className="products-heading">
        <span>PRODUTOS EM DESTAQUE</span>
      </div>

      <div className="products-grid">
        {products.slice(0, 4).map((product) => (
          <article className="product-card" key={product.id}>
            <span className="product-tag">{product.tag}</span>

            <div className="product-image">
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <span className="product-illustration" role="img" aria-label={product.name}>
                  {product.illustration}
                </span>
              )}
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

            <button className="add-to-cart">
              Adicionar ao carrinho
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Products;
