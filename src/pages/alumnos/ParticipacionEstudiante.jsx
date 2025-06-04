import React, { useEffect, useState } from "react";
import { obtenerParticipacionAlumno } from "../../services/alumnoService";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

const ParticipacionEstudiante = ({ alumnoId }) => {
  const [datosAlumno, setDatosAlumno] = useState(null);
  const [gestionSeleccionada, setGestionSeleccionada] = useState("");
  const [graficosVisibles, setGraficosVisibles] = useState({});

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

  const toggleGrafico = (clave) => {
    setGraficosVisibles((prev) => ({
      ...prev,
      [clave]: !prev[clave]
    }));
  };

  if (!datosAlumno) return <p className="p-4 text-gray-500">Cargando participaciones del alumno...</p>;

  const gestionesDisponibles = Object.keys(datosAlumno.participaciones || {});
  const gestionesFiltradas = gestionesDisponibles.filter(
    (g) => gestionSeleccionada === "" || g === gestionSeleccionada
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">
        🙋 Participación de {datosAlumno.alumno_nombre}
      </h1>

      <div className="mb-6">
        <label className="mr-2 font-semibold">📅 Seleccionar gestión:</label>
        <select
          className="border px-3 py-2 rounded text-sm"
          value={gestionSeleccionada}
          onChange={(e) => setGestionSeleccionada(e.target.value)}
        >
          <option value="">-- Todas --</option>
          {gestionesDisponibles.map((g) => (
            <option key={g} value={g}>
              {g} ({datosAlumno.participaciones[g].estado})
            </option>
          ))}
        </select>
      </div>

      {gestionesFiltradas.map((gestion) => {
        const datosGestion = datosAlumno.participaciones[gestion];

        return (
          <div key={gestion} className="mb-8 border rounded shadow bg-white p-5">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              Gestión {gestion}{" "}
              <span className="text-sm text-gray-500">({datosGestion.estado})</span>
            </h2>

            {Object.entries(datosGestion.grados).map(([gradoNombre, gradoData]) => {
              const { estado_aprobacion, periodos } = gradoData;
              const materiasMap = {};

              Object.entries(periodos).forEach(([periodoNombre, materias]) => {
                Object.entries(materias).forEach(([materiaNombre, lista]) => {
                  if (!materiasMap[materiaNombre]) materiasMap[materiaNombre] = [];
                  lista.forEach((p) => {
                    materiasMap[materiaNombre].push({
                      periodo: periodoNombre,
                      valor: p.valor,
                    });
                  });
                });
              });

              return (
                <div key={gradoNombre} className="mb-6">
                  <h3 className="text-lg font-bold text-gray-700 mb-2">
                    {gradoNombre}{" "}
                    <span className="text-sm text-green-600 italic">
                      ({estado_aprobacion})
                    </span>
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(materiasMap).map(([materiaNombre, valores]) => {
                      const clave = `${gestion}-${gradoNombre}-${materiaNombre}`;
                      return (
                        <div
                          key={materiaNombre}
                          className="border rounded-lg p-4 shadow-sm bg-gray-50"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-md font-semibold">{materiaNombre}</h4>
                            <button
                              onClick={() => toggleGrafico(clave)}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {graficosVisibles[clave] ? "Ocultar gráfico" : "Ver gráfico"}
                            </button>
                          </div>

                          <ul className="list-disc pl-5 text-sm text-gray-700">
                            {valores.map((v, idx) => (
                              <li key={idx}>
                                {v.periodo}: <strong>{v.valor}%</strong>
                              </li>
                            ))}
                          </ul>

                          {graficosVisibles[clave] && (
                            <div className="mt-3">
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
                                    stroke="#0ea5e9"
                                    strokeWidth={2}
                                    name="Participación (%)"
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ParticipacionEstudiante;
