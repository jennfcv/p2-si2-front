import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome, FaUsers, FaUserShield, FaUserTie, FaBookOpen,
  FaSignOutAlt, FaChevronDown, FaChevronRight, FaShieldAlt,
  FaClipboardList, FaCalendarAlt, FaLayerGroup
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggle }) => {
  const navigate = useNavigate();
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [rol, setRol] = useState("");

  useEffect(() => {
    const rolGuardado = localStorage.getItem("rol");
    setRol(rolGuardado);
  }, []);

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const items = [
    {
      section: "INICIO",
      visible: true,
      links: [
        { label: "Inicio", icon: <FaHome />, path: "/panel/" },
      ]
    },
    {
      section: "GESTIÓN ACADÉMICA",
      visible: rol === "Administrador" || rol === "Profesor",
      links: [
        { label: "Alumnos", icon: <FaUsers />, path: "/panel/alumnos" },
        { label: "Profesores", icon: <FaUserTie />, path: "/panel/profesores" },
        { label: "Materias", icon: <FaBookOpen />, path: "/panel/materias" },
        { label: "Grados", icon: <FaLayerGroup />, path: "/panel/grados" },
        { label: "Periodos", icon: <FaCalendarAlt />, path: "/panel/periodos" },
        { label: "Asistencias", icon: <FaCalendarAlt />, path: "/panel/asistencias/1" },
      ]
    },
    {
      section: "GESTIÓN ADMINISTRATIVA",
      visible: rol === "Administrador",
      links: [
        { label: "Usuarios", icon: <FaUserShield />, path: "/panel/usuarios" },
        { label: "Roles", icon: <FaShieldAlt />, path: "/panel/roles" },
        { label: "Bitácora", icon: <FaClipboardList />, path: "/panel/bitacoras" },
      ]
    },
    {
      section: "IA Y OTROS",
      visible: rol === "Administrador" || rol === "Profesor",
      links: [
        { label: "Global", icon: <FaLayerGroup />, path: "/panel/global" },
        { label: "Predicción IA", icon: <FaBookOpen />, path: "/panel/prediccion/1" },
      ]
    },
    {
      section: "MI PERFIL ACADÉMICO",
      visible: rol === "Alumno",
      links: [
        { label: "Mi Perfil", icon: <FaUserTie />, path: "/panel/mi-perfil" },
        { label: "Mis Notas", icon: <FaBookOpen />, path: "/panel/mis-notas" },
        { label: "Mi Historial", icon: <FaClipboardList />, path: "/panel/mis-historiales" },
        { label: "Mis Asistencias", icon: <FaCalendarAlt />, path: "/panel/mis-asistencias" },
      ]
    }
  ];

  return (
    <aside className={`
      bg-gradient-to-b from-white via-blue-50 to-yellow-50 text-gray-800
      fixed top-16 left-0 z-20 w-64 h-[calc(100vh-4rem)]
      overflow-y-auto p-4 transition-transform duration-300 ease-in-out
    `}>
      {items.filter(s => s.visible).map((section, i) => (
        <div key={i} className="mb-6">
          <p className="text-gray-500 text-xs font-semibold mb-2">{section.section}</p>
          <ul className="space-y-2">
            {section.links.map((link, j) => (
              <li
                key={j}
                className="flex items-center space-x-2 hover:bg-blue-100 p-2 rounded cursor-pointer"
                onClick={() => {
                  navigate(link.path);
                  if (window.innerWidth < 1024) toggle();
                }}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="mt-10">
        <li
          className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded cursor-pointer text-center"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("rol");
            navigate("/");
          }}
        >
          <FaSignOutAlt />
          <span>Cerrar sesión</span>
        </li>
      </div>
    </aside>
  );
};

export default Sidebar;
