import axios from './api';

const endpoint = '/api/materias';

const materiaService = {
  // GET: Listar todas las materias
  listar: async () => {
    const res = await axios.get(endpoint);
    return res.data;
  },

  // GET: Obtener una materia por ID
  obtener: async (id) => {
    const res = await axios.get(`${endpoint}/${id}`);
    return res.data;
  },

  // POST: Crear nueva materia
  crear: async (datos) => {
    const res = await axios.post(endpoint, datos);
    return res.data;
  },

  // PUT: Actualizar materia
  actualizar: async (id, datos) => {
    const res = await axios.put(`${endpoint}/${id}`, datos);
    return res.data;
  },

  // DELETE: Eliminar materia
  eliminar: async (id) => {
    const res = await axios.delete(`${endpoint}/${id}`);
    return res.data;
  }
};

export default materiaService;
