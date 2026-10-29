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
    description:
      "Gel de limpeza com extratos naturais e aloe vera. Remove a oleosidade e as impurezas sem ressecar a pele.",
    size: "120ml",
    price: 49.9,
    tag: "Vegano",
    image: gelImage,
  },
  {
    id: 3,
    name: "Pó Compacto Matte",
    category: "maquiagem",
    description:
      "Pó compacto de acabamento matte que controla o brilho e ajuda a uniformizar o tom da pele.",
    size: "10g",
    price: 69.9,
    tag: "Lançamento",
    image: poCompacto,
  },
  {
    id: 4,
    name: "Batom Hidratante",
    category: "maquiagem",
    description:
      "Batom de cor intensa com textura confortável, que hidrata enquanto colore os lábios.",
    size: "4g",
    price: 59.9,
    tag: "Mais Vendido",
    image: batomHidratante,
  },
  {
    id: 5,
    name: "Sérum Facial Vitamina C",
    category: "skincare",
    description:
      "Sérum facial para complementar a rotina de cuidados e deixar a pele com aparência iluminada.",
    size: "30ml",
    price: 79.9,
    tag: "Destaque",
    image: serumImage,
  },
  {
    id: 6,
    name: "Gel de Limpeza Suave",
    category: "skincare",
    description:
      "Limpeza diária com textura leve para remover resíduos e impurezas da pele.",
    size: "150ml",
    price: 44.9,
    tag: "Uso Diário",
    image: gelImage,
  },
  {
    id: 7,
    name: "Sérum Facial Noturno",
    category: "skincare",
    description:
      "Sérum para integrar a rotina noturna de hidratação e cuidado facial.",
    size: "30ml",
    price: 94.9,
    tag: "Novidade",
    image: serumImage,
  },
  {
    id: 8,
    name: "Gel de Limpeza Purificante",
    category: "skincare",
    description:
      "Gel de limpeza para remover a oleosidade e deixar a pele com sensação de frescor.",
    size: "100ml",
    price: 39.9,
    tag: "Favorito",
    image: gelImage,
  },
  {
    id: 9,
    name: "Pó Compacto Natural",
    category: "maquiagem",
    description:
      "Pó compacto para finalizar a maquiagem com um acabamento natural.",
    size: "10g",
    price: 64.9,
    tag: "Essencial",
    image: poCompacto,
  },
  {
    id: 10,
    name: "Batom Nude Cremoso",
    category: "maquiagem",
    description:
      "Batom em tom nude com acabamento cremoso para compor maquiagens delicadas.",
    size: "4g",
    price: 54.9,
    tag: "Clássico",
    image: batomHidratante,
  },
  {
    id: 11,
    name: "Batom Rosa Intenso",
    category: "maquiagem",
    description:
      "Batom em tom rosa para destacar os lábios e completar a maquiagem.",
    size: "4g",
    price: 57.9,
    tag: "Destaque",
    image: batomHidratante,
  },
  {
    id: 12,
    name: "Pó Compacto Translúcido",
    category: "maquiagem",
    description:
      "Pó compacto para ajudar a finalizar a maquiagem com aparência uniforme.",
    size: "8g",
    price: 72.9,
    tag: "Novidade",
    image: poCompacto,
  },
  {
    id: 13,
    name: "Batom Vermelho Clássico",
    category: "maquiagem",
    description:
      "Batom vermelho para criar uma maquiagem marcante em diferentes ocasiões.",
    size: "4g",
    price: 59.9,
    tag: "Clássico",
    image: batomHidratante,
  },
  {
    id: 14,
    name: "Sérum Facial Hidratante",
    category: "skincare",
    description:
      "Sérum de textura leve para complementar os cuidados diários de hidratação.",
    size: "30ml",
    price: 74.9,
    tag: "Hidratação",
    image: serumImage,
  },
  {
    id: 15,
    name: "Gel de Limpeza Diário",
    category: "skincare",
    description:
      "Gel para a limpeza cotidiana do rosto, ideal para incluir na rotina de cuidados.",
    size: "120ml",
    price: 47.9,
    tag: "Essencial",
    image: gelImage,
  },
  {
    id: 16,
    name: "Kit Rotina Facial",
    category: "kits",
    description:
      "Kit demonstrativo com produtos de limpeza e sérum para uma rotina facial completa.",
    size: "2 produtos",
    price: 119.9,
    tag: "Kit Especial",
    image: serumImage,
  },
  {
    id: 17,
    name: "Kit Maquiagem Essencial",
    category: "kits",
    description:
      "Kit demonstrativo com pó compacto e batom para completar a nécessaire.",
    size: "2 produtos",
    price: 109.9,
    tag: "Kit Especial",
    image: poCompacto,
  },
  {
    id: 18,
    name: "Kit Presente Beleza",
    category: "kits",
    description:
      "Sugestão de presente com itens de maquiagem e cuidados faciais.",
    size: "3 itens",
    price: 149.9,
    tag: "Presente",
    image: batomHidratante,
  },
  {
    id: 19,
    name: "Kit Skincare Básico",
    category: "kits",
    description:
      "Kit demonstrativo para apresentar uma rotina simples de limpeza e cuidado facial.",
    size: "2 produtos",
    price: 99.9,
    tag: "Mais Vendido",
    image: gelImage,
  },
  {
    id: 20,
    name: "Kit Autocuidado",
    category: "kits",
    description:
      "Seleção demonstrativa de produtos para montar um momento especial de autocuidado.",
    size: "3 itens",
    price: 139.9,
    tag: "Especial",
    image: serumImage,
  },
];

export default products;