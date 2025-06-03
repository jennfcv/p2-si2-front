// src/pages/alumnos/PerfilEstudiante.jsx

import React, { useEffect, useState } from 'react';
import { obtenerPerfilAlumno } from '../../services/alumnoService';

const PerfilEstudiante = ({ alumnoId }) => {
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const data = await obtenerPerfilAlumno(alumnoId);
        setPerfil(data);
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      } finally {
        setCargando(false);
      }
    };

    if (alumnoId) {
      fetchPerfil();
    }
  }, [alumnoId]);

  if (cargando) return <p className="text-gray-500">Cargando perfil...</p>;
  if (!perfil) return <p className="text-red-500">No se encontró el perfil.</p>;

  return (
    <div className="text-sm sm:text-base text-gray-800 space-y-2">
      <h3 className="text-xl font-bold text-blue-700 mb-4">Perfil del Estudiante</h3>
      <p><strong>Código:</strong> {perfil.codigo}</p>
      <p><strong>Nombre completo:</strong> {perfil.nombre}</p>
      <p><strong>Género:</strong> {perfil.genero}</p>
      <p><strong>Fecha de nacimiento:</strong> {perfil.apellido}</p>
      <p><strong>Correo electrónico:</strong> {perfil.email}</p>
      <p><strong>Teléfono:</strong> {perfil.telefono}</p>
      <p><strong>Dirección:</strong> {perfil.direccion}</p>
      <p><strong>Grado:</strong> {perfil.grado_nombre}</p>
      <p><strong>Estado:</strong> {perfil.estado}</p>
      <p><strong>Fecha de registro:</strong> {perfil.fecha_registro}</p>
    </div>
  );
};

export default PerfilEstudiante;
