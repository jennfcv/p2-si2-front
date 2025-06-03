import React, { useEffect, useState } from "react";
import { listarBitacoras } from "../services/bitacoraService";

const BitacoraListPage = () => {
  const [bitacoras, setBitacoras] = useState([]);

  useEffect(() => {
    const cargarBitacoras = async () => {
      try {
        const data = await listarBitacoras();
        setBitacoras(data);
      } catch (error) {
        console.error("Error al cargar bitácoras:", error);
      }
    };
    cargarBitacoras();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Registro de Bitácora</h2>
      {bitacoras.length === 0 ? (
        <p className="text-gray-500">No hay registros en la bitácora.</p>
      ) : (
        <table className="min-w-full text-sm border bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Usuario</th>
              <th className="border px-4 py-2">Acción</th>
              <th className="border px-4 py-2">Tabla</th>
              <th className="border px-4 py-2">IP</th>
              <th className="border px-4 py-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {bitacoras.map((b, index) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{b.usuario?.nombre_usuario || "-"}</td>
                <td className="border px-4 py-2">{b.accion}</td>
                <td className="border px-4 py-2">{b.tabla}</td>
                <td className="border px-4 py-2">{b.ip}</td>
                <td className="border px-4 py-2">{b.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BitacoraListPage;
