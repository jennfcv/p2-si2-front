import React, { useEffect, useState } from "react";
import { obtenerParticipacionAlumno } from "../../services/alumnoService";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ParticipacionEstudiante = ({ alumnoId }) => {
  const [datosAlumno, setDatosAlumno] = useState(null);
  const [gestionSeleccionada, setGestionSeleccionada] = useState("");

  useEffect(() => {
    const fetchParticipaciones = async () => {
      try {
        const data = await obtenerParticipacionAlumno(alumnoId);
        setDatosAlumno(data);
      } catch (error) {
        console.error("Error al obtener participaciones del alumno:", error);
      }
    };

    fetchParticipaciones();
  }, [alumnoId]);

  if (!datosAlumno) return <p>Cargando participaciones del alumno...</p>;

  const gestionesDisponibles = Object.keys(datosAlumno.participaciones || {});

  const gestionesFiltradas = gestionesDisponibles.filter(
    (gestion) => gestionSeleccionada === "" || gestion === gestionSeleccionada
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Participación de {datosAlumno.alumno_nombre}
      </h1>

      {/* Selector de gestión */}
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
              {gestion} ({datosAlumno.participaciones[gestion].estado})
            </option>
          ))}
        </select>
      </div>

      {/* Mostrar participación por gestión */}
      {gestionesFiltradas.map((gestion) => {
        const datosGestion = datosAlumno.participaciones[gestion];

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
    Object.entries(materias).forEach(([materiaNombre, listaParticipaciones]) => {
      if (!materiasMap[materiaNombre]) {
        materiasMap[materiaNombre] = [];
      }
      listaParticipaciones.forEach((p) => {
        materiasMap[materiaNombre].push({
          periodo: periodoNombre,
          valor: p.valor,
        });
      });
    });
  });

  return (
    <div key={gradoNombre} className="mb-4">
      <h3 className="text-lg font-bold mb-1">
        {gradoNombre}{" "}
        <span className="text-sm text-green-600 italic">
          ({estado_aprobacion})
        </span>
      </h3>

                    {Object.keys(materiasMap).length === 0 ? (
                      <p className="text-gray-500 italic">
                        No hay participaciones registradas.
                      </p>
                    ) : (
                      Object.entries(materiasMap).map(
                        ([materiaNombre, valores]) => (
                          <div
                            key={materiaNombre}
                            className="mb-6 p-3 border rounded"
                          >
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
                              <LineChart data={valores}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="periodo" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
                                <Legend />
                                <Line
                                  type="monotone"
                                  dataKey="valor"
                                  stroke="#1976d2"
                                  name="Participación"
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        )
                      )
                    )}
                  </div>
                );
              }
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ParticipacionEstudiante;
