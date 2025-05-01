import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// Eliminar importaciones estáticas de páginas que serán cargadas con lazy
// import Home from './pages/Home';
// import ListingDetail from './pages/ListingDetail';
// import Login from './pages/Login';
// ... (eliminar el resto)

// Importar componentes de página dinámicamente
const Home = lazy(() => import('./pages/Home'));
const ListingDetail = lazy(() => import('./pages/ListingDetail'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const About = lazy(() => import('./pages/info/About'));
const Blog = lazy(() => import('./pages/info/Blog'));
const BlogPostPage = lazy(() => import('./pages/info/BlogPostPage'));
const Pricing = lazy(() => import('./pages/info/Pricing'));
const Contact = lazy(() => import('./pages/info/Contact'));
const Guides = lazy(() => import('./pages/resources/Guides'));
const GuideDetailPage = lazy(() => import('./pages/resources/GuideDetailPage'));
const HelpCenter = lazy(() => import('./pages/resources/HelpCenter'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/legal/TermsOfService'));
const ExploreMap = lazy(() => import('./pages/ExploreMap'));
const PublishListing = lazy(() => import('./pages/PublishListing'));
const SolicitudDetail = lazy(() => import('./pages/details/SolicitudDetail'));
const OfertaDetail = lazy(() => import('./pages/details/OfertaDetail'));
const RecolectorProfile = lazy(() => import('./pages/profile/RecolectorProfile'));

// Componente simple de carga
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-[calc(100vh-128px)]">
    <p className="text-gray-500 text-lg">Cargando...</p>
    {/* Podrías añadir un spinner aquí */}
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow"> 
           {/* Envolver Routes con Suspense */}
          <Suspense fallback={<LoadingFallback />}>
             <Routes>
                {/* Rutas Principales */}
                <Route path="/" element={<Home />} />
                <Route path="/listado/:id" element={<ListingDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                
                {/* Rutas Protegidas (requieren login) */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/publicar" element={<PublishListing />} />
                
                {/* Rutas de Detalles */}
                <Route path="/solicitud/:id" element={<SolicitudDetail />} />
                <Route path="/oferta/:id" element={<OfertaDetail />} />
                <Route path="/recolector/:id" element={<RecolectorProfile />} /> 

                {/* Rutas Públicas */}
                <Route path="/explorar" element={<ExploreMap />} /> 
                <Route path="/acerca-de" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:postId" element={<BlogPostPage />} />
                <Route path="/precios" element={<Pricing />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/recursos/guias" element={<Guides />} />
                <Route path="/recursos/guias/:guideId" element={<GuideDetailPage />} />
                <Route path="/recursos/centro-ayuda" element={<HelpCenter />} />
                <Route path="/legal/privacidad" element={<PrivacyPolicy />} />
                <Route path="/legal/terminos" element={<TermsOfService />} />
                
                {/* TODO: Añadir ruta 404 Not Found */} 
             </Routes>
           </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;