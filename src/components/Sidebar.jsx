import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome, FaUsers, FaUserShield, FaUserTie, FaBookOpen,
  FaSignOutAlt, FaChevronDown, FaChevronRight, FaShieldAlt,
  FaClipboardList, FaCalendarAlt, FaLayerGroup
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggle }) => {
  const navigate = useNavigate();
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

const items = [
  {
    section: "INICIO",
    links: [
      { label: "Inicio", icon: <FaHome />, path: "/panel/" },
    ]
  },
  {
    section: "GESTIÓN ACADÉMICA",
    links: [
      { label: "Alumnos", icon: <FaUsers />, path: "/panel/alumnos" },
      { label: "Profesores", icon: <FaUserTie />, path: "/panel/profesores" },
      { label: "Materias", icon: <FaBookOpen />, path: "/panel/materias" },
      { label: "Grados", icon: <FaLayerGroup />, path: "/panel/grados" },
      { label: "Periodos", icon: <FaCalendarAlt />, path: "/panel/periodos" },
      { label: "Asistencias", icon: <FaCalendarAlt />, path: "/panel/asistencias/1" },  // ejemplo con alumnoId=1
    ]
  },
  {
    section: "GESTIÓN ADMINISTRATIVA",
    links: [
      { label: "Usuarios", icon: <FaUserShield />, path: "/panel/usuarios" },
      { label: "Roles", icon: <FaShieldAlt />, path: "/panel/roles" },
      { label: "Bitácora", icon: <FaClipboardList />, path: "/panel/bitacoras" },
    ]
  },
  {
    section: "IA Y OTROS",
    links: [
      { label: "Global", icon: <FaLayerGroup />, path: "/panel/global" },
      { label: "Predicción IA", icon: <FaBookOpen />, path: "/panel/prediccion/1" }, // ejemplo con alumnoId=1
    ]
  }
];


  return (
    <aside className={`
      bg-gradient-to-b from-white via-blue-50 to-yellow-50 text-gray-800
      fixed top-16 left-0 z-20 w-64 h-[calc(100vh-4rem)]
      overflow-y-auto p-4 transition-transform duration-300 ease-in-out
    `}>
      {items.map((section, i) => (
        <div key={i} className="mb-6">
          <p className="text-gray-500 text-xs font-semibold mb-2">{section.section}</p>
          <ul className="space-y-2">
            {section.links.map((link, j) => (
              link.children ? (
                <li key={j}>
                  <div
                    className="flex items-center justify-between cursor-pointer hover:bg-blue-100 p-2 rounded"
                    onClick={() => toggleSubmenu(link.label)}
                  >
                    <span className="flex items-center gap-2">
                      {link.icon}
                      {link.label}
                    </span>
                    {openSubmenus[link.label] ? <FaChevronDown /> : <FaChevronRight />}
                  </div>
                  {openSubmenus[link.label] && (
                    <ul className="pl-6 mt-2 space-y-1">
                      {link.children.map((sub, k) => (
                        <li
                          key={k}
                          className="flex items-center space-x-2 hover:bg-blue-100 p-2 rounded cursor-pointer"
                          onClick={() => {
                            navigate(sub.path);
                            if (window.innerWidth < 1024) toggle();
                          }}
                        >
                          <span>{sub.icon}</span>
                          <span>{sub.label}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
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
              )
            ))}
          </ul>
        </div>
      ))}

      <div className="mt-10">
        <li
          className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded cursor-pointer text-center"
          onClick={() => {
            localStorage.removeItem("token");
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
