import React, { useEffect, useState } from 'react';
import {
  listarProfesores,
  obtenerProfesor,
  eliminarProfesor
} from '../services/profesorService';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ProfesorListPage = () => {
  const navigate = useNavigate();
  const [profesores, setProfesores] = useState([]);
  const [cargando, setCargando] = useState(true);

  const handleVer = (id) => {
    navigate(`/panel/profesores/${id}/tabs`);
  };

  useEffect(() => {
    const cargarProfesores = async () => {
      try {
        const data = await listarProfesores();
        setProfesores(data);
      } catch (error) {
        console.error("Error al cargar profesores:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarProfesores();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Listado de Profesores</h2>
      <div className="mb-4 text-right">
        <button
          onClick={() => console.log("Crear profesor")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
        >
          ➕ Nuevo Profesor
        </button>
      </div>

      {cargando ? (
        <p className="text-gray-500">Cargando profesores...</p>
      ) : profesores.length === 0 ? (
        <p className="text-gray-500">No hay profesores registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white shadow">
            <thead className="bg-gray-100 text-sm text-left">
              <tr>
                <th className="px-4 py-2 border-b">#</th>
                <th className="px-4 py-2 border-b">Código</th>
                <th className="px-4 py-2 border-b">Nombre</th>
                <th className="px-4 py-2 border-b">CI</th>
                <th className="px-4 py-2 border-b">Correo</th>
                <th className="px-4 py-2 border-b">Teléfono</th>
                <th className="px-4 py-2 border-b">Dirección</th>
                <th className="px-4 py-2 border-b">Estado</th>
                <th className="px-4 py-2 border-b text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {profesores.map((p, index) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{p.codigo}</td>
                  <td className="px-4 py-2 border-b">{p.nombre}</td>
                  <td className="px-4 py-2 border-b">{p.ci}</td>
                  <td className="px-4 py-2 border-b">{p.email}</td>
                  <td className="px-4 py-2 border-b">{p.telefono}</td>
                  <td className="px-4 py-2 border-b">{p.direccion}</td>
                  <td className="px-4 py-2 border-b">{p.estado}</td>
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
                        className="p-1 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
                        title="Editar"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
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
        </div>
      )}
    </div>
  );
};

export default ProfesorListPage;
