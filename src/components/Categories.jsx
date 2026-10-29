import './Categories.css';

const categories = [
    {
        id: 1,
        name: 'Skincare',
        description: 'Cuidado diário para uma pele incrível',
        image: '',
    },
   
    {
        id: 2, 
        name: 'Maquiagem',
        description: 'Beleza em destaque todos os dias',
        image: '',
    },

    {
        id: 3,
        name: 'Cabelos',
        description: 'Força, brilho e vitalidade',
        image: '',
    },

    {
        id: 4,
        name: 'Kits especiais',
        description: 'Presentes que encantam',
        image: '',
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
            <article className="category-card" key={category.id}>
            <img src={category.image} alt={category.name} />

            <div className='category-info'>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
            </div>

            </article>
            )}
            </div>

        </section>
    );
}

export default Categories;