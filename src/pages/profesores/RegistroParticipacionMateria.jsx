//pages/
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  registrarParticipacion,
  obtenerDetalleEstudiantesMateriaRegistroAsistencia,
  obtenerPeriodosActivos
} from '../../services/profesorService';

const RegistroParticipacionMateria = () => {
  const { gradoId, profesorId } = useParams();
  const [searchParams] = useSearchParams();
  const materiaId = searchParams.get('materia_id');
  const nivelId = searchParams.get('nivel_id');

  const [alumnos, setAlumnos] = useState([]);
  const [fecha, setFecha] = useState('');
  const [periodos, setPeriodos] = useState([]);
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('');
  const [participaciones, setParticipaciones] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const alumnosData = await obtenerDetalleEstudiantesMateriaRegistroAsistencia(profesorId, materiaId);
        const periodosData = await obtenerPeriodosActivos();
        setAlumnos(alumnosData);
        setPeriodos(periodosData);
      } catch (error) {
        console.error('❌ Error al cargar datos:', error);
      }
    };
    cargarDatos();
  }, [profesorId, materiaId]);

  // Ajustar fecha cuando se selecciona un periodo
  useEffect(() => {
    if (periodoSeleccionado) {
      const periodo = periodos.find((p) => p.id === parseInt(periodoSeleccionado));
      if (periodo?.fecha_inicio) {
        setFecha(periodo.fecha_inicio);
      }
    }
  }, [periodoSeleccionado]);

  const manejarCambio = (alumnoId, valor) => {
    setParticipaciones((prev) => ({
      ...prev,
      [alumnoId]: valor
    }));
  };

  const enviarParticipaciones = async () => {
    const periodoActivo = periodos.find((p) => p.id === parseInt(periodoSeleccionado));
    if (!periodoActivo) {
      alert('⚠️ Debes seleccionar un periodo válido.');
      return;
    }

    const fechaSeleccionada = new Date(fecha);
    const inicio = new Date(periodoActivo.fecha_inicio);
    const fin = new Date(periodoActivo.fecha_fin);

    if (fechaSeleccionada < inicio || fechaSeleccionada > fin) {
      alert(`⚠️ La fecha debe estar entre ${periodoActivo.fecha_inicio} y ${periodoActivo.fecha_fin}.`);
      return;
    }

    try {
      for (const [alumnoId, valor] of Object.entries(participaciones)) {
        await registrarParticipacion({
          alumno_id: parseInt(alumnoId),
          grado_id: parseInt(gradoId),
          periodo_id: parseInt(periodoSeleccionado),
          tipo: 'participacion',
          valor: parseFloat(valor),
          fecha,
          materia_id: parseInt(materiaId),
          observaciones:
            valor >= 95
              ? 'Participación destacada'
              : valor >= 80
              ? 'Buena participación'
              : valor >= 50
              ? 'Participó poco'
              : 'No participó'
        });
      }
      alert('✅ Participaciones registradas correctamente.');
      navigate(-1);
    } catch (err) {
      alert('❌ Error: ' + err.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-purple-800">
        Registro de Participación – Grado {gradoId}
      </h2>

      <label className="block mb-4 text-sm text-gray-700">
        Periodo:
        <select
          value={periodoSeleccionado}
          onChange={(e) => setPeriodoSeleccionado(e.target.value)}
          className="ml-2 border px-2 py-1 rounded"
        >
          <option value="">Selecciona un periodo</option>
          {periodos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} ({p.fecha_inicio} → {p.fecha_fin})
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-2 text-sm text-gray-700">
        Fecha:
        <input
          type="date"
          value={fecha}
          min={
            periodoSeleccionado
              ? periodos.find((p) => p.id === parseInt(periodoSeleccionado))?.fecha_inicio
              : ''
          }
          max={
            periodoSeleccionado
              ? periodos.find((p) => p.id === parseInt(periodoSeleccionado))?.fecha_fin
              : ''
          }
          disabled={!periodoSeleccionado}
          onChange={(e) => setFecha(e.target.value)}
          className="ml-2 border px-2 py-1 rounded"
        />
      </label>

      <table className="min-w-full mt-4 bg-white border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 border">#</th>
            <th className="px-3 py-2 border">Nombre</th>
            <th className="px-3 py-2 border">Apellido</th>
            <th className="px-3 py-2 border">Valor (%)</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((a, i) => (
            <tr key={a.id}>
              <td className="border px-2 py-1 text-center">{i + 1}</td>
              <td className="border px-2 py-1 text-center">{a.nombre}</td>
              <td className="border px-2 py-1 text-center">{a.apellido}</td>
              <td className="border px-2 py-1 text-center">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={participaciones[a.id] || ''}
                  onChange={(e) => manejarCambio(a.id, e.target.value)}
                  className="w-20 border rounded px-2 py-1 text-center"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={enviarParticipaciones}
        className="mt-6 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        ✅ Registrar Participaciones
      </button>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        ⬅️ Volver
      </button>
    </div>
  );
};

export default RegistroParticipacionMateria;
