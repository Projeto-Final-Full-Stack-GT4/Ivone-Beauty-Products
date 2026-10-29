import products from '../data/products';
import '../components/Products.css';
import { useSearchParams, Link } from 'react-router-dom';


function Products() {
    
    const [searchParams] = useSearchParams();
    const category = searchParams.get('categoria');

    const filteredProducts = category
      ? products.filter((product) => product.category === category)
      : products;

    return (
        <section>
            <h1>Todos os produtos</h1>

            {filteredProducts.length === 0 && (
                <p>Nenhum produto encontrado nessa categoria.</p>

            )}

            <div className="products-grid">
                {filteredProducts.map((product) => (
                     <article className="product-card" key={product.id}>
                   <span className="product-tag">{product.tag}</span>
                   <div className="product-image">
                      <Link to={`/product/${product.id}`}>
                      {product.image ? (
                         <img src={product.image} alt={product.name} />
                      ) : (
                         <span className="product-illustration" role="img" aria-label={product.name}>
                            {product.illustration}
                         </span>
                      )}
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