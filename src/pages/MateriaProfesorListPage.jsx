import React, { useEffect, useState } from "react";
import {
  listarMateriasProfesor,
  verMateriaProfesor,
  eliminarMateriaProfesor
} from '../services/materiaProfesorService';

import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const MateriaProfesorListPage = () => {
  const [asignaciones, setAsignaciones] = useState([]);
  const handleVer = async (id) => {
    const asignacion = await verMateriaProfesor(id);
    console.log("📋 Ver asignación:", asignacion);
  };

  const handleEditar = async (id) => {
    const asignacion = await verMateriaProfesor(id);
    console.log("✏️ Editar asignación:", asignacion);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar esta asignación?");
    if (!confirmar) return;

    await eliminarMateriaProfesor(id);
    setAsignaciones(prev => prev.filter(a => a.id !== id));
    console.log("🗑️ Asignación eliminada:", id);
  };

  useEffect(() => {
    const cargarAsignaciones = async () => {
      try {
        const data = await listarMateriasProfesor();
        setAsignaciones(data);
      } catch (error) {
        console.error("Error al cargar asignaciones:", error);
      }
    };
    cargarAsignaciones();
  }, []);

  return (
    <div><div className="mb-4 text-right">
      <button
        onClick={() => console.log("Crear asignación")}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
      >
        ➕ Nueva Asignación
      </button>
    </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Asignaciones de Materias a Profesores</h2>
      {asignaciones.length === 0 ? (
        <p className="text-gray-500">No hay asignaciones registradas.</p>
      ) : (
        <table className="min-w-full text-sm border bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Materia</th>
              <th className="border px-4 py-2">Profesor</th>
              <th className="border px-4 py-2">Fecha Asignación</th>
              <th className="px-4 py-2 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asignaciones.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.materia_nombre || '-'}</td>
                <td className="border px-4 py-2">{item.profesor_nombre || '-'}</td>
                <td className="border px-4 py-2">{item.fecha_asignacion}</td>
                <td className="px-4 py-2 border-b text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleVer(item.id)}
                      className="p-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
                      title="Ver"
                    >
                      <FaEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditar(item.id)}
                      className="p-1 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
                      title="Editar"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEliminar(item.id)}
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

export default MateriaProfesorListPage;
