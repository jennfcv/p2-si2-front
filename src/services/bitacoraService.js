import api from './api';

// GET - Listar todas las bitácoras
export const listarBitacoras = async () => {
  const response = await api.get('/api/bitacoras');
  return response.data;
};

// GET - Obtener una bitácora por ID
export const obtenerBitacora = async (id) => {
  const response = await api.get(`/api/bitacoras/${id}`);
  return response.data;
};
