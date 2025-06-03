import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Header = ({ toggle }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const nombre = usuario?.nombre_usuario || "Usuario";
  const rol = usuario?.rol || "";

  return (
    <header className="bg-gradient-to-r from-blue-100 via-white to-yellow-100 text-gray-800 flex justify-between items-center px-6 py-4 fixed top-0 left-0 w-full z-30 shadow border-b border-gray-300">
      <div className="flex items-center space-x-4">
        {/* <button onClick={toggle} className="text-xl">☰</button> */}
        <h1 className="text-lg font-bold tracking-wide">📘 Aula Inteligente</h1>
      </div>

      <div className="relative">
        <button onClick={() => setOpenMenu(!openMenu)} className="hover:text-blue-600">
          <FaUserCircle size={22} />
        </button>

        {openMenu && (
          <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-md z-50">
            <li className="px-4 py-2 text-sm">👤 {nombre}</li>
            <li className="px-4 py-2 text-xs text-gray-500 italic">{rol}</li>
            <hr />
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Perfil</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Configuración</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Registro de Actividad</li>
            <li
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white cursor-pointer rounded-b text-center"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
            >
              Cerrar sesión
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
