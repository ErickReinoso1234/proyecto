import React from "react";
import { Route, Routes } from "react-router-dom";
import AhorroApp from "./pages/ahorro/ahorros";
import PaginaPrincipal from "./pages/paginaPrincipal/paginaPrincipal";
import Error404Page from "./pages/error";
import InicioApp from "./pages/paginaIncio/inicio";

interface AppRouterProps {
  isSidebarOpen: boolean;
}

export const AppRouter: React.FC<AppRouterProps> = ({ isSidebarOpen }) => {
  return (
    <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin .3s' }}>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/ahorros" element={<AhorroApp />} />
        <Route path="/inicio" element={<InicioApp />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </div>
  );
};