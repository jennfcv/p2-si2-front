import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/historial/filtrar';  // URL base

export const filtrarHistorial = async (filters) => {
  try {
    const params = new URLSearchParams(filters).toString();  // Convertir filtros a parámetros de consulta
    const response = await axios.get(`${BASE_URL}?${params}`);  // Hacer la solicitud GET
    return response.data;  // Retornar los datos
  } catch (error) {
    console.error("Error al obtener el historial:", error);
    throw error;
  }
};
export const listarHistorial = async () => {
  try {
    const response = await axios.get(BASE_URL);  // Hacer la solicitud GET
    return response.data;  // Retornar los datos
  } catch (error) {
    console.error("Error al obtener el historial:", error);
    throw error;
  }
};