import React, { useEffect, useState } from "react";
import {
  listarRoles,
  verRol,
  eliminarRol
} from '../services/rolService';

import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const RolListPage = () => {
  const [roles, setRoles] = useState([]);
  const handleVer = async (id) => {
    const rol = await verRol(id);
    console.log("📋 Ver rol:", rol);
  };

  const handleEditar = async (id) => {
    const rol = await verRol(id);
    console.log("✏️ Editar rol:", rol);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este rol?");
    if (!confirmar) return;

    await eliminarRol(id);
    setRoles(prev => prev.filter(r => r.id !== id));
    console.log("🗑️ Rol eliminado:", id);
  };

  useEffect(() => {
    const cargarRoles = async () => {
      try {
        const data = await listarRoles();
        setRoles(data);
      } catch (error) {
        console.error("Error al cargar roles:", error);
      }
    };
    cargarRoles();
  }, []);

  return (
    <div>
      <div className="mb-4 text-right">
        <button
          onClick={() => console.log("Crear rol")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
        >
          ➕ Nuevo Rol
        </button>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Listado de Roles</h2>
      {roles.length === 0 ? (
        <p className="text-gray-500">No hay roles registrados.</p>
      ) : (
        <table className="min-w-full text-sm border bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Descripción</th>
              <th className="px-4 py-2 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((rol, index) => (
              <tr key={rol.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{rol.nombre}</td>
                <td className="border px-4 py-2">{rol.descripcion}</td>
                <td className="px-4 py-2 border-b text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleVer(rol.id)}
                      className="p-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
                      title="Ver"
                    >
                      <FaEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditar(rol.id)}
                      className="p-1 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
                      title="Editar"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEliminar(rol.id)}
                      className="p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
                      title="Eliminar"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RolListPage;
