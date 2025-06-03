import React, { useEffect, useState } from "react";
import { obtenerAsistenciasAlumno } from "../../services/alumnoService";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

const AsistenciasEstudiante = ({ alumnoId }) => {
  const [datosAlumno, setDatosAlumno] = useState(null);
  const [gestionSeleccionada, setGestionSeleccionada] = useState("");

  useEffect(() => {
    const fetchAsistencias = async () => {
      try {
        const data = await obtenerAsistenciasAlumno(alumnoId);
        setDatosAlumno(data);
      } catch (error) {
        console.error("Error al obtener asistencias del alumno:", error);
      }
    };

    fetchAsistencias();
  }, [alumnoId]);

  if (!datosAlumno) return <p>Cargando asistencias del alumno...</p>;

  const gestionesDisponibles = Object.keys(datosAlumno.asistencias || {});

  const gestionesFiltradas = gestionesDisponibles.filter(
    (gestion) => gestionSeleccionada === "" || gestion === gestionSeleccionada
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Asistencias de {datosAlumno.alumno_nombre}
      </h1>

      <div className="mb-4">
        <label className="font-semibold mr-2">Seleccionar gestión:</label>
        <select
          className="border px-2 py-1 rounded"
          value={gestionSeleccionada}
          onChange={(e) => setGestionSeleccionada(e.target.value)}
        >
          <option value="">-- Todas --</option>
          {gestionesDisponibles.map((gestion) => (
            <option key={gestion} value={gestion}>
              {gestion} ({datosAlumno.asistencias[gestion].estado})
            </option>
          ))}
        </select>
      </div>

      {gestionesFiltradas.map((gestion) => {
        const datosGestion = datosAlumno.asistencias[gestion];

        return (
          <div key={gestion} className="mb-6 border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">
              Gestión {gestion}{" "}
              <span className="text-sm text-gray-500">
                ({datosGestion.estado})
              </span>
            </h2>

            {Object.entries(datosGestion.grados).map(([gradoNombre, gradoData]) => {
              const { estado_aprobacion, periodos } = gradoData;

              const materiasMap = {};

              Object.entries(periodos).forEach(([periodoNombre, materias]) => {
                Object.entries(materias).forEach(([materiaNombre, listaAsistencias]) => {
                  if (!materiasMap[materiaNombre]) {
                    materiasMap[materiaNombre] = [];
                  }
                  listaAsistencias.forEach((asistencia) => {
                    materiasMap[materiaNombre].push({
                      periodo: periodoNombre,
                      valor: asistencia.valor,
                    });
                  });
                });
              });

              return (
                <div key={gradoNombre} className="mb-4">
                  <h3 className="text-lg font-bold mb-1">{gradoNombre}</h3>
                  <p className="text-sm text-blue-600 mb-2">
                    Estado de aprobación: <strong>{estado_aprobacion}</strong>
                  </p>

                  {Object.keys(materiasMap).length === 0 ? (
                    <p className="text-gray-500 italic">
                      No hay asistencias registradas.
                    </p>
                  ) : (
                    Object.entries(materiasMap).map(([materiaNombre, valores]) => (
                      <div key={materiaNombre} className="mb-6 p-3 border rounded">
                        <h4 className="text-md font-semibold mb-1">
                          {materiaNombre}
                        </h4>

                        <ul className="list-disc pl-6 mb-2">
                          {valores.map((a, idx) => (
                            <li key={idx}>
                              {a.periodo}: <strong>{a.valor}%</strong>
                            </li>
                          ))}
                        </ul>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={valores}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="periodo" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="valor" fill="#4caf50" name="Asistencia" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ))
                  )}
                </div>
              );
            })}

          </div>
        );
      })}
    </div>
  );
};

export default AsistenciasEstudiante;
