import React, { useEffect, useState } from "react";
import axios from "axios";
import { obtenerNotasAlumno } from "../../services/alumnoService";

const PrediccionEstudiante = ({ alumnoId }) => {
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const predecirAutomaticamente = async () => {
      setError("");
      try {
        // Obtener todas las notas del alumno
        const datos = await obtenerNotasAlumno(alumnoId);
        const gestiones = Object.values(datos.notas || {});
        let totalNotas = 0, totalAsistencias = 0, totalParticipacion = 0, conteo = 0;

        gestiones.forEach((g) => {
          Object.values(g.grados || {}).forEach((grado) => {
            Object.values(grado.periodos || {}).forEach((materias) => {
              Object.values(materias || {}).forEach((notas) => {
                notas.forEach((n) => {
                  if (n.valor !== null && !isNaN(n.valor)) {
                    totalNotas += n.valor;
                    totalAsistencias += n.asistencia || 0;
                    totalParticipacion += n.participacion || 0;
                    conteo++;
                  }
                });
              });
            });
          });
        });

        const promedioNota = totalNotas / conteo;
        const promedioAsistencia = totalAsistencias / conteo;
        const promedioParticipacion = totalParticipacion / conteo;

        // Llamar a la API de predicción
        const res = await axios.post("http://localhost:5000/api/consulta-prediccion", {
          alumno_id: alumnoId,
          nota_parcial: parseFloat(promedioNota.toFixed(2)),
          asistencia: parseFloat(promedioAsistencia.toFixed(2)),
          participacion: parseFloat(promedioParticipacion.toFixed(2))
        });

        setResultado({
          prediccion: res.data.prediccion,
          nota: promedioNota,
          asistencia: promedioAsistencia,
          participacion: promedioParticipacion
        });
      } catch (err) {
        console.error(err);
        setError("No se pudo generar la predicción.");
      } finally {
        setCargando(false);
      }
    };

    if (alumnoId) predecirAutomaticamente();
  }, [alumnoId]);

  if (cargando) return <p className="text-gray-500">🔄 Generando predicción...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 border rounded shadow text-sm sm:text-base bg-white">
      <h2 className="text-xl font-bold text-blue-700 mb-4">🧠 Predicción Académica Automática</h2>

      <div className="bg-blue-50 p-4 rounded-md mb-4">
        <p><strong>Promedio de nota:</strong> {resultado.nota.toFixed(2)}</p>
        <p><strong>Promedio de asistencia:</strong> {resultado.asistencia.toFixed(2)}%</p>
        <p><strong>Promedio de participación:</strong> {resultado.participacion.toFixed(2)}%</p>
      </div>

      <div className={`p-4 rounded-md text-white font-semibold 
        ${resultado.prediccion === "Aprobado" ? "bg-green-600" : "bg-red-600"}`}>
        Resultado de predicción: {resultado.prediccion}
      </div>
    </div>
  );
};

export default PrediccionEstudiante;
