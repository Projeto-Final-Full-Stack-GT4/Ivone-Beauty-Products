import { Link } from 'react-router-dom';
import './Categories.css';
import imagemSkincare from '../assets/products/serum_facial.png';
import imagemMaquiagem from '../assets/products/po_compacto.jpeg';
import imagemCabelos from '../assets/hero-modelo.jpg';
import imagemKits from '../assets/hero-produtos.jpg';

const categories = [
    {
        id: 1,
        name: 'Skincare',
        category: 'skincare',
        description: 'Cuidado diário para uma pele incrível',
        image: imagemSkincare,
    },
   
    {
        id: 2, 
        name: 'Maquiagem',
        category: 'maquiagem',
        description: 'Beleza em destaque todos os dias',
        image: imagemMaquiagem,
    },

    {
        id: 3,
        name: 'Cabelos',
        category: 'cabelos',
        description: 'Força, brilho e vitalidade',
        image: imagemCabelos,
    },

    {
        id: 4,
        name: 'Kits especiais',
        category: 'kits',
        description: 'Presentes que encantam',
        image: imagemKits,
    }
]

function Categories() {
    return (
        <section className='categories-section'>
            <div className='categories-heading'>
                <div className='categories-heading-content'>
                    <span>Nossas Categorias</span>
                    <h2>Encontre o que combina com você</h2>
                </div>
            </div>

            <div className='categories-grid'>
            {categories.map((category) => 
            <Link
                className="category-card"
                key={category.id}
                to={`/products?categoria=${category.category}`}
                aria-label={`Ver produtos de ${category.name}`}
            >
            <img
                src={category.image}
                alt={`Produtos da categoria ${category.name}`}
                loading="lazy"
                decoding="async"
            />

            <div className='category-info'>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
            </div>

            </Link>
            )}
            </div>

        </section>
    );
}

export default Categories;