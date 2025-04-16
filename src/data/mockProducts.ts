export interface Product {
  id: string;
  title: string;
  description: string;
  price: number; // 0 podría interpretarse como Gratis/Donación
  currency: string;
  location: string; // e.g., "Monterrey Centro", "San Pedro Garza García"
  municipality: 'Monterrey' | 'San Nicolás de los Garza' | 'San Pedro Garza García' | 'Guadalupe' | 'Apodaca' | 'Escobedo' | 'Santa Catarina'; // For filtering
  address: string; // Added specific address
  category: 'PET' | 'Cartón' | 'Vidrio' | 'Metal' | 'Electrónicos' | 'Otros';
  tags: string[];
  imageUrl: string;
  latitude: number; // Para el mapa interactivo
  longitude: number; // Para el mapa interactivo
  verified: boolean; // Añadido
  type: 'venta' | 'donacion'; // Añadido
}

export const mockProducts: Product[] = [
  {
    id: 'mty-prod-001',
    title: 'Botellas PET Cristal (50kg)',
    description: 'Lote de botellas PET post-consumo limpias, sin tapa ni etiqueta.',
    price: 9.50,
    currency: 'MXN',
    location: 'Monterrey Centro',
    municipality: 'Monterrey',
    address: 'Calle Padre Mier 123, Centro, 64000 Monterrey, N.L.',
    category: 'PET',
    tags: ['pet', 'cristal', 'botellas', 'plástico'],
    imageUrl: 'https://source.unsplash.com/400x300/?plastic,bottles,recycling',
    latitude: 25.6751, // Coordenadas aproximadas
    longitude: -100.3185,
    verified: true,
    type: 'venta'
  },
  {
    id: 'mty-prod-002',
    title: 'Cartón Corrugado OCC (100kg)',
    description: 'Pacas de cartón OCC (Old Corrugated Containers), limpio y seco.',
    price: 2.50, // Precio por kg
    currency: 'MXN',
    location: 'San Nicolás de los Garza, Industrial',
    municipality: 'San Nicolás de los Garza',
    address: 'Av. Los Ángeles 456, Zona Industrial, 66484 San Nicolás de los Garza, N.L.',
    category: 'Cartón',
    tags: ['carton', 'occ', 'corrugado', 'pacas'],
    imageUrl: 'https://source.unsplash.com/400x300/?cardboard,recycling,bales',
    latitude: 25.7271,
    longitude: -100.2883,
    verified: true,
    type: 'venta'
  },
  {
    id: 'mty-prod-003',
    title: 'Chatarra Electrónica Mixta',
    description: 'Lote variado de electrónicos obsoletos (computadoras, monitores, etc.). Ideal para recuperación.',
    price: 0,
    currency: 'MXN',
    location: 'Guadalupe, Linda Vista',
    municipality: 'Guadalupe',
    address: 'Av. Miguel Alemán 789, Linda Vista, 67130 Guadalupe, N.L.',
    category: 'Electrónicos',
    tags: ['electronica', 'raee', 'chatarra', 'computadoras'],
    imageUrl: 'https://source.unsplash.com/400x300/?ewaste,electronics,recycling',
    latitude: 25.6940,
    longitude: -100.2478,
    verified: false,
    type: 'donacion'
  },
  {
    id: 'mty-prod-004',
    title: 'Latas de Aluminio Compactadas (20kg)',
    description: 'Aluminio UBC (Used Beverage Cans) compactado en bloques.',
    price: 25.00,
    currency: 'MXN',
    location: 'San Pedro Garza García, Del Valle',
    municipality: 'San Pedro Garza García',
    address: 'Calz. del Valle 101, Del Valle, 66220 San Pedro Garza García, N.L.',
    category: 'Metal',
    tags: ['aluminio', 'latas', 'ubc', 'metal'],
    imageUrl: 'https://source.unsplash.com/400x300/?aluminum,cans,recycling',
    latitude: 25.6588,
    longitude: -100.3605,
    verified: true,
    type: 'venta'
  },
  {
    id: 'mty-prod-005',
    title: 'Vidrio Transparente (Frascos)',
    description: 'Frascos de vidrio transparente, limpios y sin tapa.',
    price: 1.00,
    currency: 'MXN',
    location: 'Escobedo, Centro',
    municipality: 'Escobedo',
    address: 'Calle Hidalgo 202, Centro, 66050 Escobedo, N.L.',
    category: 'Vidrio',
    tags: ['vidrio', 'transparente', 'frascos'],
    imageUrl: 'https://source.unsplash.com/400x300/?glass,jars,recycling',
    latitude: 25.7985,
    longitude: -100.3267,
    verified: false,
    type: 'venta'
  },
  {
    id: 'mty-prod-006',
    title: 'Plástico HDPE Soplado (Colores)',
    description: 'Envases de HDPE soplado (shampoo, detergente), varios colores, prensado.',
    price: 5.00,
    currency: 'MXN',
    location: 'Apodaca, Parque Industrial',
    municipality: 'Apodaca',
    address: 'Blvd. TLC 500, Parque Industrial Stiva, 66600 Apodaca, N.L.',
    category: 'PET', // O podría ser 'Otros' dependiendo de la clasificación
    tags: ['hdpe', 'soplado', 'plastico', 'color'],
    imageUrl: 'https://source.unsplash.com/400x300/?hdpe,plastic,recycling',
    latitude: 25.7754,
    longitude: -100.1999,
    verified: true,
    type: 'venta'
  },
  {
    id: 'mty-prod-007',
    title: 'Archivo Muerto (Papel)',
    description: 'Cajas de archivo muerto, papel mixto.',
    price: 1.50,
    currency: 'MXN',
    location: 'Santa Catarina, La Fama',
    municipality: 'Santa Catarina',
    address: 'Av. Manuel Ordóñez 303, La Fama, 66100 Santa Catarina, N.L.',
    category: 'Cartón',
    tags: ['papel', 'archivo', 'oficina'],
    imageUrl: 'https://source.unsplash.com/400x300/?paper,waste,recycling',
    latitude: 25.6688,
    longitude: -100.4541,
    verified: false,
    type: 'venta'
  }
]; 