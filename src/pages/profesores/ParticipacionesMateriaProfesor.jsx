// //pages/profesores/ParticipacionesMateriaProfesor.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
// import { obtenerParticipacionesPorGrado } from '../../services/profesorService';

// const ParticipacionesMateriaProfesor = () => {
//     const { profesorId, gradoId } = useParams();
//     const [searchParams] = useSearchParams();
//     const nivelId = searchParams.get('nivel_id');

//     const [datos, setDatos] = useState(null);
//     const [cargando, setCargando] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//             <button
//                 onClick={() => navigate(`/panel/profesores/${profesorId}/tabs?tab=Materias`)}
//                 className="mb-4 px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
//             >
//                 ⬅️ Volver
//             </button>

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { obtenerParticipacionesPorMateria } from '../../services/profesorService';

const ParticipacionesMateriaProfesor = () => {
    const { profesorId, materiaId } = useParams();
    const [searchParams] = useSearchParams();
    const gradoId = searchParams.get('grado_id');
    const nivelId = searchParams.get('nivel_id');

    const [datos, setDatos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const resultado = await obtenerParticipacionesPorMateria(
                    gradoId,
                    profesorId,
                    nivelId,
                    materiaId
                );
                setDatos(resultado);
            } catch (err) {
                setError('Error al cargar los datos.');
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, [gradoId, profesorId, nivelId, materiaId]);

    if (loading) return <p className="text-center">Cargando...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!datos) return null;

    return (
        <div className="p-4">
            <button
                onClick={() => navigate(`/panel/profesores/${profesorId}/tabs?tab=Materias`)}
                className="mb-4 px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
                ⬅️ Volver
            </button>
            <button
                onClick={() =>
                    navigate(`/panel/profesores/${profesorId}/registro-participacion/${gradoId}?nivel_id=${nivelId}&materia_id=${materiaId}`)
                }
                className="mb-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
                ➕ Registrar participación
            </button>

            <h2 className="text-xl font-semibold mb-2">
                Participaciones – {datos.materia?.nombre} ({datos.nombre_grado} – {datos.nombre_nivel})
            </h2>
            <p className="mb-4">Gestión: {datos.gestion}</p>

            {datos.participaciones_por_periodo.map((periodo) => (
                <div key={periodo.periodo_id} className="mb-6 border p-4 rounded shadow">
                    <h3 className="text-lg font-bold mb-2">{periodo.periodo}</h3>
                    <table className="min-w-full text-sm text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-2 py-1">#</th>
                                <th className="px-2 py-1">Alumno</th>
                                <th className="px-2 py-1">Participaciones</th>
                                <th className="px-2 py-1">No participó</th>
                                <th className="px-2 py-1">Total Esperadas</th>
                                <th className="px-2 py-1">Nota</th>
                            </tr>
                        </thead>
                        <tbody>
                            {periodo.participaciones.map((alumno, index) => (
                                <tr key={alumno.alumno_id} className="border-b">
                                    <td className="px-2 py-1">{index + 1}</td>
                                    <td className="px-2 py-1">{alumno.nombre} {alumno.apellido}</td>
                                    <td className="px-2 py-1 text-center">{alumno.participaciones_registradas}</td>
                                    <td className="px-2 py-1 text-center">{alumno.no_participo}</td>
                                    <td className="px-2 py-1 text-center">{alumno.total_esperadas}</td>
                                    <td className="px-2 py-1 text-center font-semibold">{alumno.nota_participacion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default ParticipacionesMateriaProfesor;
