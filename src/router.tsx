import React from "react";
import { Route, Routes } from "react-router-dom";
import AhorroApp from "./pages/ahorro/ahorros";
import PaginaPrincipal from "./pages/paginaPrincipal/paginaPrincipal";
import Error404Page from "./pages/error";
import Historial from "./pages/historial";
import PerfilUsuario from "./pages/perfilUsuario/perfil";
import LoginForm from "./pages/login";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<PaginaPrincipal />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/perfil" element={<PerfilUsuario />} />
      <Route path="/ahorros" element={<AhorroApp />} />
      <Route path="/historial" element={<Historial />} />
      <Route path="*" element={<Error404Page />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};