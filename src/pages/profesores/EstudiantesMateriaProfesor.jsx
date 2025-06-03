import { useEffect, useState } from 'react';
import { obtenerEstudiantesPorMateria } from '../../services/profesorService';
import { useParams, useNavigate } from 'react-router-dom';

const EstudiantesMateriaProfesor = () => {
    const { profesorId, materiaId } = useParams(); // Asegúrate que estén definidos en la ruta
    const [estudiantes, setEstudiantes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [total, setTotal] = useState(0);
    const [materia, setMateria] = useState('');
    const [gestion, setGestion] = useState('');
    const [profesor, setProfesor] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (!profesorId || !materiaId) return;

        const fetchEstudiantes = async () => {
            try {
                const data = await obtenerEstudiantesPorMateria(profesorId, materiaId);
                setEstudiantes(data.estudiantes || []);
                setTotal(data.total_alumnos || 0);
                setMateria(data.materia || '');
                setGestion(data.gestion || '');
                setProfesor(data.profesor || '');
            } catch (error) {
                console.error('❌ Error al obtener estudiantes:', error);
            } finally {
                setCargando(false);
            }
        };

        fetchEstudiantes();
    }, [profesorId, materiaId]);

    if (cargando) return <p>Cargando estudiantes...</p>;

    return (
        <div>
            <button
                onClick={() => navigate(`/panel/profesores/${profesorId}/tabs?tab=Materias`)}
                className="mb-4 px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
                ⬅️ Volver
            </button>
            <h2 className="text-lg font-semibold mb-2">Materia: {materia}</h2>
            <p className="text-sm text-gray-600 mb-4">
                Docente: {profesor} | Gestión: {gestion} | Total estudiantes: {total}
            </p>

            <table className="min-w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-2 py-1">#</th>
                        <th className="border px-2 py-1">Nombre</th>
                        <th className="border px-2 py-1">Apellido</th>
                        <th className="border px-2 py-1">Grado</th>
                        <th className="border px-2 py-1">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {estudiantes.map((est, index) => (
                        <tr key={est.id}>
                            <td className="border px-2 py-1">{index + 1}</td>
                            <td className="border px-2 py-1">{est.nombre}</td>
                            <td className="border px-2 py-1">{est.apellido}</td>
                            <td className="border px-2 py-1">{est.grado}</td>
                            <td className="border px-2 py-1">{est.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EstudiantesMateriaProfesor;
