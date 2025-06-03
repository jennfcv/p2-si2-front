import React, { useEffect, useState } from 'react';
import { listarGradosAgrupados } from '../services/gradoService';
import { useNavigate } from 'react-router-dom';

import '../components/main.css';

const GradoListPage = () => {
  const [gestiones, setGestiones] = useState([]);
  const [gestionSeleccionada, setGestionSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await listarGradosAgrupados();
        setGestiones(data);
        if (data.length > 0) {
          setGestionSeleccionada(data[0].gestion_id); // Mostrar la primera gestión por defecto
        }
      } catch (error) {
        setError('Error al cargar las gestiones');
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const gestionActiva = gestiones.find(g => g.gestion_id === gestionSeleccionada);

  return (
    <div>
      <h2>Lista de Grados</h2>

      {/* Selector de gestión */}
      <label>Selecciona una gestión: </label>
      <select
        value={gestionSeleccionada || ''}
        onChange={(e) => setGestionSeleccionada(parseInt(e.target.value))}
      >
        {gestiones.map((g) => (
          <option key={g.gestion_id} value={g.gestion_id}>
            {g.nombre_gestion} - {g.gestion_estado}
          </option>
        ))}
      </select>

      <br /><br />

      {cargando ? (
        <p>Cargando grados...</p>
      ) : error ? (
        <p>{error}</p>
      ) : gestionActiva ? (
        <div className="responsive-table-container">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {gestionActiva.grados.map((grado) => (
                <tr key={grado.grado_id}>
                  <td>{grado.grado_id}</td>
                  <td>{grado.nombre_grado}</td>
                  <td>{grado.descripcion_grado}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/panel/materias?gestion=${gestionSeleccionada}&grado=${grado.grado_id}`)}
                    >
                      Ver
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No hay grados para esta gestión.</p>
      )}
    </div>
  );
};

export default GradoListPage;
