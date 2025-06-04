import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import materiaService from '../services/materiaService';

const MateriaListPage = () => {
  const [materias, setMaterias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  const cargarMaterias = async () => {
    try {
      const data = await materiaService.listar();
      setMaterias(data);
    } catch (error) {
      console.error("Error al cargar materias:", error);
    } finally {
      setCargando(false);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Deseas eliminar esta materia?")) {
      await materiaService.eliminar(id);
      setMaterias(prev => prev.filter(m => m.id !== id));
    }
  };

  useEffect(() => {
    cargarMaterias();
  }, []);

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">📘 Listado de Materias</h2>
        <button
          onClick={() => navigate("/panel/materias/crear")}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded shadow text-sm"
        >
          ➕ Nueva Materia
        </button>
      </div>

      {cargando ? (
        <p className="text-gray-500">Cargando materias...</p>
      ) : materias.length === 0 ? (
        <p className="text-gray-500">No hay materias registradas.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded border border-gray-200 bg-white">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3 border-b">#</th>
                <th className="px-4 py-3 border-b">Nombre</th>
                <th className="px-4 py-3 border-b">Descripción</th>
                <th className="px-4 py-3 border-b text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {materias.map((materia, index) => (
                <tr key={materia.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b capitalize">{materia.nombre}</td>
                  <td className="px-4 py-2 border-b">{materia.descripcion || 'Sin descripción'}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => navigate(`/panel/materias/${materia.id}`)}
                        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
                        title="Ver"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigate(`/panel/materias/${materia.id}/editar`)}
                        className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
                        title="Editar"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEliminar(materia.id)}
                        className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
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

export default MateriaListPage;
