import React from 'react';
import { Navigate } from 'react-router-dom';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import DashboardLayout from './layout/DashboardLayout';
import Panel from './pages/Panel';

// Globales
import Global from './pages/global';

// Administración
import AlumnoListPage from './pages/AlumnoListPage';
import ProfesorListPage from './pages/ProfesorListPage';
import MateriaGrado from './pages/MateriaGrado';
import PeriodoListPage from './pages/PeriodoListPage';
import RolListPage from './pages/RolListPage';
import UsuarioListPage from './pages/UsuarioListPage';
import GradoListPage from './pages/GradoListPage';
import BitacoraListPage from './pages/BitacoraListPage';

// Alumnos
import TabsEstudiante from './pages/alumnos/TabsEstudiante';

// Profesores - Tabs y vistas por materia
import TabsProfesor from './pages/profesores/TabsProdesor';
import NotasMateriaProfesor from './pages/profesores/NotasMateriaProfesor';
import AsistenciasMateriaProfesor from './pages/profesores/AsistenciasMateriaProfesor';
import ParticipacionesMateriaProfesor from './pages/profesores/ParticipacionesMateriaProfesor';
import EstudiantesMateriaProfesor from './pages/profesores/EstudiantesMateriaProfesor';

// Profesores - Registro
import RegistroAsistenciaMateria from './pages/profesores/RegistroAsistenciaMateria';
import RegistroNotasMateria from './pages/profesores/RegistroNotasMateria';
import RegistroParticipacionMateria from './pages/profesores/RegistroParticipacionMateria';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/panel" element={<DashboardLayout />}>
          <Route index element={<Panel />} />

          {/* Administración */}
          <Route path="alumnos" element={<AlumnoListPage />} />
          <Route path="profesores" element={<ProfesorListPage />} />

          <Route path="materias" element={<MateriaGrado />} />

          <Route path="periodos" element={<PeriodoListPage />} />
          <Route path="roles" element={<RolListPage />} />
          <Route path="usuarios" element={<UsuarioListPage />} />
          <Route path="grados" element={<GradoListPage />} />
          <Route path="bitacoras" element={<BitacoraListPage />} />

          {/* Alumnos */}
          <Route path="alumnos/:id/tabs" element={<TabsEstudiante />} />

          {/* Profesores - Tabs */}
          <Route path="profesores/:id/tabs" element={<TabsProfesor />} />
          <Route path="profesor/:profesorId/materia/:materiaId/notas" element={<NotasMateriaProfesor />} />
          <Route path="profesor/:profesorId/materia/:materiaId/asistencias" element={<AsistenciasMateriaProfesor />} />
          <Route path="profesor/:profesorId/materia/:materiaId/estudiantes" element={<EstudiantesMateriaProfesor />} />
          <Route path="profesor/:profesorId/grado/:gradoId/asistencias" element={<AsistenciasMateriaProfesor />} />
          <Route path="profesor/:profesorId/materia/:materiaId/participaciones" element={<ParticipacionesMateriaProfesor />} />

          {/* Profesores - Registro */}
          <Route path="/panel/profesores/:profesorId/materias/:materiaId/asistencias/nueva" element={<RegistroAsistenciaMateria />} />
          <Route path="/panel/profesor/registro-asistencia" element={<RegistroAsistenciaMateria />} />
          <Route path="/panel/profesor/registro-participacion" element={<RegistroParticipacionMateria />} />
          <Route path="/panel/profesor/registro-notas" element={<RegistroNotasMateria />} />
          <Route path="/panel/profesores/:profesorId/materias/:materiaId/participaciones/nueva" element={<RegistroParticipacionMateria />} />



          {/* CRUD PROFESOR registrar asistencia y participaciones de estudiante */}
          <Route path="/panel/profesores/:profesorId/registro-asistencia/:gradoId" element={<RegistroAsistenciaMateria />} />
          <Route path="/panel/profesores/:profesorId/registro-participacion/:gradoId" element={<RegistroParticipacionMateria />} />
          <Route path="/panel/profesor/:profesorId/materia/:materiaId/notas/registrar" element={<RegistroNotasMateria />} />


          {/* Global */}
          <Route path="global" element={<Global />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
