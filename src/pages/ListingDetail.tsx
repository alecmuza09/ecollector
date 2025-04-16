import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, Clock, DollarSign, Package, Info, CheckCircle, AlertCircle } from 'lucide-react';

interface Offer {
  id: number;
  collectorId: number;
  price: number;
  suggestedDate: string;
  suggestedTime: string;
  status: 'pending' | 'accepted' | 'rejected';
}

// Mock data - En producción esto vendría de la base de datos
const MOCK_LISTING = {
  id: 1,
  title: "PET transparente - 100kg",
  category: "Plásticos",
  quantity: "100kg",
  condition: "Para reciclar",
  description: "Botellas de PET transparente compactadas. Material limpio y separado por color. Ideal para reciclaje directo. Se incluyen principalmente botellas de agua y refrescos.",
  publishDate: "2024-03-15",
  location: {
    zone: "San Nicolás, Nuevo León",
    exact: "Av. Universidad 123, Col. Tecnológico",
  },
  price: "8.50 MXN/kg",
  status: "available", // available, negotiating, reserved, collected
  images: [
    "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1605600659892-0ef719419d41?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1605600659876-0ef719419d41?auto=format&fit=crop&q=80&w=800",
  ],
  seller: {
    id: 1,
    name: "Juan Pérez",
    rating: 4.5,
    verified: true,
  }
};

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offer, setOffer] = useState<Partial<Offer>>({
    price: 0,
    suggestedDate: '',
    suggestedTime: '',
  });

  // Mock del estado de usuario verificado
  const isVerifiedCollector = true;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? MOCK_LISTING.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === MOCK_LISTING.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleSubmitOffer = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar la oferta
    console.log('Oferta enviada:', offer);
    setShowOfferForm(false);
  };

  const getStatusBadge = () => {
    const statusConfig = {
      available: { color: 'bg-emerald-100 text-emerald-800', text: 'Disponible' },
      negotiating: { color: 'bg-yellow-100 text-yellow-800', text: 'En negociación' },
      reserved: { color: 'bg-blue-100 text-blue-800', text: 'Reservado' },
      collected: { color: 'bg-gray-100 text-gray-800', text: 'Recolectado' },
    };

    const config = statusConfig[MOCK_LISTING.status as keyof typeof statusConfig];
    return (
      <span className={`${config.color} px-3 py-1 rounded-full text-sm font-medium`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Galería de imágenes */}
        <div className="relative h-96">
          <img
            src={MOCK_LISTING.images[currentImageIndex]}
            alt={MOCK_LISTING.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button
              onClick={handlePrevImage}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
              ←
            </button>
            <button
              onClick={handleNextImage}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
              →
            </button>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {MOCK_LISTING.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {MOCK_LISTING.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(MOCK_LISTING.publishDate).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {MOCK_LISTING.location.zone}
                </span>
              </div>
            </div>
            {getStatusBadge()}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Detalles del material</h2>
                  <dl className="space-y-2">
                    <div className="flex items-start">
                      <dt className="w-24 flex-shrink-0 text-gray-500">Categoría:</dt>
                      <dd>{MOCK_LISTING.category}</dd>
                    </div>
                    <div className="flex items-start">
                      <dt className="w-24 flex-shrink-0 text-gray-500">Cantidad:</dt>
                      <dd>{MOCK_LISTING.quantity}</dd>
                    </div>
                    <div className="flex items-start">
                      <dt className="w-24 flex-shrink-0 text-gray-500">Estado:</dt>
                      <dd>{MOCK_LISTING.condition}</dd>
                    </div>
                    <div className="flex items-start">
                      <dt className="w-24 flex-shrink-0 text-gray-500">Precio:</dt>
                      <dd className="font-semibold text-emerald-600">{MOCK_LISTING.price}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Descripción</h2>
                  <p className="text-gray-600">{MOCK_LISTING.description}</p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Vendedor</h2>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      {MOCK_LISTING.seller.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{MOCK_LISTING.seller.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {MOCK_LISTING.seller.rating} ★
                        </span>
                        {MOCK_LISTING.seller.verified && (
                          <span className="flex items-center text-sm text-emerald-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Verificado
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Hacer una oferta</h2>
                
                {!isVerifiedCollector ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-yellow-800">Verificación requerida</h3>
                        <p className="text-sm text-yellow-700 mt-1">
                          Para hacer ofertas necesitas ser un recolector verificado.
                          <a href="/verificacion" className="text-yellow-800 underline ml-1">
                            Verificar mi cuenta
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitOffer} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Precio ofertado (MXN/kg)
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="number"
                          step="0.50"
                          value={offer.price}
                          onChange={(e) => setOffer({ ...offer, price: parseFloat(e.target.value) })}
                          className="pl-10 w-full p-2 border border-gray-200 rounded-lg"
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha sugerida
                      </label>
                      <input
                        type="date"
                        value={offer.suggestedDate}
                        onChange={(e) => setOffer({ ...offer, suggestedDate: e.target.value })}
                        className="w-full p-2 border border-gray-200 rounded-lg"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hora sugerida
                      </label>
                      <input
                        type="time"
                        value={offer.suggestedTime}
                        onChange={(e) => setOffer({ ...offer, suggestedTime: e.target.value })}
                        className="w-full p-2 border border-gray-200 rounded-lg"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Enviar oferta
                    </button>
                  </form>
                )}

                <div className="mt-4 text-sm text-gray-500">
                  <p className="flex items-center gap-1">
                    <Info className="h-4 w-4" />
                    La ubicación exacta se revelará cuando el vendedor acepte tu oferta
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;