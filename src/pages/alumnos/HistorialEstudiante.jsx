// export default HistorialEstudiante;
import React, { useEffect, useState } from "react";
import { obtenerHistorialAcademico, obtenerPromediosPorGrado, } from "../../services/alumnoService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const HistorialEstudiante = ({ alumnoId }) => {
  const [datos, setDatos] = useState(null);
  const [promedios, setPromedios] = useState(null);
  const [vista, setVista] = useState("detalle");
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const historial = await obtenerHistorialAcademico(alumnoId);
        const promedios = await obtenerPromediosPorGrado(alumnoId);
        setDatos(historial);
        setPromedios(promedios);
      } catch (err) {
        setError("No se pudieron cargar los datos del historial.");
      }
    };

    if (alumnoId) cargarDatos();
  }, [alumnoId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!datos || !promedios) return <p>Cargando datos...</p>;

  // Agrupar historial por gestión y grado
  const historialAgrupado = {};
  datos.historial.forEach((item) => {
    const key = `${item.gestion}-${item.grado}`;
    if (!historialAgrupado[key]) {
      historialAgrupado[key] = {
        gestion: item.gestion,
        grado: item.grado,
        materias: [],
      };
    }
    historialAgrupado[key].materias.push(item);
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Historial Académico de {datos.alumno_nombre}
      </h1>

      {/* Selector de vista */}
      <div className="mb-6">
        <label className="mr-2 font-semibold">Vista:</label>
        <select
          className="border rounded px-2 py-1"
          value={vista}
          onChange={(e) => setVista(e.target.value)}
        >
          <option value="detalle">Por Materia</option>
          <option value="promedio">Promedios por Grado</option>
        </select>
      </div>

      {/* Vista de detalle */}
      {vista === "detalle" &&
        Object.values(historialAgrupado).map((grupo, index) => (
          <div key={index} className="mb-6 border rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-2">
              Gestión {grupo.gestion} - {grupo.grado}
            </h2>
            <table className="min-w-full table-auto border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2 text-left">Materia</th>
                  <th className="border px-4 py-2 text-center">Nota Final</th>
                  <th className="border px-4 py-2 text-center">Estado</th>
                </tr>
              </thead>
              <tbody>
                {grupo.materias.map((materia, idx) => (
                  <tr key={idx} className="text-sm">
                    <td className="border px-4 py-2">{materia.materia}</td>
                    <td className="border px-4 py-2 text-center">
                      {materia.nota_final}
                    </td>
                    <td
                      className={`border px-4 py-2 text-center font-semibold ${materia.estado === "Aprobado"
                        ? "text-green-600"
                        : "text-red-600"
                        }`}
                    >
                      {materia.estado}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

      {/* Vista de promedios */}
      {vista === "promedio" && (
        <div className="mt-4">
          {promedios.promedios_por_grado.map((item, idx) => (
            <div key={idx} className="mb-4 border rounded shadow p-4">
              <h3 className="text-lg font-semibold mb-2">
                Gestión {item.gestion} - {item.grado}
              </h3>
              <p>
                <strong>Promedio:</strong> {item.promedio}
              </p>
              <p
                className={`font-semibold ${item.estado === "Aprobado" ? "text-green-600" : "text-red-600"
                  }`}
              >
                {item.estado}
              </p>
            </div>
          ))}<ResponsiveContainer width="100%" height={300}>
            <BarChart data={promedios.promedios_por_grado}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grado" />
              <XAxis dataKey={(item) => `${item.grado} (${item.gestion})`} />

              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="promedio" fill="#3182ce" name="Promedio por Grado" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default HistorialEstudiante;
