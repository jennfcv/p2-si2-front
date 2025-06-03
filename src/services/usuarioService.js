// import api from './api';

// // GET - Listar todos los usuarios
// export const listarUsuarios = async () => {
//   const response = await api.get('/api/usuarios');
//   return response.data;
// };

// // GET - Ver un usuario por ID
// export const verUsuario = async (id) => {
//   const response = await api.get(`/api/usuarios/${id}`);
//   return response.data;
// };

// // POST - Crear un nuevo usuario
// export const crearUsuario = async (data) => {
//   const response = await api.post('/api/usuarios', data);
//   return response.data;
// };

// // PUT - Editar un usuario
// export const editarUsuario = async (id, data) => {
//   const response = await api.put(`/api/usuarios/${id}`, data);
//   return response.data;
// };

// // DELETE - Eliminar un usuario
// export const eliminarUsuario = async (id) => {
//   const response = await api.delete(`/api/usuarios/${id}`);
//   return response.data;
// };
// services/usuarioService.js
import api from './api';

// 1. Listar usuarios
export const listarUsuarios = async () => {
  try {
    const response = await api.get('/api/usuarios');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al listar usuarios' };
  }
};

// 2. Crear alumno
export const crearAlumno = async (datos) => {
  try {
    const response = await api.post('/crear-alumnos', datos);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al crear alumno' };
  }
};

// 3. Inscribir alumno
export const inscribirAlumno = async (alumno_id) => {
  try {
    const response = await api.post('/inscripciones', { alumno_id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al inscribir alumno' };
  }
};

// 4. Cambiar contraseña (requiere token en el header)
export const cambiarPassword = async (nueva_contraseña, token) => {
  try {
    const response = await api.put(
      '/cambiar-password',
      { nueva_contraseña },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cambiar la contraseña' };
  }
};
