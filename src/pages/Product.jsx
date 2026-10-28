import { useParams } from 'react-router-dom';
import products from '../data/products';

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
    <section>
       <img src={product.image} alt={product.name} />
       <h1>{product.name}</h1>
       <p>{product.size}</p>
       <p>{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'} )}</p>
       <button>Adicionar ao carrinho</button>
    </section>
 );
}






export default Product;