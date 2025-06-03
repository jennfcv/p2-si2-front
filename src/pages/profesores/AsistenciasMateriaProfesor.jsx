//pages/profesores/AsistenciasMateriaProfesor.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { obtenerAsistenciasPorGrado } from '../../services/profesorService';

const AsistenciasMateriaProfesor = () => {
  const { profesorId, gradoId } = useParams();
  const [searchParams] = useSearchParams();
  const nivelId = searchParams.get('nivel_id');
  const materiaId = searchParams.get('materia_id');
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    const cargarAsistencias = async () => {
      try {
        setCargando(true);
        const data = await obtenerAsistenciasPorGrado(gradoId, profesorId, nivelId);
        console.log('✅ Datos recibidos:', data); // Debug
        setDatos(data);
      } catch (error) {
        console.error('❌ Error al obtener asistencias:', error);
      } finally {
        setCargando(false);
      }
    };

    if (profesorId && gradoId && nivelId) {
      cargarAsistencias();
    }
  }, [profesorId, gradoId, nivelId]);

  if (cargando) return <p className="text-gray-500">Cargando asistencias...</p>;
  if (!datos || !datos.periodos) return <p className="text-red-500">No se pudo cargar la información.</p>;

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(`/panel/profesores/${profesorId}/tabs?tab=Materias`)}
        className="mb-4 px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        ⬅️ Volver
      </button>
      {/* <button
        onClick={() =>
          navigate(`/panel/profesores/${profesorId}/registro-asistencia/${gradoId}?nivel_id=${nivelId}&materia_id=${materiaId}`)

        }
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ➕ Registrar Asistencia
      </button> */}
      <button
        onClick={() =>
          navigate(`/panel/profesores/${profesorId}/registro-asistencia/${gradoId}?nivel_id=${nivelId}&materia_id=${materiaId}`)
        }
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ➕ Registrar Asistencia
      </button>

      <h2 className="text-xl font-bold text-blue-700 mb-2">
        Asistencias por Periodo – {datos.grado?.nombre} ({datos.nivel})
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Docente: {datos.docente?.nombre} – Gestión: {datos.gestion}
      </p>

      {datos.periodos.length === 0 ? (
        <p className="text-gray-500">No hay periodos disponibles.</p>
      ) : (
        datos.periodos.map((periodo) => (
          <div key={periodo.periodo_id} className="mb-6">
            <h3 className="text-lg font-semibold text-green-700 mb-2">{periodo.nombre}</h3>

            {periodo.asistencias.length === 0 ? (
              <p className="text-gray-500">Sin registros en este periodo.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 border">#</th>
                      <th className="px-3 py-2 border">nombre</th>
                      <th className="px-3 py-2 border">Apellido</th>
                      <th className="px-3 py-2 border">Asistencias</th>
                      <th className="px-3 py-2 border">Tardanzas</th>
                      <th className="px-3 py-2 border">Muy Tarde</th>
                      <th className="px-3 py-2 border">Ausencias</th>
                      <th className="px-3 py-2 border">Licencia</th>
                      <th className="px-3 py-2 border">Total</th>
                      <th className="px-3 py-2 border">Promedio %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {periodo.asistencias.map((a) => (
                      <tr key={a.alumno_id}>
                        <td className="border px-2 py-1 text-center">{a.alumno_id}</td>
                        <td className="border px-2 py-1 text-center">{a.nombre}</td>
                        <td className="border px-2 py-1 text-center">{a.apellido}</td>
                        <td className="border px-2 py-1 text-center">{a.asistencias_completas}</td>
                        <td className="border px-2 py-1 text-center">{a.llegadas_tarde}</td>
                        <td className="border px-2 py-1 text-center">{a.muy_tarde}</td>
                        <td className="border px-2 py-1 text-center">{a.ausencias}</td>
                        <td className="border px-2 py-1 text-center">{a.licencias}</td>
                        <td className="border px-2 py-1 text-center">{a.total_clases}</td>
                        <td className="border px-2 py-1 text-center">{a.promedio_asistencia}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AsistenciasMateriaProfesor;
