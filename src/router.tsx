import React from "react";
import { Route, Routes } from "react-router-dom";
import AhorroApp from "./pages/ahorro/ahorros";
import PaginaPrincipal from "./pages/paginaPrincipal/paginaPrincipal";
import Error404Page from "./pages/error";
import Formcuenta from "./pages/Register/Formcuenta";
import Historial from "./pages/historial";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<PaginaPrincipal />} />
      <Route path="/ahorros" element={<AhorroApp />} />
      <Route path="/historial" element={<Historial />} />
      <Route path="*" element={<Error404Page />} />
      <Route path="/register" element= {<Formcuenta />}/>
    </Routes>
  );
};
