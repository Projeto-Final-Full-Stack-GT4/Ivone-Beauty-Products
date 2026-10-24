 import './Products.css';
 import serumImage from '../assets/products/serum_facial.png';
 import gelImage from '../assets/products/Gel_de_Limpeza.png';
 import poCompacto from '../assets/products/po_compacto.jpeg';
import batomHidratante from '../assets/products/batom.jpeg';




 const Products = [
    {
    id: 1,
    name: 'Sérum Facial Revitalizante',
    size: '30ml',
    price: 89.90,
    tag: 'Mais vendido',
    image: serumImage,

    },

    {
      id: 2,
      name: 'Gel de Limpeza Facial',
      size: '120ml',
      price: 49.90,
      tag: 'Vegano',
      image: gelImage,

    },

    {
      id: 3,
      name: 'Pó Compacto Matte',
      size: '10g',
      price: 69.90,
      tag: 'Lançamento',
      image: poCompacto,

    },

    {
      id: 4,
      name: 'Batom Hidradante',
      size: '4g',
      price: 59.90,
      tag: 'Mais Vendido',
      image: batomHidratante,
    },

 ];

 function Products() {
   return (
      <section className="products-section">
         <div className="product-heading">
            <span>PRODUTOS EM DESTAQUE</span>
            <h2>Nossos favoritos para você</h2>
         </div>  

         <div className='products-grid'>
            {Products.map((product) => 
            <article className="product-card" key={product.id}>
               <span className="product-tag">{product.tag}</span>

               <div className="product-image">
                  <img src={product.image} alt={product.name}/>
               </div>

               <div className="product-info">
                  <h3>{product.name}</h3>
                  <P className="product-size">{product.size}</P>
               </div>

               <p className="product-price">
                  {product.price.toLocaleString('pt-BR', {
                     style: 'currency',
                     currency: 'BRL',
                  })}
               </p>



            </article>
            
            
            )}

         </div>
      </section>
      
   )

 }

 export default Products;

