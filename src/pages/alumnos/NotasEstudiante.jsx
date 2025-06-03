import React, { useEffect, useState } from "react";
import { obtenerNotasAlumno } from "../../services/alumnoService";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

const NotasEstudiante = ({ alumnoId }) => {
  const [datosAlumno, setDatosAlumno] = useState(null);
  const [gestionSeleccionada, setGestionSeleccionada] = useState("");

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const data = await obtenerNotasAlumno(alumnoId);
        setDatosAlumno(data);
      } catch (error) {
        console.error("Error al obtener notas del alumno:", error);
      }
    };

    fetchNotas();
  }, [alumnoId]);

  if (!datosAlumno) return <p>Cargando datos del alumno...</p>;

  const gestionesDisponibles = Object.keys(datosAlumno.notas || {});

  const gestionesFiltradas = gestionesDisponibles.filter(
    (gestion) => gestionSeleccionada === "" || gestion === gestionSeleccionada
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Notas de {datosAlumno.alumno_nombre}
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
              {gestion} ({datosAlumno.notas[gestion].estado})
            </option>
          ))}
        </select>
      </div>

      {gestionesFiltradas.map((gestion) => {
        const datosGestion = datosAlumno.notas[gestion];

        return (
          <div key={gestion} className="mb-6 border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">
              Gestión {gestion}{" "}
              <span className="text-sm text-gray-500">
                ({datosGestion.estado})
              </span>
            </h2>

            {Object.entries(datosGestion.grados).map(
              ([gradoNombre, gradoData]) => {
                const materiasMap = {};

                Object.entries(gradoData.periodos).forEach(([periodoNombre, materias]) => {
                  Object.entries(materias).forEach(([materiaNombre, listaNotas]) => {
                    if (!materiasMap[materiaNombre]) {
                      materiasMap[materiaNombre] = [];
                    }
                    listaNotas.forEach((nota) => {
                      materiasMap[materiaNombre].push({
                        periodo: periodoNombre,
                        nota: nota.valor,
                      });
                    });
                  });
                });

                return (
                  <div key={gradoNombre} className="mb-4">
                    <h3 className="text-lg font-bold mb-1">
                      {gradoNombre}{" "}
                      <span className="text-sm text-gray-600 italic">
                        ({gradoData.estado_aprobacion})
                      </span>
                    </h3>

                    {Object.keys(materiasMap).length === 0 ? (
                      <p className="text-gray-500 italic">No hay notas registradas.</p>
                    ) : (
                      Object.entries(materiasMap).map(([materiaNombre, notasMateria]) => (
                        <div
                          key={materiaNombre}
                          className="mb-6 p-3 border rounded"
                        >
                          <h4 className="text-md font-semibold mb-1">
                            {materiaNombre}
                          </h4>

                          <ul className="list-disc pl-6 mb-2">
                            {notasMateria.map((n, idx) => (
                              <li key={idx}>
                                {n.periodo}: <strong>{n.nota}</strong>
                              </li>
                            ))}
                          </ul>

                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={notasMateria}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="periodo" />
                              <YAxis domain={[0, 100]} />
                              <Tooltip />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey="nota"
                                stroke="#8884d8"
                                name={materiaNombre}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      ))
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

export default NotasEstudiante;
