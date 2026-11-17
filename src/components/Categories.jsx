import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../services/api.js';
import './Categories.css';
import imagemSkincare from '../assets/products/serum_facial.png';
import imagemMaquiagem from '../assets/products/po_compacto.jpeg';
import imagemCabelos from '../assets/hero-modelo.jpg';
import imagemKits from '../assets/hero-produtos.jpg';

const CATEGORY_IMAGES = {
  skincare: imagemSkincare,
  maquiagem: imagemMaquiagem,
  cabelos: imagemCabelos,
  kits: imagemKits,
};

function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchCategories({ useInMenu: true })
      .then((result) => {
        if (active) setCategories(result);
      })
      .catch((loadError) => {
        console.error('Não foi possível carregar as categorias.', loadError);
        if (active) setError('Não foi possível carregar as categorias.');
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="categories-section">
      <div className="categories-heading">
        <div className="categories-heading-content">
          <span>Nossas Categorias</span>
          <h2>Encontre o que combina com você</h2>
        </div>
      </div>

      {isLoading ? (
        <p className="categories-feedback">Carregando categorias...</p>
      ) : error ? (
        <p className="categories-feedback" role="alert">{error}</p>
      ) : categories.length === 0 ? (
        <p className="categories-feedback">Nenhuma categoria disponível.</p>
      ) : (
        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              className="category-card"
              key={category.id}
              to={`/products?categoriaId=${category.id}`}
              aria-label={`Ver produtos de ${category.nome}`}
            >
              <img
                src={CATEGORY_IMAGES[category.slug] || imagemKits}
                alt={`Produtos da categoria ${category.nome}`}
                loading="lazy"
                decoding="async"
              />
              <div className="category-info">
                <h3>{category.nome}</h3>
                {category.descricao && <p>{category.descricao}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default Categories;
