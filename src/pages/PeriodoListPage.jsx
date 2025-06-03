import React, { useEffect, useState } from "react";
import {
  listarPeriodos,
  verPeriodo,
  eliminarPeriodo
} from '../services/periodoService';

import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const PeriodoListPage = () => {
  const [periodos, setPeriodos] = useState([]);
  const handleVer = async (id) => {
    const periodo = await verPeriodo(id);
    console.log("📋 Ver periodo:", periodo);
  };

  const handleEditar = async (id) => {
    const periodo = await verPeriodo(id);
    console.log("✏️ Editar periodo:", periodo);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este periodo?");
    if (!confirmar) return;

    await eliminarPeriodo(id);
    setPeriodos(prev => prev.filter(p => p.id !== id));
    console.log("🗑️ Periodo eliminado:", id);
  };

  useEffect(() => {
    const cargarPeriodos = async () => {
      const data = await listarPeriodos();
      setPeriodos(data);
    };
    cargarPeriodos();
  }, []);

  return (
    <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Listado de Periodos</h2>
    
      <div className="mb-4 text-right">
        <button
          onClick={() => console.log("Crear periodo")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
        >
          ➕ Nuevo Periodo
        </button>
      </div>

       {periodos.length === 0 ? (
        <p className="text-gray-500">No hay periodos registrados.</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Inicio</th>
              <th className="border px-4 py-2">Fin</th>
              <th className="border px-4 py-2">Estado</th>
              <th className="px-4 py-2 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {periodos.map((p, index) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{p.nombre}</td>
                <td className="border px-4 py-2">{p.fecha_inicio}</td>
                <td className="border px-4 py-2">{p.fecha_fin}</td>
                <td className="border px-4 py-2">{p.estado}</td>
                <td className="px-4 py-2 border-b text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleVer(p.id)}
                      className="p-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
                      title="Ver"
                    >
                      <FaEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditar(p.id)}
                      className="p-1 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
                      title="Editar"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEliminar(p.id)}
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

export default PeriodoListPage;
