import api from './api';

//funciona
export const listarAlumnos = async () => {
  const response = await api.get('/api/alumnos/');
  return response.data;
};
//funciona
export const verAlumno = async (id) => {
  const response = await api.get(`/api/alumnos/${id}`);
  return response.data;
};
//funciona
export const obtenerPerfilAlumno = async (id) => {
  const response = await api.get(`/api/alumnos/${id}/perfil`);
  return response.data;
};
//funciona
export const obtenerAsistenciasAlumno = async (alumnoId) => {
  try {
    const response = await api.get(`/api/alumnos/asistencias?alumno_id=${alumnoId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las asistencias:", error);
    throw error;
  }
};
//funciona
export const obtenerParticipacionAlumno = async (alumnoId) => {
  try {
    const response = await api.get(`/api/alumnos/participacion?alumno_id=${alumnoId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las participaciones:", error);
    throw error;
  }
};
//funciona
export const obtenerNotasAlumno = async (id) => {
  const response = await api.get(`/api/alumnos/notas?alumno_id=${id}`);
  return response.data;
};
//funciona
export const obtenerMateriasAlumno = async (alumnoId) => {
  try {
    const response = await api.get(`/api/alumnos/materias?alumno_id=${alumnoId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las materias del alumno:", error);
    throw error;
  }
};
//funciona
export const obtenerHistorialAcademico = async (alumnoId) => {
  try {
    const response = await api.get(`/api/alumnos/historial-academico?alumno_id=${alumnoId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener historial académico:', error);
    throw error;
  }
};
export const obtenerPromediosPorGrado = async (alumnoId) => {
  try {
    const response = await api.get(`/api/alumnos/promedios-por-grado?alumno_id=${alumnoId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener promedios por grado:', error);
    throw error;
  }
};










































export const crearAlumno = async (data) => {
  const response = await api.post('/api/alumnos/', data);
  return response.data;
};

export const editarAlumno = async (id, data) => {
  const response = await api.put(`/api/alumnos/${id}`, data);
  return response.data;
};

export const eliminarAlumno = async (id) => {
  const response = await api.delete(`/api/alumnos/${id}`);
  return response.data;
};

// 🟢 Funciones del Alumno

// 🟢 Funciones del Alumno
 





 

export const obtenerHistorialAlumno = async (id) => {
  const response = await api.get(`/api/alumnos/${id}/historial`);
  return response.data;
};




