import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Recycle, Bell, Menu, X, User, LogOut, LogIn, UserPlus, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { isAuthenticated, logout, userName } = useAuth();
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: "Nueva oferta", message: "Oferta por PET recibida", time: "5m", unread: true },
    { id: 2, title: "Mensaje", message: "Juan te envió un mensaje", time: "1h", unread: false },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">e-colector</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/publicar" 
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
            >
              Publicar Material
            </Link>
            <Link 
              to="/explorar" 
              className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Explorar Mapa
            </Link>
            
            <div className="border-l border-gray-200 h-6 mx-1"></div>

            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1"
                >
                  <LayoutDashboard size={16} />
                  <span>Mi Panel</span>
                </Link>

                <div className="relative">
                  <button 
                    className="relative text-gray-600 hover:text-gray-900 transition-colors p-1 rounded-full"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <Bell className="h-5 w-5" />
                    {notifications.some(n => n.unread) && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                        {notifications.filter(n => n.unread).length}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                      <div className="px-3 py-2 border-b border-gray-100">
                        <h3 className="font-semibold text-sm">Notificaciones</h3>
                      </div>
                      {notifications.length > 0 ? notifications.map(notification => (
                        <div key={notification.id} className={`px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 ${notification.unread ? 'bg-emerald-50' : ''}`}>
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm text-gray-800">{notification.title}</h4>
                            <span className="text-xs text-gray-400">{notification.time}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-0.5">{notification.message}</p>
                        </div>
                      )) : <p className="text-xs text-gray-500 px-3 py-4 text-center">No hay notificaciones</p>}
                      <div className="px-3 py-2">
                        <Link to="/notificaciones" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium" onClick={() => setShowNotifications(false)}>
                          Ver todas
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-l border-gray-200 h-6 mx-2"></div>

                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 p-1 rounded-full">
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium hidden lg:inline">{userName || 'Usuario'}</span>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-1 bg-white rounded-lg shadow-lg border border-gray-100 hidden group-hover:block z-50">
                    <Link to="/perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Mi Perfil
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1"
                >
                  <LogIn size={16}/>
                  <span>Iniciar Sesión</span>
                </Link>
                <Link 
                  to="/registro"
                  className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1"
                >
                 <UserPlus size={16}/>
                 <span>Registrarse</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2 px-2">
             <Link to="/publicar" className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-center font-medium" onClick={() => setIsMenuOpen(false)}>
               Publicar Material
             </Link>
             <Link to="/explorar" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
               Explorar Mapa
             </Link>
              
              {isAuthenticated ? (
                 <>
                   <Link to="/dashboard" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
                     Mi Panel
                   </Link>
                   <Link to="/perfil" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
                     Mi Perfil
                   </Link>
                    <Link to="/notificaciones" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
                     Notificaciones
                   </Link>
                    <button onClick={handleLogout} className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium text-left w-full flex items-center">
                     <LogOut className="h-4 w-4 mr-2" />
                     Cerrar Sesión
                   </button>
                 </>
               ) : (
                 <>
                   <Link to="/login" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
                     Iniciar Sesión
                   </Link>
                   <Link to="/registro" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
                     Registrarse
                   </Link>
                 </>
               )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;