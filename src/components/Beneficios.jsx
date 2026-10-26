import "./Beneficios.css";

const ICONES = {
  folha: <path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15M5 19c3-4 6-6 9-8" />,
  escudo: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  caminhao: (
    <>
      <path d="M2 6h12v10H2zM14 9h4l4 4v3h-8" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  cartao: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
    </>
  ),
  coracao: (
    <path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 9c0 6-8 11-8 11z" />
  ),
};

const ITENS_PADRAO = [
  { icone: "folha", linhas: ["Produtos naturais", "e selecionados"] },
  { icone: "escudo", linhas: ["Compra segura", "e protegida"] },
  { icone: "caminhao", linhas: ["Frete grátis", "acima de R$ 199"] },
  { icone: "cartao", linhas: ["Parcelamento", "em até 6x sem juros"] },
  { icone: "coracao", linhas: ["Beleza consciente", "e sem crueldade animal"] },
];

export default function Beneficios({ itens = ITENS_PADRAO }) {
  return (
    <ul className="beneficios" aria-label="Benefícios da loja">
      {itens.map(({ icone, linhas }) => (
        <li key={icone} className="beneficios__item">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {ICONES[icone]}
          </svg>
          {linhas.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </li>
      ))}
    </ul>
  );
}
