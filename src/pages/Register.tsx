import React, { useState } from 'react';
import RoleSelection from '../components/auth/RoleSelection';
import { UserRole } from '../types/user';

function Register() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    if (!termsAccepted) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }
    console.log('Register attempt:', { 
      name, 
      email, 
      password,
      role: selectedRole, 
      phone, 
      city, 
      termsAccepted 
    });
    alert(`Registro iniciado para ${name} como ${selectedRole}`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {!selectedRole ? (
        <RoleSelection onSelectRole={handleRoleSelect} />
      ) : (
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Crear Cuenta como: <span className="capitalize text-green-600">{selectedRole}</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Nombre Completo / Empresa
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Tu Nombre o Razón Social"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email de Contacto
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Teléfono
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder="Ej: 81 1234 5678"
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                Ciudad/Región Principal
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                type="text"
                placeholder="Ej: Monterrey, Nuevo León"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirmar Contraseña
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline ${password !== confirmPassword && confirmPassword ? 'border-red-500' : ''}`}
                id="confirmPassword"
                type="password"
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {password !== confirmPassword && confirmPassword && (
                <p className="text-red-500 text-xs italic">Las contraseñas no coinciden.</p>
              )}
            </div>
            <div className="mb-6 p-4 border-l-4 border-yellow-400 bg-yellow-50">
              <p className="text-sm text-yellow-700 font-medium">Campos Adicionales ({selectedRole})</p>
              <p className="text-xs text-yellow-600">Próximamente: Aquí se mostrarán preguntas específicas para tu rol (ej. materiales de interés, áreas de servicio).</p>
            </div>
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-500"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                />
                <span className="ml-2 text-sm text-gray-600">
                  He leído y acepto los <a href="/legal/terminos" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Términos y Condiciones</a> y la <a href="/legal/privacidad" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Política de Privacidad</a>.
                </span>
              </label>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8">
              <button
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 transition duration-150 ease-in-out mb-4 sm:mb-0"
                type="submit"
                disabled={password !== confirmPassword || !termsAccepted || !name || !email || !phone || !city || password.length < 8}
              >
                Crear Cuenta
              </button>
              <a href="/login" className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800">
                ¿Ya tienes cuenta? Inicia Sesión
              </a>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Register; 