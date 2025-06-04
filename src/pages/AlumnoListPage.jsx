import React, { useEffect, useState } from 'react';
import { listarAlumnos, verAlumno, eliminarAlumno } from '../services/alumnoService';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const AlumnoListPage = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  const handleVer = (id) => navigate(`/panel/alumnos/${id}/tabs`);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Deseas eliminar este alumno?")) {
      await eliminarAlumno(id);
      setAlumnos(prev => prev.filter(a => a.id !== id));
    }
  };

  useEffect(() => {
    const cargarAlumnos = async () => {
      try {
        const data = await listarAlumnos();
        setAlumnos(data);
      } catch (error) {
        console.error("Error al cargar alumnos:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarAlumnos();
  }, []);

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">📚 Listado de Alumnos</h2>
        <button
          onClick={() => console.log("Crear alumno")}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded shadow text-sm"
        >
          ➕ Nuevo Alumno
        </button>
      </div>

      {cargando ? (
        <p className="text-gray-500">Cargando alumnos...</p>
      ) : alumnos.length === 0 ? (
        <p className="text-gray-500">No hay alumnos registrados.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded border border-gray-200 bg-white">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3 border-b">#</th>
                <th className="px-4 py-3 border-b">Nombre</th>
                <th className="px-4 py-3 border-b">Apellido</th>
                <th className="px-4 py-3 border-b text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno) => (
                <tr key={alumno.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{alumno.id}</td>
                  <td className="px-4 py-2 border-b capitalize">{alumno.nombre}</td>
                  <td className="px-4 py-2 border-b capitalize">{alumno.apellido}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleVer(alumno.id)}
                        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
                        title="Ver"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => console.log("Editar", alumno.id)}
                        className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
                        title="Editar"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEliminar(alumno.id)}
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

export default AlumnoListPage;
