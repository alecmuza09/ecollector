import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Download, ArrowRight } from 'lucide-react';

// Datos de ejemplo para guías
const guides = [
  {
    id: 'guide-1',
    title: 'Guía para Vendedores: Cómo crear tu primera publicación',
    description: 'Un tutorial paso a paso para publicar tus materiales reciclables en e-colector.',
    type: 'Tutorial',
    icon: BookOpen,
    link: '/recursos/guias/vendedores-101' // Enlace a la guía detallada
  },
  {
    id: 'guide-2',
    title: 'Mejores Prácticas para la Clasificación de Plásticos',
    description: 'Aprende a identificar y separar correctamente los diferentes tipos de plástico para maximizar su valor.',
    type: 'Mejores Prácticas',
    icon: BookOpen,
    link: '/recursos/guias/clasificacion-plasticos'
  },
    {
    id: 'guide-3',
    title: 'Checklist de Preparación de Materiales (Descargable)',
    description: 'Una lista de verificación útil para asegurar que tus materiales cumplen con los estándares de calidad.',
    type: 'Recurso Descargable',
    icon: Download,
    downloadUrl: '/docs/checklist-preparacion.pdf' // Enlace al archivo PDF
  },
   // Añadir más guías...
];

const Guides = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Guías y Recursos</h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl mx-auto">
        Encuentra tutoriales, mejores prácticas y documentos útiles para sacar el máximo provecho de e-colector y optimizar tus procesos de reciclaje.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map(guide => (
          <div key={guide.id} className="bg-white rounded-lg shadow p-6 flex flex-col">
            <div className="flex items-center mb-3">
                <guide.icon className="h-8 w-8 text-emerald-600 mr-3 flex-shrink-0" />
                <div>
                    <span className="text-xs font-semibold text-emerald-700 uppercase">{guide.type}</span>
                    <h2 className="font-semibold text-lg text-gray-800">{guide.title}</h2>
                </div>
            </div>
            <p className="text-gray-600 text-sm mb-5 flex-grow">{guide.description}</p>
            {
              guide.downloadUrl ? (
                 <a href={guide.downloadUrl} download target="_blank" rel="noopener noreferrer"
                   className="mt-auto inline-flex items-center justify-center gap-2 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition font-medium">
                   <Download className="h-4 w-4"/> Descargar Recurso
                 </a>
              ) : guide.link ? (
                 <Link to={guide.link}
                   className="mt-auto inline-flex items-center justify-center gap-2 bg-white text-emerald-600 border border-emerald-600 py-2 px-4 rounded-lg hover:bg-emerald-50 transition font-medium">
                   Leer Guía <ArrowRight className="h-4 w-4"/>
                 </Link>
              ) : null
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guides; 