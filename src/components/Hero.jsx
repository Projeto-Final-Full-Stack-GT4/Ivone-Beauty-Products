import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Hero.css";
import imagemModelo from "../assets/hero-modelo.jpg";
import imagemProdutos from "../assets/hero-produtos.jpg";

export default function Hero({
  marca = "Ivone Beauty Product",
  titulo = "Sua beleza,",
  destaque = "seu ritual.",
  subtitulo = "Produtos que cuidam da sua pele, realçam sua beleza e transformam sua rotina.",
  ctaTexto = "Comprar agora",
  ctaHref = "/products",
}) {
  return (
    <section className="hero" aria-labelledby="hero-titulo">
      <div className="hero__img hero__img--modelo">
        <img src={imagemModelo} alt="Mulher com maquiagem natural e pele radiante" loading="eager" />
      </div>

      <div className="hero__texto">
        <p className="hero__marca">{marca}</p>
        <h1 className="hero__titulo" id="hero-titulo">
          {titulo} <em>{destaque}</em>
        </h1>
        <p className="hero__sub">{subtitulo}</p>
        <a className="hero__btn" href={ctaHref}>
          {ctaTexto}
          <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
        </a>
      </div>

      <div className="hero__img hero__img--produtos">
        <img src={imagemProdutos} alt="Sérum, creme facial e batom da linha Ivone" loading="eager" />
      </div>
    </section>
  );
}