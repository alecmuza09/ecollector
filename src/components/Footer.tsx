import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Empresa</h3>
            <ul className="space-y-3">
              <li><Link to="/acerca-de" className="text-base text-gray-500 hover:text-gray-900">Acerca de</Link></li>
              <li><Link to="/blog" className="text-base text-gray-500 hover:text-gray-900">Blog</Link></li>
              <li><Link to="/precios" className="text-base text-gray-500 hover:text-gray-900">Precios</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Recursos</h3>
            <ul className="space-y-3">
              <li><Link to="/recursos/guias" className="text-base text-gray-500 hover:text-gray-900">Guías</Link></li>
              <li><Link to="/recursos/centro-ayuda" className="text-base text-gray-500 hover:text-gray-900">Centro de ayuda</Link></li>
              <li><Link to="/contacto" className="text-base text-gray-500 hover:text-gray-900">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/legal/privacidad" className="text-base text-gray-500 hover:text-gray-900">Privacidad</Link></li>
              <li><Link to="/legal/terminos" className="text-base text-gray-500 hover:text-gray-900">Términos</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Plataforma</h3>
            <ul className="space-y-3">
              <li><Link to="/explorar" className="text-base text-gray-500 hover:text-gray-900">Explorar Mapa</Link></li>
              <li><Link to="/publicar" className="text-base text-gray-500 hover:text-gray-900">Publicar Material</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Síguenos</h3>
            <div className="flex space-x-5">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-600">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-600">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-600">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-600">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-200 text-center text-base text-gray-500">
          <p>&copy; {new Date().getFullYear()} e-colector. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;