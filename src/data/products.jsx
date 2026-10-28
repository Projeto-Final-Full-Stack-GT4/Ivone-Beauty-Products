 import gelImage from '../assets/products/Gel_de_Limpeza.png';
 import serumImage from '../assets/products/serum_facial.png';
 import poCompacto from '../assets/products/po_compacto.jpeg';
 import batomHidratante from '../assets/products/batom.jpeg';
 

 const products = [
    {
    id: 1,
    name: 'Sérum Facial Revitalizante',
    category: 'skincare',
    size: '30ml',
    price: 89.90,
    tag: 'Mais Vendido',
    image: serumImage,

    },

    {
      id: 2,
      name: 'Gel de Limpeza Facial',
      category: 'skincare',
      size: '120ml',
      price: 49.90,
      tag: 'Vegano',
      image: gelImage,

    },

    {
      id: 3,
      name: 'Pó Compacto Matte',
      category: 'maquiagem',
      size: '10g',
      price: 69.90,
      tag: 'Lançamento',
      image: poCompacto,

    },

    {
      id: 4,
      name: 'Batom Hidradante',
      category: 'maquiagem',
      size: '4g',
      price: 59.90,
      tag: 'Mais Vendido',
      image: batomHidratante,
    },

 ];

 export default products;