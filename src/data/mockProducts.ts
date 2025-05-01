export interface Product {
  id: string;
  title: string;
  description: string; // Este campo contendrá la descripción detallada
  price: number;
  currency: string;
  location: string;
  municipality: 'Monterrey' | 'San Nicolás de los Garza' | 'San Pedro Garza García' | 'Guadalupe' | 'Apodaca' | 'Escobedo' | 'Santa Catarina';
  address: string;
  category: 'PET' | 'Cartón' | 'Vidrio' | 'Metal' | 'Electrónicos' | 'Otros' | 'Papel' | 'HDPE'; // Ampliar categorías
  tags: string[];
  imageUrl: string;
  latitude: number;
  longitude: number;
  verified: boolean;
  type: 'venta' | 'donacion';
}

export const mockProducts: Product[] = [
  {
    id: 'mty-prod-001',
    title: '🧴 Botellas PET Cristal (50kg)',
    description: 'Botellas PET color cristal, limpias y compactadas. Sin etiquetas ni residuos. Material ideal para reciclaje directo en plantas de transformación.',
    price: 9.50,
    currency: 'MXN',
    location: '📍 Monterrey Centro',
    municipality: 'Monterrey',
    address: 'Calle Padre Mier 123, Centro, 64000 Monterrey, N.L.',
    category: 'PET',
    tags: ['pet', 'cristal', 'botellas', 'plástico', 'compactado', 'limpio'],
    imageUrl: 'https://placehold.co/400x300/EBF4FF/3B82F6?text=PET+Cristal\n(50kg)',
    latitude: 25.6751,
    longitude: -100.3185,
    verified: true,
    type: 'venta'
  },
  {
    id: 'mty-prod-002',
    title: '📦 Cartón Corrugado OCC (100kg)',
    description: 'Cartón corrugado tipo OCC, seco, sin manchas ni contaminación. Listo para prensado o reutilización industrial.',
    price: 2.50,
    currency: 'MXN',
    location: '📍 San Nicolás de los Garza, Industrial',
    municipality: 'San Nicolás de los Garza',
    address: 'Av. Los Ángeles 456, Zona Industrial, 66484 San Nicolás de los Garza, N.L.',
    category: 'Cartón',
    tags: ['carton', 'occ', 'corrugado', 'pacas', 'seco'],
    imageUrl: 'https://placehold.co/400x300/FEF3C7/CA8A04?text=Cartón+OCC\n(100kg)',
    latitude: 25.7271,
    longitude: -100.2883,
    verified: true,
    type: 'venta'
  },
  {
    id: 'mty-prod-003',
    title: '💻 Chatarra Electrónica Mixta',
    description: 'Componentes electrónicos variados: tarjetas madre, cables, placas y transformadores. Se entregan organizados por tipo.',
    price: 0,
    currency: 'MXN',
    location: '📍 Guadalupe, Linda Vista',
    municipality: 'Guadalupe',
    address: 'Av. Miguel Alemán 789, Linda Vista, 67130 Guadalupe, N.L.',
    category: 'Electrónicos',
    tags: ['electronica', 'raee', 'chatarra', 'computadoras', 'tarjetas', 'cables'],
    imageUrl: 'https://placehold.co/400x300/F3E8FF/9333EA?text=Chatarra\nElectrónica',
    latitude: 25.6940,
    longitude: -100.2478,
    verified: false,
    type: 'donacion'
  },
  {
    id: 'mty-prod-004',
    title: '🥫 Latas de Aluminio Compactadas (60kg)',
    description: 'Latas de aluminio limpias, prensadas en paquetes compactos. Sin residuos orgánicos ni humedad.',
    price: 25.00,
    currency: 'MXN',
    location: '📍 San Pedro Garza García, Del Valle',
    municipality: 'San Pedro Garza García',
    address: 'Calz. del Valle 101, Del Valle, 66220 San Pedro Garza García, N.L.',
    category: 'Metal',
    tags: ['aluminio', 'latas', 'ubc', 'metal', 'compactado', 'limpio'],
    imageUrl: 'https://placehold.co/400x300/FEE2E2/EF4444?text=Aluminio\nCompactado\n(60kg)',
    latitude: 25.6588,
    longitude: -100.3605,
    verified: true,
    type: 'venta'
  },
  {
    id: 'mty-prod-005',
    title: '🍾 Vidrio Transparente (Frascos)',
    description: 'Frascos de vidrio transparente sin tapas ni etiquetas, lavados y listos para fundición o reutilización artesanal.',
    price: 1.00,
    currency: 'MXN',
    location: '📍 Escobedo, Centro',
    municipality: 'Escobedo',
    address: 'Calle Hidalgo 202, Centro, 66050 Escobedo, N.L.',
    category: 'Vidrio',
    tags: ['vidrio', 'transparente', 'frascos', 'limpio'],
    imageUrl: 'https://placehold.co/400x300/D1FAE5/10B981?text=Vidrio\nTransparente\n(Frascos)',
    latitude: 25.7985,
    longitude: -100.3267,
    verified: false,
    type: 'venta'
  },
  {
    id: 'mty-prod-006',
    title: '🧼 Plástico HDPE Soplado (Colores)',
    description: 'HDPE color (detergentes, productos de limpieza). Material separado y limpio, ideal para reciclaje por extrusión.',
    price: 5.00,
    currency: 'MXN',
    location: '📍 Apodaca, Parque Industrial',
    municipality: 'Apodaca',
    address: 'Blvd. TLC 500, Parque Industrial Stiva, 66600 Apodaca, N.L.',
    category: 'HDPE',
    tags: ['hdpe', 'soplado', 'plastico', 'color', 'limpio'],
    imageUrl: 'https://placehold.co/400x300/E0F2FE/0284C7?text=HDPE+Color',
    latitude: 25.7754,
    longitude: -100.1999,
    verified: true,
    type: 'venta'
  },
  {
    id: 'mty-prod-007',
    title: '📂 Archivo Muerto (Papel)',
    description: 'Documentos viejos sin grapas ni plásticos. Papel seco, apilado en cajas. Perfecto para reprocesado de papel.',
    price: 1.50,
    currency: 'MXN',
    location: '📍 Santa Catarina, La Fama',
    municipality: 'Santa Catarina',
    address: 'Av. Manuel Ordóñez 303, La Fama, 66100 Santa Catarina, N.L.',
    category: 'Papel',
    tags: ['papel', 'archivo', 'oficina', 'seco'],
    imageUrl: 'https://placehold.co/400x300/F3F4F6/4B5563?text=Archivo+Muerto\n(Papel)',
    latitude: 25.6688,
    longitude: -100.4541,
    verified: false,
    type: 'venta'
  }
]; 