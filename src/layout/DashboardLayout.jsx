import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const nombre = usuario?.nombre_usuario || "Usuario";
  const rol = usuario?.rol || "";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 overflow-auto">
        {/* Header con fondo suave */}
        <div className="bg-gradient-to-r from-blue-100 via-white to-yellow-100 text-gray-800 h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-30 border-b border-gray-300 shadow-sm">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 text-2xl lg:hidden"
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold">📘 Aula Inteligente</h1>
          <div className="text-right">
            <p className="text-sm font-semibold">{nombre}</p>
            <p className="text-xs text-gray-600 italic">{rol}</p>
          </div>
        </div>

        {/* Contenido debajo del header */}
        <div className={`pt-16 transition-all duration-300 ml-0 lg:ml-64`}>
          <div className="p-6 w-full overflow-x-auto bg-gradient-to-r from-blue-100 via-white to-yellow-100 min-h-screen">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

