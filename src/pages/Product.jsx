import { useParams } from 'react-router-dom';
import products from '../data/products';
import './Product.css';

function Product() {
    const { id } = useParams();
    const product = products.find((item) => item.id === Number(id));

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
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <span className="product-illustration" role="img" aria-label={product.name}>
            {product.illustration}
          </span>
        )}
       </div>

       <div className="product-page-info">
         <h1>{product.name}</h1>
         <p className="product-page-description">{product.description}</p>
         <p className="product-page-size">{product.size}</p>
         <p className="product-page-price">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'} )}</p>
         <button className="product-page-button">Adicionar ao carrinho</button>
       </div>
    </section>
 );
}






export default Product;