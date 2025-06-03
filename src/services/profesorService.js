//services/profesorService.js
import api from './api';

//funciona
export const listarProfesores = async () => {
  const response = await api.get('/api/profesores');
  return response.data;
};
//funciona
export const obtenerProfesor = async (id) => {
  const response = await api.get(`/api/profesores/${id}`);
  return response.data;
};

//funciona
export const obtenerMateriasDelProfesor = async (profesorId) => {
  const response = await api.get(`/api/profesores/${profesorId}/materias`);
  return response.data;
};
//fuciona
export const obtenerAsistenciasPorGrado = async (gradoId, profesorId, nivelId) => {
  const url = `/api/asistencias/por-grado?grado_id=${gradoId}&profesor_id=${profesorId}&nivel=${nivelId}`;
  const response = await api.get(url);
  return response.data;
};

//funciona
export const obtenerEstudiantesPorMateria = async (profesorId, materiaId) => {
  const response = await api.get(`/api/profesores/${profesorId}/materias/${materiaId}/estudiantes`);
  return response.data;
};

//para registrar asistencia especialmente mismo metodo se ocupa en el bakend qeu obtenerEstudiantesPorMateria
export const obtenerDetalleEstudiantesMateriaRegistroAsistencia = async (profesorId, materiaId) => {
  const response = await api.get(`/api/profesores/${profesorId}/materias/${materiaId}/estudiantes`);
  return response.data.estudiantes;  // devuelve todo el objeto
};

export const obtenerPeriodosActivos = async () => {
  const response = await api.get('/api/periodos/activos');
  return response.data;
};

export const registrarNotasParciales = async (listaDeNotas) => {
  try {
    const respuesta = await api.post('/api/notas-trimestre/registrar-parcial', listaDeNotas); // se envía como arreglo
    return respuesta.data;
  } catch (error) {
    console.error('❌ Error al registrar notas parciales:', error);
    throw error;
  }
};



export const obtenerParticipacionesPorGrado = async (gradoId, profesorId, nivelId) => {
  try {
    const url = `/api/participaciones/por-grado?grado_id=${gradoId}&profesor_id=${profesorId}&nivel_id=${nivelId}`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error al obtener participaciones:', error);
    throw error;
  }
};
//proceso
export const obtenerParticipacionesPorMateria = async (gradoId, profesorId, nivelId, materiaId) => {
  try {
    const url = `/api/participaciones/por-materia-grado?grado_id=${gradoId}&profesor_id=${profesorId}&nivel_id=${nivelId}&materia_id=${materiaId}`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error al obtener participaciones por materia:', error);
    throw error;
  }
};
//funciona
export const obtenerNotasPorMateriaYGrado = async (gradoId, profesorId, nivelId, materiaId) => {
  try {
    const url = `/api/notas/por-materia-grado?grado_id=${gradoId}&profesor_id=${profesorId}&nivel_id=${nivelId}&materia_id=${materiaId}`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las notas por materia y grado:', error);
    throw error;
  }
};

// Registrar participación y asistenicia individual
export async function registrarParticipacion(payload) {
  try {
    const response = await api.post('/api/registrar-asistencia-presentacion', payload);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al registrar participación');
  }
}

// Registrar asistencia masiva
export async function registrarAsistenciaMasiva(listaAsistencias) {
  try {
    const response = await api.post('/api/asistencia/masiva', listaAsistencias);
    return response.data;
  } catch (error) {
    const errores = error.response?.data?.errores;
    throw new Error(errores ? errores.join('\n') : 'Error al registrar asistencia masiva');
  }
}

// actualiza asistencia promedio en nota_trimestre
export async function ActualizarAsistenciaNotaTrimestre(params) {
  try {
    const response = await api.put('/api/notas-trimestre/asistencia', null, { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al registrar asistencia');
  }
}

// actualiza participación promedio en nota_trimestre
export async function ActualizarParticipacionNotaTrimestre(params) {
  try {
    const response = await api.put('/api/notas-trimestre/participaciones', null, { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al registrar participación');
  }
}







