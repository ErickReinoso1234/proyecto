import React from 'react';
import { Gastos, Ahorro } from './types';

interface SummaryProps {
  porcentajeFijo: number;
  porcentajeVariable: number;
  porcentajeAhorro: number;
  gastos: Gastos;
  ahorros: Ahorro[];
  ingreso: number;
}

const Summary: React.FC<SummaryProps> = ({
  porcentajeFijo,
  porcentajeVariable,
  porcentajeAhorro,
  gastos,
  ahorros,
  ingreso,
}) => {
  const totalFijo = gastos.fixed.reduce((sum, gasto) => sum + gasto.amount, 0);
  const totalVariable = gastos.variable.reduce((sum, gasto) => sum + gasto.amount, 0);
  const totalAhorros = ahorros.reduce((sum, ahorro) => sum + ahorro.amount, 0);

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2>Resumen</h2>
      <p>Ingreso Total: ${ingreso}</p>
      <p>Gastos Fijos: ${totalFijo} ({porcentajeFijo}%)</p>
      <p>Gastos Variables: ${totalVariable} ({porcentajeVariable}%)</p>
      <p>Ahorros: ${totalAhorros} ({porcentajeAhorro}%)</p>
      <p>Restante: ${ingreso - totalFijo - totalVariable - totalAhorros}</p>
    </div>
  );
};

export default Summary;
