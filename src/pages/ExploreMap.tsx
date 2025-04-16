import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockProducts, Product } from '../data/mockProducts';
import { Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

// Coordenadas aproximadas del centro del Área Metropolitana de Monterrey
const MONTERREY_CENTER: L.LatLngExpression = [25.6866, -100.3161];

// Mapeo de categorías a colores
const categoryColors: Record<Product['category'], string> = {
  'PET': '#3B82F6', // Azul
  'Cartón': '#ca8a04', // Ocre
  'Vidrio': '#10B981', // Verde
  'Metal': '#EF4444', // Rojo
  'Electrónicos': '#6B7280', // Gris
  'Otros': '#A855F7' // Púrpura
};
const CATEGORIES = ['Todos', ...Object.keys(categoryColors)] as const;

// Función para crear iconos de marcador personalizados SVG
const createCustomIcon = (color: string) => {
  return L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" class="w-6 h-6 drop-shadow-md"><path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>`,
    className: 'custom-leaflet-icon', // No añadir clases extra que puedan interferir
    iconSize: [24, 24],
    iconAnchor: [12, 24], // Punta inferior del icono
    popupAnchor: [0, -24] // Popup encima del icono
  });
};

// Componente para ajustar límites del mapa
function ChangeView({ markers }: { markers: Product[] }) {
  const map = useMap();
  useEffect(() => {
    if (markers.length > 0) {
      try {
        const bounds = L.latLngBounds(markers.map(m => [m.latitude, m.longitude]));
        if (bounds.isValid()) {
            map.fitBounds(bounds.pad(0.1));
        } else {
             console.warn("Bounds no válidas generadas para los marcadores");
             map.setView(MONTERREY_CENTER, 12);
        }
      } catch (error) {
          console.error("Error calculando o ajustando bounds:", error);
          map.setView(MONTERREY_CENTER, 12);
      }
    } else {
      map.setView(MONTERREY_CENTER, 12); // Centrar si no hay marcadores
    }
  }, [markers, map]); // Re-run when markers change
  return null;
}

const ExploreMapLeaflet = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Todos') {
      return mockProducts;
    }
    // Asegurar que el filtrado no falle si alguna categoría no está en categoryColors (aunque no debería pasar)
    return mockProducts.filter(p => p.category === selectedCategory && categoryColors[p.category]);
  }, [selectedCategory]);

  const formatPrice = (price: number, currency: string) => {
      return new Intl.NumberFormat('es-ES', { style: 'currency', currency: currency }).format(price);
  };

  return (
    // Altura fija relativa a la ventana menos la altura estimada del Navbar (ajustar si es necesario)
    <div className="relative h-[calc(100vh-64px)] w-full">
      {/* Panel de Filtros */}
      <div className="absolute top-3 left-3 z-[1000] bg-white p-2 rounded-lg shadow-lg flex items-center gap-2 border border-gray-300">
         <Filter className="h-5 w-5 text-gray-600 flex-shrink-0"/>
         <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border-none rounded text-sm focus:outline-none focus:ring-0 appearance-none pr-5" // Estilo simple
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {/* Añadir flecha para el select si se desea */} 
      </div>

      <MapContainer
          center={MONTERREY_CENTER}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
          className="z-0" // Asegurar que el mapa esté detrás de los controles
       >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredProducts.map((product) => {
            // Verificar que la categoría existe y tiene color antes de intentar crear el icono
            if (!categoryColors[product.category]) return null;

            const iconColor = categoryColors[product.category];
            const customIcon = createCustomIcon(iconColor);
            
            // Verificar que la posición sea válida
            if (isNaN(product.latitude) || isNaN(product.longitude)) {
                console.warn(`Posición inválida para producto ${product.id}:`, product.latitude, product.longitude);
                return null;
            }

            return (
                <Marker
                    key={product.id}
                    position={[product.latitude, product.longitude]}
                    icon={customIcon}
                >
                    <Popup minWidth={220}>
                        <div className="text-sm">
                           <img src={product.imageUrl} alt={product.title} className="w-full h-24 object-cover rounded mb-2"/>
                           <h3 className="font-semibold text-base mb-1">{product.title}</h3>
                           <p className="text-emerald-600 font-medium mb-1">{formatPrice(product.price, product.currency)}</p>
                           <p className="text-gray-600 mb-1">Categoría: <span className="font-medium" style={{ color: iconColor }}>{product.category}</span></p>
                           <p className="text-gray-500 text-xs mb-2">Ubicación: {product.location}</p>
                           <Link to={`/listado/${product.id}`} className="text-emerald-600 hover:underline text-xs font-medium block text-center mt-1">
                               Ver detalles
                           </Link>
                        </div>
                    </Popup>
                </Marker>
            );
        })}

        {/* Ajustar vista basado en marcadores filtrados */} 
        <ChangeView markers={filteredProducts} /> 

      </MapContainer>
    </div>
  );
};

export default ExploreMapLeaflet; 