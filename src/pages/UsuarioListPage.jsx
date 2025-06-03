// import React, { useEffect, useState } from "react"; 
// import {
//     listarUsuarios,
//     verUsuario,
//     eliminarUsuario
// } from '../services/usuarioService';

// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

// const UsuarioListPage = () => {
//     const [usuarios, setUsuarios] = useState([]);
//     const handleVer = async (id) => {
//         const usuario = await verUsuario(id);
//         console.log("📋 Ver usuario:", usuario);
//     };

//     const handleEditar = async (id) => {
//         const usuario = await verUsuario(id);
//         console.log("✏️ Editar usuario:", usuario);
//     };

//     const handleEliminar = async (id) => {
//         const confirmar = window.confirm("¿Deseas eliminar este usuario?");
//         if (!confirmar) return;

//         await eliminarUsuario(id);
//         setUsuarios(prev => prev.filter(u => u.id !== id));
//         console.log("🗑️ Usuario eliminado:", id);
//     };

//     useEffect(() => {
//         const fetchUsuarios = async () => {
//             try {
//                 const data = await listarUsuarios();
//                 setUsuarios(data);
//             } catch (error) {
//                 console.error("Error al cargar usuarios:", error);
//             }
//         };
//         fetchUsuarios();
//     }, []);

//     return (
//         <div>
//             <div className="mb-4 text-right">
//                 <button
//                     onClick={() => console.log("Crear usuario")}
//                     className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
//                 >
//                     ➕ Nuevo Usuario
//                 </button>
//             </div>

//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Listado de Usuarios</h2>
//             {usuarios.length === 0 ? (
//                 <p className="text-gray-500">No hay usuarios registrados.</p>
//             ) : (
//                 <table className="min-w-full text-sm border bg-white shadow">
//                     <thead className="bg-gray-100">
//                         <tr>
//                             <th className="border px-4 py-2">#</th>
//                             <th className="border px-4 py-2">Usuario</th>
//                             <th className="border px-4 py-2">Correo</th>
//                             <th className="border px-4 py-2">Rol</th>
//                             <th className="border px-4 py-2">Profesor</th>
//                             <th className="border px-4 py-2">Alumno</th>
//                             <th className="px-4 py-2 border-b text-center">Acciones</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {usuarios.map((u, index) => (
//                             <tr key={u.id} className="hover:bg-gray-50">
//                                 <td className="border px-4 py-2">{index + 1}</td>
//                                 <td className="border px-4 py-2">{u.nombre_usuario}</td>
//                                 <td className="border px-4 py-2">{u.correo}</td>
//                                 <td className="border px-4 py-2">{u.rol_nombre || "-"}</td>
//                                 <td className="border px-4 py-2">{u.profesor_nombre || "-"}</td>
//                                 <td className="border px-4 py-2">{u.alumno_nombre || "-"}</td>
//                                 <td className="px-4 py-2 border-b text-center">
//                                     <div className="flex justify-center gap-2">
//                                         <button
//                                             onClick={() => handleVer(u.id)}
//                                             className="p-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
//                                             title="Ver"
//                                         >
//                                             <FaEye className="w-4 h-4" />
//                                         </button>
//                                         <button
//                                             onClick={() => handleEditar(u.id)}
//                                             className="p-1 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
//                                             title="Editar"
//                                         >
//                                             <FaEdit className="w-4 h-4" />
//                                         </button>
//                                         <button
//                                             onClick={() => handleEliminar(u.id)}
//                                             className="p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
//                                             title="Eliminar"
//                                         >
//                                             <FaTrash className="w-4 h-4" />
//                                         </button>
//                                     </div>
//                                 </td>

//                             </tr>
//                         ))}
//                     </tbody>

//                 </table>
//             )}
//         </div>
//     );
// };

// export default UsuarioListPage;
// pages/UsuarioListPage.jsx
import React, { useEffect, useState } from 'react';
import { listarUsuarios } from '../services/usuarioService';

const UsuarioListPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const data = await listarUsuarios();
      setUsuarios(data);
    } catch (err) {
      setError(err.error || 'Error al cargar usuarios');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Usuarios</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Profesor</th>
            <th>Alumno</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre_usuario}</td>
              <td>{u.correo}</td>
              <td>{u.rol_nombre || '-'}</td>
              <td>{u.profesor_nombre || '-'}</td>
              <td>{u.alumno_nombre || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuarioListPage;
