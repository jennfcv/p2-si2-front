import api from './api';

// GET - Listar grados por gestión específica
export const listarGradosAgrupados = async () => {
  const response = await api.get('/api/grados/agrupados');
  return response.data;
};



const API_URL = 'http://localhost:5000/api/grados';

export const obtenerMateriasPorGrado = async (gestionId, gradoId) => {
  const response = await fetch(`${API_URL}/gestion/${gestionId}/grado/${gradoId}/materias`);
  if (!response.ok) {
    throw new Error('Error al obtener materias');
  }
  return await response.json();
};



// GET - Ver un grado por ID
export const verGrado = async (id) => {
  const response = await api.get(`/api/grados/${id}`);
  return response.data;
};

// POST - Crear un nuevo grado
export const crearGrado = async (gradoData) => {
  const response = await api.post('/api/grados', gradoData);
  return response.data;
};

// PUT - Editar un grado
export const editarGrado = async (id, gradoData) => {
  const response = await api.put(`/api/grados/${id}`, gradoData);
  return response.data;
};

// DELETE - Eliminar un grado
export const eliminarGrado = async (id) => {
  const response = await api.delete(`/api/grados/${id}`);
  return response.data;
};

// // GET - Obtener materias de un grado por su ID
// export const obtenerMateriasPorGrado = async (gradoId) => {
//   try {
//     const response = await api.get(`/api/grado/materias?grado_id=${gradoId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error al obtener las materias del grado:", error);
//     throw error;
//   }
// };


