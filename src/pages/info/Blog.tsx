import React from 'react';
import { Link } from 'react-router-dom'; // Para enlaces a artículos individuales

// Datos de ejemplo para artículos del blog
const blogPosts = [
  {
    id: 'blog-1',
    title: '5 Tips para mejorar la separación de residuos en casa',
    excerpt: 'Descubre cómo optimizar tu proceso de reciclaje doméstico con estos sencillos consejos...',
    category: 'Reciclaje',
    date: '10 Julio, 2024',
    imageUrl: 'https://via.placeholder.com/400x250.png?text=Separación+Residuos'
  },
  {
    id: 'blog-2',
    title: 'La Economía Circular: Más allá del reciclaje',
    excerpt: 'Entiende qué es la economía circular y cómo e-colector contribuye a este modelo sostenible...',
    category: 'Economía Circular',
    date: '5 Julio, 2024',
    imageUrl: 'https://via.placeholder.com/400x250.png?text=Economía+Circular'
  },
  {
    id: 'blog-3',
    title: 'Historia de Éxito: Recicladora transforma PET en filamento 3D',
    excerpt: 'Conoce cómo una de nuestras usuarias está innovando gracias a los materiales obtenidos en la plataforma...',
    category: 'Historias de Éxito',
    date: '1 Julio, 2024',
    imageUrl: 'https://via.placeholder.com/400x250.png?text=Historia+Éxito'
  },
  // Añadir más posts...
];

const Blog = () => {
  // TODO: Implementar filtrado por categoría
  const categories = ['Todos', 'Reciclaje', 'Economía Circular', 'Historias de Éxito', 'Noticias'];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Blog e-colector</h1>

      {/* Filtros de Categoría (Opcional) */}
      <div className="mb-8 flex justify-center flex-wrap gap-2">
        {categories.map(category => (
          <button 
            key={category} 
            // onClick={() => setActiveCategory(category)} // Lógica de filtrado
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${ 
              category === 'Todos' // Simular categoría activa
                ? 'bg-emerald-600 text-white border-emerald-600' 
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid de Artículos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map(post => (
          <Link to={`/blog/${post.id}`} key={post.id} className="bg-white rounded-lg shadow overflow-hidden group transition hover:shadow-lg flex flex-col">
            <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-5 flex flex-col flex-grow">
              <span className="text-xs font-semibold text-emerald-600 uppercase mb-1">{post.category}</span>
              <h2 className="font-semibold text-xl text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors flex-grow">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
              <div className="mt-auto border-t border-gray-100 pt-3 flex justify-between items-center">
                 <span className="text-xs text-gray-500">{post.date}</span>
                 <span className="text-sm font-medium text-emerald-600 group-hover:underline">Leer más →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
       {/* TODO: Añadir paginación si hay muchos artículos */} 
    </div>
  );
};

export default Blog; 