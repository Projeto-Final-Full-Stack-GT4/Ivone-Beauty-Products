import { Link } from 'react-router-dom';
import './About.css';

const valores = [
  {
    titulo: 'Beleza com propósito',
    descricao: 'Acreditamos que cuidar de si é um gesto de carinho, não uma obrigação.',
  },
  {
    titulo: 'Escolhas conscientes',
    descricao: 'Buscamos reunir produtos que combinem qualidade, cuidado e praticidade.',
  },
  {
    titulo: 'Para cada momento',
    descricao: 'Nossa seleção acompanha diferentes rotinas, estilos e formas de expressão.',
  },
];

export default function About() {
  return (
    <article className="about-page">
      <header className="about-hero">
        <p className="about-eyebrow">Nossa história</p>
        <h1>Beleza é se sentir bem na própria pele.</h1>
        <p className="about-hero__text">
          A Ivone Beauty Product nasceu para tornar o autocuidado mais leve,
          acessível e cheio de significado.
        </p>
      </header>

      <section className="about-story" aria-labelledby="about-story-title">
        <div className="about-story__mark" aria-hidden="true">IV</div>
        <div className="about-story__content">
          <p className="about-eyebrow">Como tudo começou</p>
          <h2 id="about-story-title">Um projeto feito para celebrar você</h2>
          <p>
            Nossa história começa com uma ideia simples: criar um espaço onde
            encontrar produtos de beleza fosse também um convite para reservar
            um momento para si. Inspirada pela alegria de compartilhar dicas e
            descobertas, Ivone imaginou uma loja acolhedora, com opções para
            diferentes necessidades e estilos.
          </p>
          <p>
            Assim surgiu a Ivone Beauty Product, um projeto fictício que reúne
            skincare, maquiagem, cuidados para os cabelos e kits especiais em
            uma experiência online prática e inspiradora. Mais do que seguir
            tendências, queremos ajudar cada pessoa a construir uma rotina que
            faça sentido para ela.
          </p>
        </div>
      </section>

      <section className="about-values" aria-labelledby="about-values-title">
        <p className="about-eyebrow">O que nos inspira</p>
        <h2 id="about-values-title">Nossos valores</h2>
        <div className="about-values__grid">
          {valores.map(({ titulo, descricao }, index) => (
            <article className="about-value" key={titulo}>
              <span className="about-value__number">0{index + 1}</span>
              <h3>{titulo}</h3>
              <p>{descricao}</p>
            </article>
          ))}
        </div>
      </section>

      <aside className="about-cta">
        <h2>Seu próximo ritual de cuidado começa aqui.</h2>
        <p>Explore nossa seleção e encontre algo que combine com você.</p>
        <Link to="/products" className="about-cta__link">Conheça os produtos</Link>
      </aside>
    </article>
  );
}
