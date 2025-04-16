import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Recycle, Bell, Menu, X, User, LogOut, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "Nueva oferta recibida",
      message: "Has recibido una oferta por tu PET transparente",
      time: "hace 5 minutos",
      unread: true
    },
    {
      id: 2,
      title: "Mensaje nuevo",
      message: "Juan te ha enviado un mensaje",
      time: "hace 1 hora",
      unread: true
    }
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Recycle className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">e-colector</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/publicar" 
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Publicar
            </Link>
            <Link 
              to="/explorar" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Explorar
            </Link>
            
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button 
                    className="relative text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <Bell className="h-6 w-6" />
                    {notifications.some(n => n.unread) && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                        {notifications.filter(n => n.unread).length}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="font-semibold">Notificaciones</h3>
                      </div>
                      {notifications.map(notification => (
                        <div 
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${notification.unread ? 'bg-emerald-50' : ''}`}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                      ))}
                      <div className="px-4 py-2 border-t border-gray-100">
                        <Link 
                          to="/notificaciones"
                          className="text-sm text-emerald-600 hover:text-emerald-700"
                          onClick={() => setShowNotifications(false)}
                        >
                          Ver todas las notificaciones
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-l border-gray-200 h-6 mx-2"></div>

                {/* User Menu */}
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                    <User className="h-6 w-6" />
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-lg shadow-lg hidden group-hover:block z-50">
                    <Link 
                      to="/perfil" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Mi Perfil
                    </Link>
                    <Link 
                      to="/publicaciones"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Mis Publicaciones
                    </Link>
                    <Link 
                      to="/mensajes"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Mensajes
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Login & Register Links */}
                <Link 
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-1"
                >
                  <LogIn className="h-5 w-5"/>
                  <span>Iniciar Sesión</span>
                </Link>
                <Link 
                  to="/registro"
                  className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-1"
                >
                 <UserPlus className="h-5 w-5"/>
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/publicar"
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Publicar
              </Link>
              <Link
                to="/explorar"
                className="text-gray-600 hover:text-gray-900 px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Explorar
              </Link>

              {isAuthenticated ? (
                <>
                  {/* Enlaces para usuario autenticado */}
                  <Link
                    to="/notificaciones"
                    className="text-gray-600 hover:text-gray-900 px-4 py-2 flex items-center justify-between"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Notificaciones</span>
                    {notifications.some(n => n.unread) && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {notifications.filter(n => n.unread).length}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/perfil"
                    className="text-gray-600 hover:text-gray-900 px-4 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mi Perfil
                  </Link>
                  <Link
                    to="/publicaciones"
                    className="text-gray-600 hover:text-gray-900 px-4 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mis Publicaciones
                  </Link>
                  <Link
                    to="/mensajes"
                    className="text-gray-600 hover:text-gray-900 px-4 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mensajes
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center text-gray-600 hover:text-gray-900 px-4 py-2"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  {/* Enlaces para usuario no autenticado */}
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-gray-900 px-4 py-2 flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="h-5 w-5"/>
                    <span>Iniciar Sesión</span>
                  </Link>
                   <Link
                    to="/registro"
                    className="text-gray-600 hover:text-gray-900 px-4 py-2 flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus className="h-5 w-5"/>
                    <span>Registrarse</span>
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