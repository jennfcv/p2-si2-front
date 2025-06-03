import api from './api';

// GET - Listar todas las asignaciones de materia a profesor
export const listarMateriasProfesor = async () => {
  const response = await api.get('/api/materias-profesor');
  return response.data;
};

// GET - Ver una asignación específica por ID
export const verMateriaProfesor = async (id) => {
  const response = await api.get(`/api/materias-profesor/${id}`);
  return response.data;
};

// POST - Crear una nueva asignación
export const crearMateriaProfesor = async (data) => {
  const response = await api.post('/api/materias-profesor', data);
  return response.data;
};

// PUT - Editar una asignación
export const editarMateriaProfesor = async (id, data) => {
  const response = await api.put(`/api/materias-profesor/${id}`, data);
  return response.data;
};

// DELETE - Eliminar una asignación
export const eliminarMateriaProfesor = async (id) => {
  const response = await api.delete(`/api/materias-profesor/${id}`);
  return response.data;
};
