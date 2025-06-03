import React, { useEffect, useState } from 'react';
import { obtenerMateriasDelProfesor } from '../../services/profesorService';
import { useNavigate } from 'react-router-dom';

const MateriasProfesor = ({ profesorId }) => {
    const navigate = useNavigate();
    const [profesor, setProfesor] = useState(null);
    const [materias, setMaterias] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setCargando(true);
                const data = await obtenerMateriasDelProfesor(profesorId);
                setProfesor(data.profesor);
                setMaterias(data.materias_asignadas);
            } catch (error) {
                console.error('Error al obtener materias:', error);
            } finally {
                setCargando(false);
            }
        };

        if (profesorId) {
            fetchData();
        }
    }, [profesorId]);

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4">Materias Asignadas</h2>

            {profesor && materias.length > 0 && (
                <div className="mb-4 text-gray-700 text-sm sm:text-base">
                    <strong>Profesor:</strong> {profesor.nombre} {profesor.apellido} ({profesor.estado}) – Gestión: {materias[0].gestion}
                </div>
            )}


            {cargando ? (
                <p className="text-gray-500">Cargando materias...</p>
            ) : materias.length === 0 ? (
                <p className="text-gray-500">No hay materias asignadas.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 bg-white shadow text-xs sm:text-sm">
                        <thead className="bg-gray-100">
                            <tr className="text-center">
                                <th className="px-4 py-2 border-b">#</th>
                                <th className="px-4 py-2 border-b">Materia</th>
                                <th className="px-4 py-2 border-b">Grado</th>
                                <th className="px-4 py-2 border-b">Nivel</th>
                                <th className="px-4 py-2 border-b">Gestión</th>
                                <th className="px-4 py-2 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {materias.map((m, index) => (
                                <tr key={m.materia_id} className="hover:bg-gray-50 text-center">
                                    <td className="px-4 py-2 border-b">{index + 1}</td>
                                    <td className="px-4 py-2 border-b">{m.materia}</td>
                                    <td className="px-4 py-2 border-b">{m.grado}</td>
                                    <td className="px-4 py-2 border-b">{m.nivel}</td>
                                    <td className="px-4 py-2 border-b">{m.gestion}</td>
                                    <td className="px-4 py-2 border-b space-x-1">
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/panel/profesor/${profesorId}/materia/${m.materia_id}/notas?grado_id=${m.grado_id}&nivel_id=${m.nivel_id}`
                                                )
                                            }
                                            className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                                        >
                                            Notas
                                        </button>
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/panel/profesor/${profesorId}/grado/${m.grado_id}/asistencias?nivel_id=${m.nivel_id}&materia_id=${m.materia_id}`
                                                )
                                            }
                                            className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                                        >
                                            Asistencias
                                        </button>
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/panel/profesor/${profesorId}/materia/${m.materia_id}/participaciones?grado_id=${m.grado_id}&nivel_id=${m.nivel_id}`
                                                )
                                            }
                                            className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                                        >
                                            Participaciones
                                        </button>

                                        <button
                                            onClick={() => navigate(`/panel/profesor/${profesorId}/materia/${m.materia_id}/estudiantes`)}
                                            className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                                        >
                                            Estudiantes
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MateriasProfesor;
