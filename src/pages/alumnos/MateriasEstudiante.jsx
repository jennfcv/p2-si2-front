import React, { useEffect, useState } from "react";
import { obtenerMateriasAlumno } from "../../services/alumnoService";

const MateriasEstudiante = ({ alumnoId }) => {
  const [materiasPorGestion, setMateriasPorGestion] = useState({});
  const [gestionSeleccionada, setGestionSeleccionada] = useState("");
  const [nombreAlumno, setNombreAlumno] = useState("");

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const data = await obtenerMateriasAlumno(alumnoId);
        const materiasPorGestion = {};

        data.materias_por_gestion.forEach((item) => {
          const { gestion, grado, estado, materias } = item;

          if (!materiasPorGestion[gestion]) {
            materiasPorGestion[gestion] = {
              estado,
              grados: {},
            };
          }

          materiasPorGestion[gestion].grados[grado] = {
            materias: materias.map((m) => ({
              materia_nombre: m.nombre,
              materia_codigo: m.id,
            })),
          };
        });

        setMateriasPorGestion(materiasPorGestion);
        setNombreAlumno(data.alumno_nombre || `Alumno ${alumnoId}`);
      } catch (error) {
        console.error("Error al obtener las materias:", error);
      }
    };

    fetchMaterias();
  }, [alumnoId]);

  const gestionesDisponibles = Object.keys(materiasPorGestion);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">
        📚 Materias de {nombreAlumno}
      </h1>

      {gestionesDisponibles.length > 0 && (
        <div className="mb-6">
          <label className="mr-2 font-semibold">📅 Seleccionar gestión:</label>
          <select
            className="border px-3 py-2 rounded text-sm"
            value={gestionSeleccionada}
            onChange={(e) => setGestionSeleccionada(e.target.value)}
          >
            <option value="">-- Todas --</option>
            {gestionesDisponibles.map((gestion) => (
              <option key={gestion} value={gestion}>
                {gestion} ({materiasPorGestion[gestion].estado})
              </option>
            ))}
          </select>
        </div>
      )}

      {gestionesDisponibles
        .filter(
          (gestion) =>
            gestionSeleccionada === "" || gestion === gestionSeleccionada
        )
        .map((gestion) => {
          const datosGestion = materiasPorGestion[gestion];
          return (
            <div
              key={gestion}
              className="mb-8 border rounded-lg shadow-sm bg-white p-5"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-3">
                Gestión {gestion}{" "}
                <span className="text-sm text-gray-500">
                  ({datosGestion.estado})
                </span>
              </h2>

              {Object.entries(datosGestion.grados).map(([grado, datosGrado]) => (
                <div key={grado} className="mb-4">
                  <h3 className="text-md font-bold text-gray-700 mb-2">{grado}</h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {Array.isArray(datosGrado.materias) && datosGrado.materias.length > 0 ? (
                      datosGrado.materias.map((materia, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 rounded px-4 py-2 text-sm text-gray-800 shadow-sm"
                        >
                          <span className="font-medium">{materia.materia_nombre}</span>{" "}
                          <span className="text-gray-500">({materia.materia_codigo})</span>
                        </div>
                      ))
                    ) : (
                      <p className="italic text-gray-600">No hay materias registradas.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
    </div>
  );
};

export default MateriasEstudiante;
