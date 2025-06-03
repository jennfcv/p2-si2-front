import api from './api';

// GET - Listar todos los roles
export const listarRoles = async () => {
  const response = await api.get('/api/roles');
  return response.data;
};

// GET - Ver un rol por ID
export const verRol = async (id) => {
  const response = await api.get(`/api/roles/${id}`);
  return response.data;
};

// POST - Crear un nuevo rol
export const crearRol = async (data) => {
  const response = await api.post('/api/roles', data);
  return response.data;
};

// PUT - Editar un rol
export const editarRol = async (id, data) => {
  const response = await api.put(`/api/roles/${id}`, data);
  return response.data;
};

// DELETE - Eliminar un rol
export const eliminarRol = async (id) => {
  const response = await api.delete(`/api/roles/${id}`);
  return response.data;
};
