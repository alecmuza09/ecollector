import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from 'react-leaflet';
import L, { Layer, LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockProducts, Product } from '../data/mockProducts';
import { Filter, MapPin, Package, Search, CheckCircle, Layers, Info, Eye } from 'lucide-react';

// --- Constantes y Funciones de Utilidad --- //
const MONTERREY_CENTER: L.LatLngExpression = [25.6866, -100.3161];
const categoryColors: Record<Product['category'], string> = {
  'PET': '#3B82F6', 'Cartón': '#ca8a04', 'Vidrio': '#10B981', 
  'Metal': '#EF4444', 'Electrónicos': '#9333ea', 'Otros': '#6B7280' // Ajustar colores si es necesario
};
const CATEGORIES = ['Todos', ...Object.keys(categoryColors)] as const;

// Municipios del área metropolitana
const MUNICIPALITIES = [
    'Todos', 'Monterrey', 'San Nicolás de los Garza', 'San Pedro Garza García',
    'Guadalupe', 'Apodaca', 'Escobedo', 'Santa Catarina'
] as const;
type Municipality = typeof MUNICIPALITIES[number];

// --- PLACEHOLDER GeoJSON Data --- 
// ¡REEMPLAZAR CON DATOS GEOJSON REALES DE LOS MUNICIPIOS!
const geoJsonData: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    // Ejemplo Monterrey (Coordenadas FALSAS - solo un cuadrado pequeño)
    { type: 'Feature', properties: { name: 'Monterrey' }, geometry: { type: 'Polygon', coordinates: [[[-100.30, 25.67], [-100.32, 25.67], [-100.32, 25.69], [-100.30, 25.69], [-100.30, 25.67]]] } },
    // Ejemplo San Nicolás (Coordenadas FALSAS)
    { type: 'Feature', properties: { name: 'San Nicolás de los Garza' }, geometry: { type: 'Polygon', coordinates: [[[-100.28, 25.72], [-100.30, 25.72], [-100.30, 25.74], [-100.28, 25.74], [-100.28, 25.72]]] } },
     // Ejemplo San Pedro (Coordenadas FALSAS)
    { type: 'Feature', properties: { name: 'San Pedro Garza García' }, geometry: { type: 'Polygon', coordinates: [[[-100.35, 25.65], [-100.37, 25.65], [-100.37, 25.67], [-100.35, 25.67], [-100.35, 25.65]]] } },
    // Añadir placeholders similares para Guadalupe, Apodaca, Escobedo, Santa Catarina
     { type: 'Feature', properties: { name: 'Guadalupe' }, geometry: { type: 'Polygon', coordinates: [[[-100.23, 25.69], [-100.25, 25.69], [-100.25, 25.71], [-100.23, 25.71], [-100.23, 25.69]]] } },
     { type: 'Feature', properties: { name: 'Apodaca' }, geometry: { type: 'Polygon', coordinates: [[[-100.18, 25.77], [-100.20, 25.77], [-100.20, 25.79], [-100.18, 25.79], [-100.18, 25.77]]] } },
     { type: 'Feature', properties: { name: 'Escobedo' }, geometry: { type: 'Polygon', coordinates: [[[-100.31, 25.79], [-100.33, 25.79], [-100.33, 25.81], [-100.31, 25.81], [-100.31, 25.79]]] } },
     { type: 'Feature', properties: { name: 'Santa Catarina' }, geometry: { type: 'Polygon', coordinates: [[[-100.44, 25.66], [-100.46, 25.66], [-100.46, 25.68], [-100.44, 25.68], [-100.44, 25.66]]] } },
  ]
};
// --- Fin Placeholders GeoJSON ---

const createCustomIcon = (color: string, isHovered: boolean) => {
  const scale = isHovered ? 1.3 : 1; // Ajustar escala si se desea
  const shadow = isHovered ? 'drop-shadow(0 0 4px rgba(0,0,0,0.6))' : 'drop-shadow(0 1px 1px rgba(0,0,0,0.4))';
  return L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" style="width:${20*scale}px; height:${20*scale}px; filter:${shadow}; transition: all 0.2s ease;"><path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>`,
    className: 'custom-leaflet-icon-small', // Clase diferente para posible tamaño distinto
    iconSize: [20 * scale, 20 * scale],
    iconAnchor: [10 * scale, 20 * scale],
    popupAnchor: [0, -20 * scale]
  });
};

