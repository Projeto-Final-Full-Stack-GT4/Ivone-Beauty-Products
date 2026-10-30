import { faCreditCard, faHeart, faLeaf, faShieldHalved, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Beneficios.css";

const ICONES = {
  folha: faLeaf,
  escudo: faShieldHalved,
  caminhao: faTruck,
  cartao: faCreditCard,
  coracao: faHeart,
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
          <FontAwesomeIcon icon={ICONES[icone]} aria-hidden="true" />
          {linhas.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </li>
      ))}
    </ul>
  );
}
