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
    reviews: [
      {
        id: 101,
        user: "Mariana Silva",
        rating: 5,
        date: "12/11/2026",
        comment:
          "Deixou minha pele iluminada e hidratada sem pesar. Uso todos os dias pela manhã!",
      },
    ],
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
    reviews: [
      {
        id: 201,
        user: "Carlos Mendes",
        rating: 4,
        date: "05/10/2026",
        comment:
          "Gel de limpeza eficaz, mas pode ser um pouco seco para peles muito sensíveis.",
      },
    ],
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
    reviews: [
      {
        id: 301,
        user: "Ana Paula",
        rating: 5,
        date: "20/11/2026",
        comment: "Adorei o acabamento matte e a longevidade do pó compacto!",
      },
    ],
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
    reviews: [
      {
        id: 401,
        user: "Juliana Costa",
        rating: 4,
        date: "15/12/2026",
        comment: "Batom hidratante e de fácil aplicação. Recomendo!",
      },
    ],
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
    reviews: [
      {
        id: 501,
        user: "Roberta Santos",
        rating: 5,
        date: "10/11/2026",
        comment:
          "Sérum facial com vitamina C é incrível! Deixou minha pele mais clara e radiante.",
      },
    ],
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
    reviews: [
      {
        id: 601,
        user: "Fernanda Lima",
        rating: 4,
        date: "22/11/2026",
        comment:
          "Gel de limpeza suave, ideal para o uso diário. Minha pele ficou limpa e fresca.",
      },
    ],
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
    reviews: [
      {
        id: 701,
        user: "Patrícia Oliveira",
        rating: 5,
        date: "30/11/2026",
        comment:
          "Sérum facial noturno é excelente! Deixou minha pele hidratada e renovada.",
      },
    ],
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
    reviews: [
      {
        id: 801,
        user: "Marcos Almeida",
        rating: 4,
        date: "18/12/2026",
        comment:
          "Gel de limpeza purificante, ideal para peles oleosas. Deixou minha pele limpa e com sensação de frescor.",
      },
    ],
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
    reviews: [
      {
        id: 901,
        user: "Camila Rodrigues",
        rating: 5,
        date: "25/12/2026",
        comment:
          "Pó compacto natural é ótimo! Deixou minha pele com um acabamento perfeito.",
      },
    ],
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
    reviews: [
      {
        id: 1001,
        user: "Juliana Souza",
        rating: 4,
        date: "02/01/2027",
        comment: "Batom nude cremoso é ótimo para um look natural e elegante.",
      },
    ],
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
    reviews: [
      {
        id: 1101,
        user: "Letícia Moreira",
        rating: 5,
        date: "08/01/2027",
        comment: "Cor intensa, confortável de usar e muito bonita no rosto!",
      },
    ],
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
    reviews: [
      {
        id: 1201,
        user: "Renata Alves",
        rating: 5,
        date: "11/01/2027",
        comment: "Acabamento muito bonito e leve, ideal para o dia a dia.",
      },
    ],
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
    reviews: [
      {
        id: 1301,
        user: "Isabela Ramos",
        rating: 5,
        date: "14/01/2027",
        comment: "Tom sofisticado e excelente pigmentação. Adorei!",
      },
    ],
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
    reviews: [
      {
        id: 1401,
        user: "Nina Martins",
        rating: 4,
        date: "18/01/2027",
        comment: "Hidrata bem sem deixar a pele oleosa. Ótimo para rotina diária.",
      },
    ],
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
    reviews: [
      {
        id: 1501,
        user: "Larissa Costa",
        rating: 4,
        date: "21/01/2027",
        comment: "Limpeza suave e agradável, sem sensação de ressecamento.",
      },
    ],
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
    reviews: [
      {
        id: 1601,
        user: "Talita Mendonça",
        rating: 5,
        date: "24/01/2027",
        comment: "Perfeito para quem quer uma rotina facial completa e prática.",
      },
    ],
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
    reviews: [
      {
        id: 1701,
        user: "Beatriz Nunes",
        rating: 5,
        date: "27/01/2027",
        comment: "Muito útil para montar uma maquiagem rápida e bonita.",
      },
    ],
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
    reviews: [
      {
        id: 1801,
        user: "Amanda Freitas",
        rating: 5,
        date: "29/01/2027",
        comment: "Ideia incrível de presente, muito bonito e funcional.",
      },
    ],
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
    reviews: [
      {
        id: 1901,
        user: "Gabriela Reis",
        rating: 5,
        date: "02/02/2027",
        comment: "Ótimo para quem está começando a cuidar da pele.",
      },
    ],
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
    reviews: [
      {
        id: 2001,
        user: "Carolina Dias",
        rating: 4,
        date: "05/02/2027",
        comment: "Uma boa seleção para momentos de autocuidado e relaxamento.",
      },
    ],
  },
];

export default products;
