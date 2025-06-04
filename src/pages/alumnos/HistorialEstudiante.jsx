import React, { useEffect, useState } from "react";
import {
  obtenerHistorialAcademico,
  obtenerPromediosPorGrado,
} from "../../services/alumnoService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

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
  if (!datos || !promedios) return <p className="text-gray-500 p-4">Cargando datos...</p>;

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
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">
        📚 Historial Académico de {datos.alumno_nombre}
      </h1>

      <div className="mb-6">
        <label className="mr-2 font-semibold">Vista:</label>
        <select
          className="border px-3 py-2 rounded text-sm"
          value={vista}
          onChange={(e) => setVista(e.target.value)}
        >
          <option value="detalle">📘 Por Materia</option>
          <option value="promedio">📊 Promedios por Grado</option>
        </select>
      </div>

      {vista === "detalle" &&
        Object.values(historialAgrupado).map((grupo, index) => (
          <div key={index} className="mb-6 border rounded-lg shadow bg-white p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Gestión {grupo.gestion} - {grupo.grado}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2 text-left">Materia</th>
                    <th className="border px-4 py-2 text-center">Nota Final</th>
                    <th className="border px-4 py-2 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {grupo.materias.map((materia, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{materia.materia}</td>
                      <td className="border px-4 py-2 text-center font-medium">{materia.nota_final}</td>
                      <td className="border px-4 py-2 text-center">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                            materia.estado === "Aprobado"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {materia.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

      {vista === "promedio" && (
        <div className="mt-4 space-y-6">
          {promedios.promedios_por_grado.map((item, idx) => (
            <div key={idx} className="border rounded-lg shadow p-4 bg-white">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Gestión {item.gestion} - {item.grado}
              </h3>
              <p className="text-sm">
                <strong>Promedio:</strong> {item.promedio}
              </p>
              <p
                className={`font-semibold text-sm ${
                  item.estado === "Aprobado" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.estado}
              </p>
            </div>
          ))}

          <ResponsiveContainer width="100%" height={320}>
  <BarChart
    data={promedios.promedios_por_grado}
    margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
  >
    <defs>
      <linearGradient id="colorPromedio" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
        <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.8} />
      </linearGradient>
    </defs>

    <CartesianGrid strokeDasharray="3 3" />
    <XAxis
      dataKey={(item) => `${item.grado} (${item.gestion})`}
      tick={{ fontSize: 12 }}
      angle={-25}
      textAnchor="end"
      height={60}
    />
    <YAxis domain={[0, 100]} />
    <Tooltip />
    <Legend />
    <Bar
      dataKey="promedio"
      fill="url(#colorPromedio)"
      name="Promedio por Grado"
      radius={[6, 6, 0, 0]}
      label={{
        position: "top",
        fill: "#1e3a8a",
        fontWeight: 600,
        fontSize: 12,
      }}
    />
  </BarChart>
</ResponsiveContainer>

        </div>
      )}
    </div>
  );
};

export default HistorialEstudiante;
