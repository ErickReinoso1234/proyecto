import React from "react";
import { Route, Routes } from "react-router-dom";
import AhorroApp from "./pages/ahorro/ahorros";
import PaginaPrincipal from "./pages/paginaPrincipal/paginaPrincipal";
import Error404Page from "./pages/error";
import Formcuenta from "./pages/Register/Formcuenta";
import Historial from "./pages/historial";
import PerfilUsuario from "./pages/perfilUsuario/perfil";
import LoginForm from "./pages/login";
import InicioApp from "./pages/paginaIncio/inicio";

interface AppRouterProps {
  abrirSidebar: boolean;
}

export const AppRouter: React.FC<AppRouterProps> = ({ abrirSidebar: isSidebarOpen }) => {
  return (
    <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin .3s' }}>
       <Routes>
      <Route path="/" element={<PaginaPrincipal />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/perfil" element={<PerfilUsuario />} />
      <Route path="/ahorros" element={<AhorroApp />} />
      <Route path="/historial" element={<Historial />} />
      <Route path="/inicio" element={<InicioApp />} />
      <Route path="*" element={<Error404Page />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Formcuenta />} />
    </Routes>
    </div>
  );
};