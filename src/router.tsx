import React from "react";
import { Route, Routes } from "react-router-dom";
import PaginaPrincipal from "./pages/paginaPrincipal/paginaPrincipal";
import Error404Page from "./pages/error";
import Formcuenta from "./pages/Register/Formcuenta";
import PerfilUsuario from "./pages/perfilUsuario/perfil";
import LoginForm from "./pages/login";
import InicioApp from "./pages/paginaIncio/inicio";
import Dashboard from "./pages/dashboard/dashboards";
import { Gastos } from "./pages/control/controlgasto";
import { Historial } from "./pages/historial";


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
      <Route path="/historial" element={<Historial />} />
      <Route path="/inicio" element={<InicioApp />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Formcuenta />} />
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/control" element={<Gastos />} />
      <Route path="*" element={<Error404Page />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </div>
  );
};