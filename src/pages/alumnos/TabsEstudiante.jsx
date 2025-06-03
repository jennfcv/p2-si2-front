// src/pages/alumnos/TabsEstudiante.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { verAlumno } from '../../services/alumnoService';
import NotasEstudiante from './NotasEstudiante';
import PerfilEstudiante from './PerfilEstudiante';
import AsistenciasEstudiante from './AsistenciasEstudiante';
import ParticipacionEstudiante from './ParticipacionEstudiante';
import PrediccionEstudiante from './PrediccionEstudiante';
import HistorialEstudiante from './HistorialEstudiante';
import MateriasEstudiante from './MateriasEstudiante';



const TabsEstudiante = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'Perfil');
    const [alumno, setAlumno] = useState(null);

    const tabs = [
        'Perfil',
        'Notas parciales',
        'Asistencias',
        'Participaciónes',
        'Predicciónes',
        'Historial',
        'Materias',
    ];

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const data = await verAlumno(id);
                setAlumno(data);
            } catch (error) {
                console.error('❌ Error al obtener alumno:', error);
            }
        };
        obtenerDatos();
    }, [id]);

    const renderContent = () => {
        switch (activeTab) {
            case 'Perfil':
                return <PerfilEstudiante alumnoId={alumno.id} />;
            case 'Notas parciales':
                return <NotasEstudiante alumnoId={alumno.id} />;
            case 'Asistencias':
                return <AsistenciasEstudiante alumnoId={alumno.id} />;
            case 'Participaciónes':
                return <ParticipacionEstudiante alumnoId={alumno.id} />;
            case 'Predicciónes':
                return <PrediccionEstudiante alumnoId={alumno.id} />;
            case 'Historial':
                return <HistorialEstudiante alumnoId={alumno.id} />;
            case 'Materias':
                return <MateriasEstudiante alumnoId={alumno.id} />;
            default:
                return null;
        }

    };

    if (!alumno) return <p className="text-gray-500">Cargando estudiante...</p>;
    return (
        <div className="p-4">
            {/* Encabezado */}
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{alumno.nombre}</h2>
                <p className="text-sm text-gray-500">Estudiante</p>
            </div>
            {/* Navegación de Tabs */}
            <div className="flex flex-wrap border-b border-gray-300 mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === tab
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-600 hover:text-blue-500'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            {/* Contenido del Tab Activo */}
            <div className="bg-white border rounded shadow p-4">
                {renderContent()}
            </div>
        </div>
    );
};

export default TabsEstudiante;
