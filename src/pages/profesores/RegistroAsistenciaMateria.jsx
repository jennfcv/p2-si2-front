// // pages/profesores/RegistroAsistenciaMateria.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
// import {
//   registrarAsistenciaMasiva,
//   obtenerDetalleEstudiantesMateriaRegistroAsistencia,
//   obtenerPeriodosActivos
// } from '../../services/profesorService';

// const RegistroAsistenciaMateria = () => {
//   const { gradoId, profesorId } = useParams();
//   const [searchParams] = useSearchParams();
//   const nivelId = searchParams.get('nivel_id');
//   const materiaId = searchParams.get('materia_id');

//   const [alumnos, setAlumnos] = useState([]);
//   const [fecha, setFecha] = useState('');
//   const [asistencias, setAsistencias] = useState({});
//   const [periodos, setPeriodos] = useState([]);
//   const [periodoSeleccionado, setPeriodoSeleccionado] = useState('');

//   const navigate = useNavigate();

//   useEffect(() => {
//     const cargarAlumnos = async () => {
//       try {
//         const lista = await obtenerDetalleEstudiantesMateriaRegistroAsistencia(profesorId, materiaId);
//         const periodosData = await obtenerPeriodosActivos();
//         setPeriodos(periodosData);
//         setAlumnos(lista);
//       } catch (error) {
//         console.error('❌ Error al obtener estudiantes:', error);
//       }
//     };

//     if (profesorId && materiaId) {
//       cargarAlumnos();
//     }
//   }, [profesorId, materiaId]);

//   // Ajustar fecha automáticamente según el periodo seleccionado
//   useEffect(() => {
//     if (periodoSeleccionado) {
//       const periodo = periodos.find((p) => p.id === parseInt(periodoSeleccionado));
//       if (periodo?.fecha_inicio) {
//         setFecha(periodo.fecha_inicio);
//       }
//     }
//   }, [periodoSeleccionado]);

//   const manejarCambio = (alumnoId, valor) => {
//     setAsistencias((prev) => ({
//       ...prev,
//       [alumnoId]: valor
//     }));
//   };

//   const enviarRegistro = async () => {
//     const periodoActivo = periodos.find((p) => p.id === parseInt(periodoSeleccionado));
//     if (!periodoActivo) {
//       alert('⚠️ Debes seleccionar un periodo válido.');
//       return;
//     }

//     const fechaSeleccionada = new Date(fecha);
//     const inicio = new Date(periodoActivo.fecha_inicio);
//     const fin = new Date(periodoActivo.fecha_fin);

//     if (fechaSeleccionada < inicio || fechaSeleccionada > fin) {
//       alert(`⚠️ La fecha debe estar entre ${periodoActivo.fecha_inicio} y ${periodoActivo.fecha_fin}.`);
//       return;
//     }

//     const datos = Object.entries(asistencias).map(([alumnoId, valor]) => ({
//       alumno_id: parseInt(alumnoId),
//       grado_id: parseInt(gradoId),
//       periodo_id: parseInt(periodoSeleccionado),
//       tipo: 'asistencia',
//       valor: parseFloat(valor),
//       fecha,
//       materia_id: parseInt(materiaId),
//       observaciones:
//         valor >= 95
//           ? 'Presente'
//           : valor >= 80
//           ? 'Llegó tarde'
//           : valor >= 50
//           ? 'Muy tarde'
//           : 'Ausente'
//     }));

//     try {
//       await registrarAsistenciaMasiva(datos);
//       alert('✅ Asistencia registrada correctamente');
//       navigate(-1);
//     } catch (err) {
//       alert('❌ Error: ' + err.message);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4 text-blue-800">
//         Registro de Asistencia – Grado {gradoId}
//       </h2>

//       <label className="block mb-4 text-sm text-gray-700">
//         Periodo:
//         <select
//           value={periodoSeleccionado}
//           onChange={(e) => setPeriodoSeleccionado(e.target.value)}
//           className="ml-2 border px-2 py-1 rounded"
//         >
//           <option value="">Selecciona un periodo</option>
//           {periodos.map((p) => (
//             <option key={p.id} value={p.id}>
//               {p.nombre} ({p.fecha_inicio} → {p.fecha_fin})
//             </option>
//           ))}
//         </select>
//       </label>

//       <label className="block mb-2 text-sm text-gray-700">
//         Fecha:
//         <input
//           type="date"
//           value={fecha}
//           min={
//             periodoSeleccionado
//               ? periodos.find((p) => p.id === parseInt(periodoSeleccionado))?.fecha_inicio
//               : ''
//           }
//           max={
//             periodoSeleccionado
//               ? periodos.find((p) => p.id === parseInt(periodoSeleccionado))?.fecha_fin
//               : ''
//           }
//           disabled={!periodoSeleccionado}
//           onChange={(e) => setFecha(e.target.value)}
//           className="ml-2 border px-2 py-1 rounded"
//         />
//       </label>

//       <table className="min-w-full mt-4 bg-white border text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-3 py-2 border">#</th>
//             <th className="px-3 py-2 border">Nombre</th>
//             <th className="px-3 py-2 border">Apellido</th>
//             <th className="px-3 py-2 border">Valor (%)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {alumnos.map((a, i) => (
//             <tr key={a.id}>
//               <td className="border px-2 py-1 text-center">{i + 1}</td>
//               <td className="border px-2 py-1 text-center">{a.nombre}</td>
//               <td className="border px-2 py-1 text-center">{a.apellido}</td>
//               <td className="border px-2 py-1 text-center">
//                 <input
//                   type="number"
//                   min="0"
//                   max="100"
//                   value={asistencias[a.id] || ''}
//                   onChange={(e) => manejarCambio(a.id, e.target.value)}
//                   className="w-20 border rounded px-2 py-1 text-center"
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button
//         onClick={enviarRegistro}
//         className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//       >
//         ✅ Registrar Asistencias
//       </button>

//       <button
//         onClick={() => navigate(-1)}
//         className="mt-4 px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
//       >
//         ⬅️ Volver
//       </button>
//     </div>
//   );
// };

// export default RegistroAsistenciaMateria;
// pages/profesores/RegistroAsistenciaMateria.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  registrarAsistenciaMasiva,
  obtenerDetalleEstudiantesMateriaRegistroAsistencia,
  obtenerPeriodosActivos
} from '../../services/profesorService';

const RegistroAsistenciaMateria = () => {
  const { gradoId, profesorId } = useParams();
  const [searchParams] = useSearchParams();
  const nivelId = searchParams.get('nivel_id');
  const materiaId = searchParams.get('materia_id');

  const [alumnos, setAlumnos] = useState([]);
  const [fecha, setFecha] = useState('');
  const [asistencias, setAsistencias] = useState({});
  const [observaciones, setObservaciones] = useState({});
  const [periodos, setPeriodos] = useState([]);
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const cargarAlumnos = async () => {
      try {
        const lista = await obtenerDetalleEstudiantesMateriaRegistroAsistencia(profesorId, materiaId);
        const periodosData = await obtenerPeriodosActivos();
        setPeriodos(periodosData);
        setAlumnos(lista);
      } catch (error) {
        console.error('❌ Error al obtener estudiantes:', error);
      }
    };

    if (profesorId && materiaId) {
      cargarAlumnos();
    }
  }, [profesorId, materiaId]);

  // Ajustar fecha automáticamente según el periodo seleccionado
  useEffect(() => {
    if (periodoSeleccionado) {
      const periodo = periodos.find((p) => p.id === parseInt(periodoSeleccionado));
      if (periodo?.fecha_inicio) {
        setFecha(periodo.fecha_inicio);
      }
    }
  }, [periodoSeleccionado]);

  const manejarCambio = (alumnoId, valor) => {
    setAsistencias((prev) => ({
      ...prev,
      [alumnoId]: valor
    }));
  };

  const manejarObservacion = (alumnoId, texto) => {
    setObservaciones((prev) => ({
      ...prev,
      [alumnoId]: texto
    }));
  };

  const enviarRegistro = async () => {
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

    const datos = Object.entries(asistencias).map(([alumnoId, valor]) => ({
      alumno_id: parseInt(alumnoId),
      grado_id: parseInt(gradoId),
      periodo_id: parseInt(periodoSeleccionado),
      tipo: 'asistencia',
      valor: parseFloat(valor),
      fecha,
      materia_id: parseInt(materiaId),
      observaciones: observaciones[alumnoId]?.trim() !== ''
        ? observaciones[alumnoId]
        : valor >= 95
        ? 'Presente'
        : valor >= 80
        ? 'Llegó tarde'
        : valor >= 50
        ? 'Muy tarde'
        : 'Ausente'
    }));

    try {
      await registrarAsistenciaMasiva(datos);
      alert('✅ Asistencia registrada correctamente');
      navigate(-1);
    } catch (err) {
      alert('❌ Error: ' + err.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-blue-800">
        Registro de Asistencia – Grado {gradoId}
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
            <th className="px-3 py-2 border">Observación</th>
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
                  value={asistencias[a.id] || ''}
                  onChange={(e) => manejarCambio(a.id, e.target.value)}
                  className="w-20 border rounded px-2 py-1 text-center"
                />
              </td>
              <td className="border px-2 py-1 text-center">
                <input
                  type="text"
                  value={observaciones[a.id] || ''}
                  onChange={(e) => manejarObservacion(a.id, e.target.value)}
                  placeholder="Opcional"
                  className="w-48 border rounded px-2 py-1 text-center"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={enviarRegistro}
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        ✅ Registrar Asistencias
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

export default RegistroAsistenciaMateria;
