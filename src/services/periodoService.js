import api from './api';

// GET - Listar todos los periodos
export const listarPeriodos = async () => {
  const response = await api.get('/api/periodos');
  return response.data;
};

// GET - Ver un periodo por ID
export const verPeriodo = async (id) => {
  const response = await api.get(`/api/periodos/${id}`);
  return response.data;
};

// POST - Crear un nuevo periodo
export const crearPeriodo = async (periodoData) => {
  const response = await api.post('/api/periodos', periodoData);
  return response.data;
};

// PUT - Editar un periodo
export const editarPeriodo = async (id, periodoData) => {
  const response = await api.put(`/api/periodos/${id}`, periodoData);
  return response.data;
};

// DELETE - Eliminar un periodo
export const eliminarPeriodo = async (id) => {
  const response = await api.delete(`/api/periodos/${id}`);
  return response.data;
};
