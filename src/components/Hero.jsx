import { useEffect, useState } from 'react';
import skincareBanner from '../assets/banners/ivone_beauty_banner_1_skincare.png';
import makeupBanner from '../assets/banners/ivone_beauty_banner_2_maquiagem.png';
import offersBanner from '../assets/banners/ivone_beauty_banner_3_ofertas.png';
import './Hero.css';

const banners = [
  {
    image: offersBanner,
    descrição: 'Ivone Beauty: ofertas especiais para você se cuidar',
    título: 'Confira as ofertas especiais',
  },
  {
    image: makeupBanner,
    descrição: 'Ivone Beauty: beleza que realça o seu brilho',
    título: 'Conheça a coleção de maquiagem',
  },
  {
    image: skincareBanner,
    descrição: 'Ivone Beauty: sua pele em equilíbrio natural',
    título: 'Conheça a coleção de skincare',
  },
];

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % banners.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  function showPreviousBanner() {
    setActiveIndex((currentIndex) => (currentIndex - 1 + banners.length) % banners.length);
  }

  function showNextBanner() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % banners.length);
  }

  return (
    <section
      className="campaigns"
      aria-label="Campanhas em destaque"
      aria-roledescription="carrossel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="campaigns__viewport">
        <div
          className="campaigns__track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <a
              className="campaign"
              href="#produtos"
              aria-label={banner.label}
              aria-hidden={index !== activeIndex}
              tabIndex={index === activeIndex ? 0 : -1}
              key={banner.image}
            >
              <img src={banner.image} alt={banner.alt} />
            </a>
          ))}
        </div>
      </div>

      <div className="campaigns__controls" aria-label="Controles do carrossel">
        <button type="button" onClick={showPreviousBanner} aria-label="Banner anterior">
          &#8592;
        </button>
        <div className="campaigns__indicators">
          {banners.map((banner, index) => (
            <button
              type="button"
              className={index === activeIndex ? 'is-active' : ''}
              aria-label={`Mostrar banner ${index + 1}: ${banner.label}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => setActiveIndex(index)}
              key={banner.image}
            />
          ))}
        </div>
        <button type="button" onClick={showNextBanner} aria-label="Próximo banner">
          &#8594;
        </button>
      </div>
    </section>
  );
}

export default Hero;