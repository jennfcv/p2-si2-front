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

      // ✅ Recorremos el array dentro de `data.materias_por_gestion`
      data.materias_por_gestion.forEach((item) => {
        const { gestion, grado, estado, materias } = item;

        if (!materiasPorGestion[gestion]) {
          materiasPorGestion[gestion] = {
            estado: estado,
            grados: {}
          };
        }

        // Aseguramos que los grados estén agrupados por nombre
        materiasPorGestion[gestion].grados[grado] = {
          materias: materias.map((m) => ({
            materia_nombre: m.nombre,
            materia_codigo: m.id
          }))
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Materias de {nombreAlumno}</h1>

      {gestionesDisponibles.length > 0 && (
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
            <div key={gestion} className="mb-6 border p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">
                Gestión {gestion}{" "}
                <span className="text-sm text-gray-500">
                  ({datosGestion.estado})
                </span>
              </h2>

              {Object.keys(datosGestion.grados).map((grado) => {
                const datosGrado = datosGestion.grados[grado];
                return (
                  <div key={grado} className="mb-4">
                    <h3 className="font-semibold mb-2">{grado}</h3>
                    <ul className="list-disc pl-5">
                      {Array.isArray(datosGrado.materias) ? (
                        datosGrado.materias.map((materia, index) => (
                          <li key={index}>
                            {materia.materia_nombre} ({materia.materia_codigo})
                          </li>
                        ))
                      ) : (
                        <li className="italic text-gray-600">
                          {datosGrado.materias}
                        </li>
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default MateriasEstudiante;
