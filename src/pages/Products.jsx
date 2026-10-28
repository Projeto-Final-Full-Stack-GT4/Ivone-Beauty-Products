import products from '../data/products';
import '../components/Products.css';

function Products() {
    return (
        <section>
            <h1>Todos os produtos</h1>

            <div className="products-grid">
                {products.map((product) => (
                     <article className="product-card" key={product.id}>
                   <span className="product-tag">{product.tag}</span>
                   <div className="product-image">
                      <img src={product.image} alt={product.name}/>
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