const formatPrice = (price: number, currency: string, type: Product['type']) => {
    if (type === 'donacion' || price === 0) {
        return <span className="text-green-600 font-semibold">Gratis</span>;
    }
    // Forzar MXN ya que los datos son de MTY
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price);
};

// --- Componente Tarjeta de Producto (Sin cambios importantes) --- //
const ProductCard = ({ product, isHovered, onHover }: { 
    product: Product; 
    isHovered: boolean;
    onHover: (id: string | null) => void;
}) => {
    const categoryColor = categoryColors[product.category] || '#6B7280';
    const priceDisplay = formatPrice(product.price, product.currency, product.type);

    return (
        <Link 
            to={`/listado/${product.id}`} 
            className={`bg-white rounded-lg shadow overflow-hidden group transition-all duration-200 ease-in-out hover:shadow-xl flex flex-col ${isHovered ? 'ring-2 ring-emerald-400' : 'border border-gray-100'}`}
            onMouseEnter={() => onHover(product.id)}
            onMouseLeave={() => onHover(null)}
        >
             <div className="relative">
                <img src={product.imageUrl} alt={product.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: categoryColor + '20', color: categoryColor }}>{product.category}</span>
                {product.verified && (
                    <span className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1"><CheckCircle size={12}/> Verificado</span>
                )}
            </div>
            <div className="p-3 flex flex-col flex-grow">
                <h3 className="font-semibold text-base text-gray-800 mb-1 group-hover:text-emerald-600 truncate" title={product.title}>{product.title}</h3>
                <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />{product.location} {/* Usar location que es más descriptivo */} 
                </div>
                <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
                    <span className="text-base font-bold text-emerald-700">{priceDisplay}</span>
                    <span className="text-xs text-gray-500 uppercase font-medium">{product.type === 'donacion' ? 'Donación' : 'Venta'}</span>
                </div>
                 <div className="mt-2">
                     <span className="block w-full text-center bg-gray-100 text-gray-700 py-1.5 rounded text-xs font-medium group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">Ver detalles</span>
                </div>
            </div>
        </Link>
    );
};

