import gelImage from "../assets/products/Gel_de_Limpeza.png";
import serumImage from "../assets/products/serum_facial.png";
import poCompacto from "../assets/products/po_compacto.jpeg";
import batomHidratante from "../assets/products/batom.jpeg";

const products = [
  {
    id: 1,
    name: "Sérum Facial Revitalizante",
    category: "skincare",
    description:
      "Sérum leve que hidrata, renova e ilumina a pele. Use pela manhã e à noite, depois de limpar o rosto.",
    size: "30ml",
    price: 89.9,
    tag: "Mais Vendido",
    image: serumImage,
  },

  {
    id: 2,
    name: "Gel de Limpeza Facial",
    category: "skincare",
    description: 'Gel de limpeza com extratos naturais e aloe vera. Remove a oleosidade e as impurezas do dia sem ressecar a pele. Use de manhã e à noite, massageando com a pele úmida e enxaguando em seguida.',
    size: "120ml",
    price: 49.9,
    tag: "Vegano",
    image: gelImage,
  },

  {
    id: 3,
    name: "Pó Compacto Matte",
    category: "maquiagem",
    description: 'Pó compacto de acabamento matte que controla o brilho e uniformiza o tom da pele. Ideal para finalizar a make e retocar ao longo do dia. Aplique com a esponja ou o pincel, em camadas leves.',
    size: "10g",
    price: 69.9,
    tag: "Lançamento",
    image: poCompacto,
  },

  {
    id: 4,
    name: "Batom Hidradante",
    category: "maquiagem",
    description: 'Batom de cor intensa com textura confortável, que hidrata enquanto colore. Aplique direto nos lábios, começando pelo centro e espalhando para as extremidades. Reaplique sempre que precisar.',
    size: "4g",
    price: 59.9,
    tag: "Mais Vendido",
    image: batomHidratante,
  },
];

export default products;
