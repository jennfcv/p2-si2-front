import api from './api';

// GET - Listar todas las asistencias
export const listarAsistencias = async () => {
  const response = await api.get('/api/asistencias');
  return response.data;
};

// GET - Ver una asistencia por ID
export const verAsistencia = async (id) => {
  const response = await api.get(`/api/asistencias/${id}`);
  return response.data;
};

// POST - Crear una nueva asistencia
export const crearAsistencia = async (asistenciaData) => {
  const response = await api.post('/api/asistencias', asistenciaData);
  return response.data;
};

// PUT - Editar una asistencia
export const editarAsistencia = async (id, asistenciaData) => {
  const response = await api.put(`/api/asistencias/${id}`, asistenciaData);
  return response.data;
};

// DELETE - Eliminar una asistencia
export const eliminarAsistencia = async (id) => {
  const response = await api.delete(`/api/asistencias/${id}`);
  return response.data;
};
