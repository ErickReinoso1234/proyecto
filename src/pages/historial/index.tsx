import React from 'react';
import { Card } from 'antd';
import { useLocation } from 'react-router-dom';

const Historial = () => {
  const location = useLocation();
  const gastos = location.state?.gastos || [];
  const saldoRestante = location.state?.saldoRestante || 0;
  const gastoEmergencia = location.state?.gastoEmergencia || 0; // Agrega esta línea para obtener el gasto de emergencia

  return (
    <div className="container mt-5 text-white">
      <h1>Historial de Gastos</h1>
      <Card>
        {gastos.length === 0 ? (
          <p>No hay gastos registrados.</p>
        ) : (
          <>
            <p><strong>Saldo Restante:</strong> ${saldoRestante}</p>
            <p><strong>Gasto de Emergencia:</strong> ${gastoEmergencia}</p> {/* Agrega esta línea para mostrar el gasto de emergencia */}
            {gastos.map((gasto: { nombre: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; cantidad: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; tipo: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; fecha: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
              <div key={index}>
                <h4>{gasto.nombre}</h4>
                <p>
                  <strong>Cantidad:</strong> ${gasto.cantidad}
                </p>
                <p>
                  <strong>Tipo:</strong> {gasto.tipo}
                </p>
                <p>
                  <strong>Fecha:</strong> {gasto.fecha}
                </p>
                <p>
                  <strong>Fecha:</strong> {gasto.fecha}
                </p>
                
                <hr />
              </div>
            ))}
          </>
        )}
      </Card>
    </div>
  );
};

export default Historial;
