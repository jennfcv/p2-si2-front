import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { obtenerMateriasPorGrado } from '../services/gradoService';
import '../components/main.css';

const MateriaListPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const gestionId = searchParams.get('gestion');
  const gradoId = searchParams.get('grado');

  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await obtenerMateriasPorGrado(gestionId, gradoId);
        setDatos(data);
      } catch (error) {
        console.error('❌ Error:', error);
        setError('No se pudieron cargar las materias.');
      } finally {
        setCargando(false);
      }
    };

    if (gestionId && gradoId) {
      cargarDatos();
    }
  }, [gestionId, gradoId]);

  if (cargando) return <p>Cargando materias...</p>;
  if (error) return <p>{error}</p>;
  if (!datos) return <p>No se encontraron materias.</p>;

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        ⬅️ Volver
      </button>
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Materias de {datos.grado} ({datos.gestion})
      </h2>
      <div className="mb-4 text-right">
        <button
          onClick={() => console.log("Crear rol")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
        >
          ➕ regsitra nueva materia
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white shadow">
          <thead className="bg-gray-100 text-sm text-left">
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Nombre</th>
              <th className="px-4 py-2 border-b">Descripción</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {datos.materias.map((m, index) => (
              <tr key={m.materia_id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b font-semibold">{m.nombre}</td>
                <td className="px-4 py-2 border-b">{m.descripcion || 'Sin descripción'}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() =>
                      navigate(`/panel/materias/detalle?gestion=${gestionId}&grado=${gradoId}&materia=${m.materia_id}`)

                    }
                    className="text-blue-600 hover:underline"
                  >
                    Ver detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MateriaListPage;
