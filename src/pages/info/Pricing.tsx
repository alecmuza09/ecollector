import React from 'react';
import { Check } from 'lucide-react'; // Icono para listas de características

const Pricing = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Planes y Precios</h1>
        <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl mx-auto">
          Elige el plan que mejor se adapte a tus necesidades para conectar, vender y comprar materiales reciclables de forma eficiente.
        </p>

        {/* Grid de Planes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Plan Básico/Gratuito */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Básico</h2>
            <p className="text-gray-500 mb-4">Ideal para empezar y explorar la plataforma.</p>
            <p className="text-3xl font-bold text-gray-900 mb-4">Gratis</p>
            <ul className="space-y-2 text-gray-600 mb-6 flex-grow">
              <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0"/> Publicar hasta X anuncios</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0"/> Acceso a búsquedas básicas</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0"/> Mensajería estándar</li>
            </ul>
            <button className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition mt-auto">
              Plan Actual
            </button>
          </div>

          {/* Plan Profesional (Recomendado) */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-emerald-500 relative flex flex-col">
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Más Popular</span>
            <h2 className="text-xl font-semibold text-emerald-700 mb-2">Profesional</h2>
            <p className="text-gray-500 mb-4">Para vendedores y compradores activos.</p>
            <p className="text-3xl font-bold text-gray-900 mb-4">€XX <span className="text-base font-normal text-gray-500">/ mes</span></p>
            <ul className="space-y-2 text-gray-600 mb-6 flex-grow">
              <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0"/> Publicaciones ilimitadas</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0"/> Búsquedas avanzadas y filtros</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0"/> Estadísticas de rendimiento</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0"/> Verificación de perfil</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0"/> Soporte prioritario</li>
            </ul>
            <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition mt-auto">
              Elegir Plan Profesional
            </button>
          </div>

          {/* Plan Empresa */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Empresa</h2>
            <p className="text-gray-500 mb-4">Soluciones a medida para grandes volúmenes.</p>
            <p className="text-3xl font-bold text-gray-900 mb-4">Contacto</p>
             <ul className="space-y-2 text-gray-600 mb-6 flex-grow">
              <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0"/> Todas las funciones Pro</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0"/> Integración API</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0"/> Gestor de cuenta dedicado</li>
              <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0"/> Informes personalizados</li>
            </ul>
            <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition mt-auto">
              Contactar Ventas
            </button>
          </div>
        </div>

        {/* Sección FAQs sobre Precios */}
        <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Preguntas Frecuentes sobre Precios</h2>
            <div className="space-y-4">
                {/* FAQ 1 */}
                <details className="bg-white p-4 rounded-lg shadow-sm cursor-pointer">
                    <summary className="font-medium text-gray-700">¿Hay algún costo oculto?</summary>
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">No, nuestros precios son transparentes. El plan Básico es gratuito y los planes de pago tienen tarifas mensuales fijas sin cargos adicionales inesperados por las funcionalidades incluidas.</p>
                </details>
                 {/* FAQ 2 */}
                 <details className="bg-white p-4 rounded-lg shadow-sm cursor-pointer">
                    <summary className="font-medium text-gray-700">¿Puedo cambiar de plan más adelante?</summary>
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">Sí, puedes cambiar tu plan en cualquier momento desde la configuración de tu cuenta. El cambio se aplicará al inicio del siguiente ciclo de facturación.</p>
                </details>
                {/* FAQ 3 */}
                 <details className="bg-white p-4 rounded-lg shadow-sm cursor-pointer">
                    <summary className="font-medium text-gray-700">¿Qué métodos de pago aceptan?</summary>
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">Aceptamos las principales tarjetas de crédito (Visa, Mastercard, American Express) y [mencionar otros si aplica, ej. PayPal, transferencia bancaria].</p>
                </details>
                 {/* Añadir más FAQs */} 
            </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 