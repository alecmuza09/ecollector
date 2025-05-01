import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/user';
import BuyerDashboard from './BuyerDashboard';
import SellerDashboard from './SellerDashboard';
import CollectorDashboard from './CollectorDashboard';

const Dashboard = () => {
  const { isAuthenticated, userRole, userName } = useAuth();

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    // Puedes mostrar un mensaje o simplemente redirigir
    // console.log('User not authenticated, redirecting to login...');
    return <Navigate to="/login" replace />;
  }

  // Renderizar el dashboard correcto según el rol
  const renderDashboardByRole = () => {
    switch (userRole) {
      case UserRole.BUYER:
        return <BuyerDashboard />;
      case UserRole.SELLER:
        return <SellerDashboard />;
      case UserRole.COLLECTOR:
        return <CollectorDashboard />;
      default:
        // Manejar caso inesperado (usuario autenticado sin rol válido)
        return (
          <div>
            <h2 className="text-xl font-semibold text-red-600">Error de Rol</h2>
            <p>No se pudo determinar tu tipo de cuenta. Por favor, contacta a soporte.</p>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
       {/* Opcional: Un encabezado común para todos los dashboards */} 
      {/* <h1 className="text-3xl font-bold mb-6">Mi Panel</h1> */}
      
      <div className="bg-white shadow rounded-lg p-6">
         {renderDashboardByRole()}
      </div>
    </div>
  );
};

export default Dashboard; 