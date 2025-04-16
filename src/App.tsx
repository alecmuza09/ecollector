import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ListingDetail from './pages/ListingDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
// Importar páginas informativas
import About from './pages/info/About';
import Blog from './pages/info/Blog';
import Pricing from './pages/info/Pricing';
import Contact from './pages/info/Contact';
// Importar páginas de recursos
import Guides from './pages/resources/Guides';
import HelpCenter from './pages/resources/HelpCenter';
// Importar páginas legales
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';
// Importar página de Mapa (placeholder por ahora)
// const ExploreMapPlaceholder = () => <div className="container mx-auto px-4 py-12"><h1 className="text-3xl font-bold">Mapa Interactivo (Próximamente)</h1><p>Aquí se implementará el mapa interactivo con Leaflet/Mapbox...</p></div>; 
import ExploreMap from './pages/ExploreMap'; // Importar el componente real del mapa
// Importar página de Publicar Anuncio
import PublishListing from './pages/PublishListing';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow"> 
          <Routes>
            {/* Rutas Principales */}
            <Route path="/" element={<Home />} />
            <Route path="/listado/:id" element={<ListingDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/perfil" element={<Profile />} />
            {/* Usar el componente real ExploreMap */}
            <Route path="/explorar" element={<ExploreMap />} /> 
            <Route path="/publicar" element={<PublishListing />} />
            {/* TODO: Añadir ruta para artículo de blog individual /blog/:postId */} 
            {/* TODO: Añadir ruta para guía individual /recursos/guias/:guideId */} 

            {/* Rutas Informativas */}
            <Route path="/acerca-de" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/precios" element={<Pricing />} />
            <Route path="/contacto" element={<Contact />} />

            {/* Rutas de Recursos */}
            <Route path="/recursos/guias" element={<Guides />} />
            <Route path="/recursos/centro-ayuda" element={<HelpCenter />} />

            {/* Rutas Legales */}
            <Route path="/legal/privacidad" element={<PrivacyPolicy />} />
            <Route path="/legal/terminos" element={<TermsOfService />} />
            
            {/* TODO: Añadir ruta 404 Not Found */} 
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;