import React, { useEffect, useState } from "react";
import { filtrarHistorial, listarHistorial } from '../services/globalService';  // Asegúrate de importar el servicio
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const Global = () => {
  const [globals, setGlobals] = useState([]);
  const [filters, setFilters] = useState({
    tipo: '',       // Filtro por tipo (asistencia o participación)
    gestion: '',    // Filtro por año de gestión
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar todos los registros al inicio
  useEffect(() => {
    const obtenerHistorial = async () => {
      setLoading(true);
      try {
        const data = await listarHistorial();  // Obtener todos los datos sin filtros
        setGlobals(data);  // Guardar los datos sin filtro
      } catch (err) {
        setError('Error al obtener los registros');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    obtenerHistorial();
  }, []);  // Se ejecuta solo una vez cuando el componente se monta

  // Función para aplicar el filtro
  const loadFilteredData = async () => {
    setLoading(true);
    try {
      const data = await filtrarHistorial(filters);  // Llamada al servicio de filtrado con los filtros
      setGlobals(data);  // Guardar los datos filtrados
    } catch (error) {
      console.error("Error al obtener los registros filtrados:", error);
      setError('Error al obtener los registros filtrados');
    } finally {
      setLoading(false);
    }
  };

  // Manejar los cambios en los filtros
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Cuando se presiona el botón de "Filtrar"
  const handleFilterClick = () => {
    loadFilteredData();  // Aplicar el filtro
  };

  // Mostrar estado de carga o error
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Listado de Globals</h2>

      {/* Contenedor de Filtros */}
      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Filtros</h3>
        <div className="grid grid-cols-8 gap-2">
          <input
            type="text"
            name="tipo"
            value={filters.tipo}
            onChange={handleFilterChange}
            placeholder="Filtrar por tipo..."
            className="border p-1 rounded text-sm"
          />
          <input
            type="text"
            name="gestion"
            value={filters.gestion}
            onChange={handleFilterChange}
            placeholder="Filtrar por gestión..."
            className="border p-1 rounded text-sm"
          />
          <input
            type="text"
            name="nombre"
            value={filters.nombre}
            onChange={handleFilterChange}
            placeholder="Filtrar por nombre..."
            className="border p-1 rounded text-sm"
          />
          <input
            type="text"
            name="grado"
            value={filters.grado}
            onChange={handleFilterChange}
            placeholder="Filtrar por grado..."
            className="border p-1 rounded text-sm"
          />
          <input
            type="text"
            name="materia"
            value={filters.materia}
            onChange={handleFilterChange}
            placeholder="Filtrar por materia..."
            className="border p-1 rounded text-sm"
          />
          <input
            type="text"
            name="periodo"
            value={filters.periodo}
            onChange={handleFilterChange}
            placeholder="Filtrar por periodo..."
            className="border p-1 rounded text-sm"
          />
          <input
            type="number"
            name="puntaje"
            value={filters.puntaje}
            onChange={handleFilterChange}
            placeholder="Filtrar por puntaje..."
            className="border p-1 rounded text-sm"
          />
          <button
            onClick={handleFilterClick}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-2"
          >
            Filtrar
          </button>
        </div>
      </div>


      <th className="border px-4 py-2">historial</th>
      {globals.length === 0 ? (
        <p>No hay registros.</p>
      ) : (
        <table className="min-w-full text-sm border bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">grado</th>
              <th className="border px-4 py-2">materia</th>
              <th className="border px-4 py-2">periodo</th>
              <th className="border px-4 py-2">Tipo</th>
              <th className="border px-4 py-2">Puntaje</th>
              <th className="border px-4 py-2">gestion</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {globals.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.alumno_nombre}</td>
                <td className="border px-4 py-2">{item.grado_nombre}</td>
                <td className="border px-4 py-2">{item.materia_nombre}</td>
                <td className="border px-4 py-2">{item.periodo_nombre}</td>
                <td className="border px-4 py-2">{item.tipo}</td>
                <td className="border px-4 py-2">{item.puntaje}</td>
                <td className="border px-4 py-2">{item.gestion}</td>
                <td className="px-4 py-2 border-b text-center">
                  {/* Botón "Ver" con raya debajo de color azul */}
                  <button className="text-blue-600 hover:text-blue-800 border-b-2 border-transparent hover:border-blue-600">
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Global;
