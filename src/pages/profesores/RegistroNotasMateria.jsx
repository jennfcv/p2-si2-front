import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  obtenerDetalleEstudiantesMateriaRegistroAsistencia,
  obtenerPeriodosActivos,
  registrarNotasParciales // ← cambio aquí
} from '../../services/profesorService'; // ← asegúrate de que esté actualizado también el servicio

const RegistroNotasMateria = () => {
  const { profesorId, materiaId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const gradoId = parseInt(searchParams.get('grado_id'));
  const nivelId = parseInt(searchParams.get('nivel_id'));

  const [periodos, setPeriodos] = useState([]);
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('');

  const [alumnos, setAlumnos] = useState([]);
  const [notas, setNotas] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [listaEstudiantes, listaPeriodos] = await Promise.all([
          obtenerDetalleEstudiantesMateriaRegistroAsistencia(profesorId, materiaId),
          obtenerPeriodosActivos()
        ]);
        setAlumnos(listaEstudiantes);
        setPeriodos(listaPeriodos);
      } catch (error) {
        console.error('❌ Error al cargar estudiantes o periodos:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [profesorId, materiaId]);

  const manejarCambio = (alumnoId, valor) => {
    setNotas((prev) => ({
      ...prev,
      [alumnoId]: valor
    }));
  };

  const guardarNotas = async () => {
    if (!periodoSeleccionado) {
      alert('⚠️ Debes seleccionar un periodo antes de guardar.');
      return;
    }

    const listaNotas = alumnos.map((alumno) => ({
      alumno_id: alumno.id,
      materia_id: parseInt(materiaId),
      grado_id: gradoId,
      periodo_id: parseInt(periodoSeleccionado),
      nota_parcial: parseFloat(notas[alumno.id] || 0)
    }));

    try {
      await registrarNotasParciales(listaNotas); // ← envío de todos juntos
      alert('✅ Notas registradas correctamente.');
      navigate(-1);
    } catch (error) {
      alert('❌ Error al registrar notas.');
    }
  };

  if (loading) return <p>Cargando estudiantes y periodos...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Registro de Notas Parciales</h2>

      <label className="block mb-4 text-sm text-gray-700">
        Seleccionar periodo:
        <select
          value={periodoSeleccionado}
          onChange={(e) => setPeriodoSeleccionado(e.target.value)}
          className="ml-2 border px-2 py-1 rounded"
        >
          <option value="">-- Selecciona un periodo --</option>
          {periodos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} ({p.fecha_inicio} → {p.fecha_fin})
            </option>
          ))}
        </select>
      </label>

      <table className="w-full table-auto border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1">Alumno</th>
            <th className="border px-2 py-1">Nota Parcial</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumno, index) => (
            <tr key={alumno.id}>
              <td className="border px-2 py-1 text-center">{index + 1}</td>
              <td className="border px-2 py-1">{alumno.nombre} {alumno.apellido}</td>
              <td className="border px-2 py-1 text-center">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={notas[alumno.id] || ''}
                  onChange={(e) => manejarCambio(alumno.id, e.target.value)}
                  className="w-24 border px-2 py-1 rounded text-center"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-6">
        <button
          onClick={guardarNotas}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          💾 Guardar todas las notas
        </button>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          ⬅️ Volver
        </button>
      </div>
    </div>
  );
};

export default RegistroNotasMateria;