// --- Componente Mapa con Ajuste de Vista y GeoJSON --- //
function MapViewUpdater({ markers, hoveredMarkerId, setMapInstance, selectedCity }: { 
    markers: Product[]; 
    hoveredMarkerId: string | null; 
    setMapInstance: React.Dispatch<React.SetStateAction<L.Map | null>>;
    selectedCity: Municipality;
}) {
    const map = useMap();
    
    // Llamar a setMapInstance solo una vez cuando el mapa esté disponible
    useEffect(() => { 
        if (map) { 
            setMapInstance(map); 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [map]); // Quitar setMapInstance de las dependencias para evitar bucles

    // Ajustar bounds
    useEffect(() => {
        // Asegurarse de que map esté definido antes de usarlo
        if (!map) return; 
        
        if (markers.length > 0) {
            try {
                const bounds = L.latLngBounds(markers.map(m => [m.latitude, m.longitude]));
                if (bounds.isValid()) {
                    map.fitBounds(bounds.pad(0.1), { animate: true, maxZoom: 15 });
                } else {
                    map.setView(MONTERREY_CENTER, 11, { animate: true });
                }
            } catch (error) {
                console.error("Error ajustando bounds:", error);
                map.setView(MONTERREY_CENTER, 11, { animate: true });
            }
        } else {
             // Si no hay marcadores pero hay ciudad seleccionada, intentar hacer zoom a la ciudad
            if (selectedCity !== 'Todos' && map.eachLayer) {
                 let cityFound = false;
                 map.eachLayer(layer => {
                     // Asumimos que las capas GeoJSON tienen la propiedad feature y getBounds
                     const feature = (layer as any).feature;
                     // Comprobar si es una capa con feature, nombre coincide y tiene getBounds
                     if (feature && feature.properties && feature.properties.name === selectedCity && typeof (layer as any).getBounds === 'function') {
                         // Usar aserción de tipo para getBounds
                         map.fitBounds((layer as L.FeatureGroup).getBounds().pad(0.1), { animate: true });
                         cityFound = true;
                     }
                 });
                 if (!cityFound) map.setView(MONTERREY_CENTER, 11, { animate: true });
            } else {
                 map.setView(MONTERREY_CENTER, 11, { animate: true });
            }
        }
    }, [markers, map, selectedCity]); 

    return null;
}

// --- Componente Leyenda --- //
const Legend = () => (
    <div className="absolute bottom-2 right-2 z-[1000] bg-white p-3 rounded-lg shadow-lg border border-gray-200 text-xs">
        <h4 className="font-semibold mb-2 text-center">Categorías</h4>
        <ul className="space-y-1">
            {Object.entries(categoryColors).map(([category, color]) => (
                <li key={category} className="flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></span>
                    {category}
                </li>
            ))}
        </ul>
    </div>
);

// --- Componente Principal Home --- //
const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedCity, setSelectedCity] = useState<Municipality>('Todos'); // Estado para ciudad seleccionada
    const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null); 
    const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
    const [hoveredCity, setHoveredCity] = useState<string | null>(null); // Estado para ciudad en hover

    // Filtrar productos basado en categoría, ciudad y búsqueda
    const filteredListings = useMemo(() => {
        let processedListings = [...mockProducts];

        if (selectedCategory !== 'Todos') {
            processedListings = processedListings.filter(p => p.category === selectedCategory);
        }
        if (selectedCity !== 'Todos') {
            processedListings = processedListings.filter(p => p.municipality === selectedCity);
        }
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            processedListings = processedListings.filter(p => 
                p.title.toLowerCase().includes(lowerSearch) ||
                p.location.toLowerCase().includes(lowerSearch) ||
                p.address.toLowerCase().includes(lowerSearch) ||
                p.tags.some(tag => tag.toLowerCase().includes(lowerSearch))
            );
        }
        return processedListings;
    }, [selectedCategory, selectedCity, searchTerm]);
    
    const handleCardHover = (productId: string | null) => {
        setHoveredMarkerId(productId);
    };

    // --- Funciones para GeoJSON --- //
    const geoJsonStyle = (feature?: GeoJSON.Feature): L.PathOptions => {
        const isHovered = feature?.properties?.name === hoveredCity;
        const isSelected = feature?.properties?.name === selectedCity;
        return {
            fillColor: isSelected ? '#a7f3d0' : isHovered ? '#d1fae5' : '#e5e7eb',
            weight: isSelected ? 2 : 1,
            opacity: 1,
            color: isSelected ? '#059669' : isHovered ? '#10b981' : '#9ca3af',
            fillOpacity: isHovered || isSelected ? 0.6 : 0.3
        };
    };

    const onEachFeature = (feature: GeoJSON.Feature, layer: Layer) => {
        if (feature.properties && feature.properties.name) {
            const cityName = feature.properties.name as Municipality;
            layer.bindTooltip(cityName, { sticky: true, direction: 'top', opacity: 0.8 });
            
            layer.on({
                mouseover: (e: LeafletMouseEvent) => {
                    setHoveredCity(cityName);
                    const targetLayer = e.target as L.Path;
                    if (targetLayer.setStyle) targetLayer.setStyle({ weight: 2 }); // Resaltar borde en hover
                    // L.DomUtil.addClass(targetLayer._path, 'geojson-hover');
                },
                mouseout: (e: LeafletMouseEvent) => {
                    setHoveredCity(null);
                    const targetLayer = e.target as L.Path;
                     // Resetear estilo usando GeoJSON component (que re-evalúa geoJsonStyle)
                     // OJO: Esto podría no ser suficiente si el estilo base no se reaplica solo.
                     // Una forma más robusta sería guardar la instancia de GeoJSON y usar resetStyle(layer).
                    if (targetLayer.setStyle && feature.properties?.name !== selectedCity) { 
                        targetLayer.setStyle({ weight: 1 }); 
                    }
                    // L.DomUtil.removeClass(targetLayer._path, 'geojson-hover');
                },
                click: () => {
                    setSelectedCity(cityName);
                    // Asegurar que la capa tiene getBounds antes de llamarlo
                    if (typeof (layer as any).getBounds === 'function') {
                        mapInstance?.fitBounds((layer as L.FeatureGroup).getBounds().pad(0.1), { animate: true });
                    } else {
                         console.warn('La capa clickeada no tiene getBounds');
                         mapInstance?.setView(MONTERREY_CENTER, 12, {animate: true}); // Fallback
                    }
                }
            });
        }
    };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Barra Superior: Búsqueda y Filtros */}
      <div className="bg-white rounded-lg shadow-sm p-3 md:p-4 mb-6 sticky top-2 z-20 border border-gray-100">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-center">
          {/* Búsqueda */}
          <div className="flex-grow relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar producto, dirección..."
              className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
          {/* Filtro Ciudad */} 
          <div className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 w-full sm:w-auto">
                 <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                 <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value as Municipality)}
                    className="bg-transparent text-sm focus:outline-none appearance-none w-full"
                 >
                    {MUNICIPALITIES.map(city => (
                        <option key={city} value={city}>{city === 'Todos' ? 'Toda el Área Metro.' : city}</option>
                    ))}
                 </select>
             </div>
           {/* Filtro Categoría */} 
           <div className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 w-full sm:w-auto">
                 <Filter className="h-4 w-4 text-gray-500 flex-shrink-0" />
                 <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-transparent text-sm focus:outline-none appearance-none w-full"
                 >
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                 </select>
             </div>
        </div>
      </div>

       {/* Sección Principal: Mapa */}
       <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mapa de Recolección - Área Metropolitana</h2>
            <div className="h-[50vh] md:h-[60vh] w-full rounded-lg overflow-hidden shadow-md border border-gray-200 relative">
                <MapContainer 
                    center={MONTERREY_CENTER}
                    zoom={11} 
                    scrollWheelZoom={true} 
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <GeoJSON 
                        key={selectedCity + hoveredCity} 
                        data={geoJsonData} 
                        style={geoJsonStyle} 
                        onEachFeature={onEachFeature} 
                    />
                    {filteredListings.map((product) => {
                        if (isNaN(product.latitude) || isNaN(product.longitude)) return null;
                        const isHovered = hoveredMarkerId === product.id;
                        const icon = createCustomIcon(categoryColors[product.category] || '#6B7280', isHovered);
                        
                        return (
                            <Marker
                                key={product.id}
                                position={[product.latitude, product.longitude]}
                                icon={icon}
                                zIndexOffset={isHovered ? 1000 : 0}
                                eventHandlers={{
                                    mouseover: () => setHoveredMarkerId(product.id),
                                    mouseout: () => setHoveredMarkerId(null),
                                }}
                            >
                                <Popup minWidth={250}>
                                     <div className="text-xs space-y-1">
                                        <img src={product.imageUrl} alt={product.title} className="w-full h-20 object-cover rounded mb-1"/>
                                        <h3 className="font-semibold text-sm mb-0.5">{product.title}</h3>
                                        <p className="text-emerald-700 font-medium">{formatPrice(product.price, product.currency, product.type)}</p>
                                        <p className="text-gray-600">Cat: <span className="font-medium" style={{ color: categoryColors[product.category] }}>{product.category}</span></p>
                                        <p className="text-gray-500 flex items-start gap-1">
                                            <MapPin size={12} className="mt-0.5 flex-shrink-0"/> 
                                            {product.address}
                                        </p>
                                        <Link to={`/listado/${product.id}`} className="text-emerald-600 hover:underline font-medium block text-center pt-1 border-t border-gray-100 mt-2">
                                            Ver detalles
                                        </Link>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                    <Legend />
                    <MapViewUpdater markers={filteredListings} hoveredMarkerId={hoveredMarkerId} setMapInstance={setMapInstance} selectedCity={selectedCity} /> 
                </MapContainer>
            </div>
       </div>

      {/* Grid de Tarjetas de Producto */}
       <div>
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h2 className="text-2xl font-semibold text-gray-800 whitespace-nowrap">Listados en el Área</h2>
                 <span className="text-sm text-gray-500 flex-shrink-0">{filteredListings.length} resultados {selectedCity !== 'Todos' ? `en ${selectedCity}` : 'totales'}</span>
           </div>
            
           {filteredListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredListings.map((product) => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            isHovered={hoveredMarkerId === product.id}
                            onHover={handleCardHover}
                        />
                    ))}
                </div>
           ) : (
                <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg">
                    <Search size={32} className="mx-auto mb-2"/>
                    No se encontraron listados con los filtros actuales.
                </div>
           )}
       </div>
    </div>
  );
};

export default Home;