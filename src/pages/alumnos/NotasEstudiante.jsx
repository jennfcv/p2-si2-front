import React, { useEffect, useState } from "react";
import { obtenerNotasAlumno } from "../../services/alumnoService";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

const NotasEstudiante = ({ alumnoId }) => {
  const [datosAlumno, setDatosAlumno] = useState(null);
  const [gestionSeleccionada, setGestionSeleccionada] = useState("");
  const [graficosVisibles, setGraficosVisibles] = useState({});

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

  const toggleGrafico = (materiaClave) => {
    setGraficosVisibles((prev) => ({
      ...prev,
      [materiaClave]: !prev[materiaClave],
    }));
  };

  if (!datosAlumno) return <p className="p-4 text-gray-500">Cargando datos del alumno...</p>;

  const gestionesDisponibles = Object.keys(datosAlumno.notas || {});
  const gestionesFiltradas = gestionesDisponibles.filter(
    (g) => gestionSeleccionada === "" || g === gestionSeleccionada
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📘 Notas de {datosAlumno.alumno_nombre}</h1>

      <div className="mb-6">
        <label className="font-medium mr-2">📅 Seleccionar gestión:</label>
        <select
          className="border px-3 py-2 rounded text-sm"
          value={gestionSeleccionada}
          onChange={(e) => setGestionSeleccionada(e.target.value)}
        >
          <option value="">-- Todas --</option>
          {gestionesDisponibles.map((g) => (
            <option key={g} value={g}>
              {g} ({datosAlumno.notas[g].estado})
            </option>
          ))}
        </select>
      </div>

      {gestionesFiltradas.map((gestion) => {
        const datosGestion = datosAlumno.notas[gestion];

        return (
          <div key={gestion} className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-blue-700">
              Gestión {gestion}{" "}
              <span className="text-sm text-gray-500">({datosGestion.estado})</span>
            </h2>

            {Object.entries(datosGestion.grados).map(([gradoNombre, gradoData]) => {
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
                <div key={gradoNombre} className="mb-6">
                  <h3 className="text-lg font-bold text-gray-700 mb-2">
                    {gradoNombre}{" "}
                    <span className="text-sm text-gray-500 italic">
                      ({gradoData.estado_aprobacion})
                    </span>
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(materiasMap).map(([materiaNombre, notasMateria]) => {
                      const clave = `${gestion}-${gradoNombre}-${materiaNombre}`;
                      return (
                        <div key={materiaNombre} className="border rounded-lg p-4 shadow-sm bg-white">
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
                            {notasMateria.map((n, idx) => (
                              <li key={idx}>
                                {n.periodo}: <strong>{n.nota}</strong>
                              </li>
                            ))}
                          </ul>

                          {graficosVisibles[clave] && (
                            <div className="mt-3">
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

export default NotasEstudiante;
