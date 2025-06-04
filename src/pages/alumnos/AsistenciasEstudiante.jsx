import React, { useEffect, useState } from "react";
import { obtenerAsistenciasAlumno } from "../../services/alumnoService";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

const AsistenciasEstudiante = ({ alumnoId }) => {
  const [datosAlumno, setDatosAlumno] = useState(null);
  const [gestionSeleccionada, setGestionSeleccionada] = useState("");
  const [graficosVisibles, setGraficosVisibles] = useState({});

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

  const toggleGrafico = (clave) => {
    setGraficosVisibles((prev) => ({
      ...prev,
      [clave]: !prev[clave]
    }));
  };

  if (!datosAlumno) return <p className="p-4 text-gray-500">Cargando asistencias del alumno...</p>;

  const gestionesDisponibles = Object.keys(datosAlumno.asistencias || {});
  const gestionesFiltradas = gestionesDisponibles.filter(
    (g) => gestionSeleccionada === "" || g === gestionSeleccionada
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📅 Asistencias de {datosAlumno.alumno_nombre}</h1>

      <div className="mb-6">
        <label className="font-medium mr-2">Seleccionar gestión:</label>
        <select
          className="border px-3 py-2 rounded text-sm"
          value={gestionSeleccionada}
          onChange={(e) => setGestionSeleccionada(e.target.value)}
        >
          <option value="">-- Todas --</option>
          {gestionesDisponibles.map((g) => (
            <option key={g} value={g}>
              {g} ({datosAlumno.asistencias[g].estado})
            </option>
          ))}
        </select>
      </div>

      {gestionesFiltradas.map((gestion) => {
        const datosGestion = datosAlumno.asistencias[gestion];

        return (
          <div key={gestion} className="mb-8 border rounded shadow p-4 bg-white">
            <h2 className="text-xl font-semibold mb-3 text-blue-700">
              Gestión {gestion}{" "}
              <span className="text-sm text-gray-500">({datosGestion.estado})</span>
            </h2>

            {Object.entries(datosGestion.grados).map(([gradoNombre, gradoData]) => {
              const { estado_aprobacion, periodos } = gradoData;

              const materiasMap = {};
              Object.entries(periodos).forEach(([periodoNombre, materias]) => {
                Object.entries(materias).forEach(([materiaNombre, listaAsistencias]) => {
                  if (!materiasMap[materiaNombre]) {
                    materiasMap[materiaNombre] = [];
                  }
                  listaAsistencias.forEach((a) => {
                    materiasMap[materiaNombre].push({
                      periodo: periodoNombre,
                      asistencia: a.valor,
                      falta: 100 - a.valor
                    });
                  });
                });
              });

              return (
                <div key={gradoNombre} className="mb-6">
                  <h3 className="text-lg font-bold text-gray-700 mb-2">
                    {gradoNombre}{" "}
                    <span className="text-sm text-gray-500 italic">
                      ({estado_aprobacion})
                    </span>
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(materiasMap).map(([materiaNombre, asistencias]) => {
                      const clave = `${gestion}-${gradoNombre}-${materiaNombre}`;

                      return (
                        <div key={materiaNombre} className="border rounded-lg p-4 shadow-sm bg-gray-50">
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
                            {asistencias.map((a, idx) => (
                              <li key={idx}>
                                {a.periodo}: <strong>{a.asistencia}%</strong>
                              </li>
                            ))}
                          </ul>

                          {graficosVisibles[clave] && (
                            <div className="mt-3">
                              <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={asistencias}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="periodo" />
                                  <YAxis domain={[0, 100]} />
                                  <Tooltip />
                                  <Legend />
                                  <Bar dataKey="asistencia" fill="#4CAF50" name="Asistencia (%)" />
                                  <Bar dataKey="falta" fill="#F44336" name="Faltas (%)" />
                                </BarChart>
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

export default AsistenciasEstudiante;
