import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, message } from "antd";

interface Gasto {
  nombre: string;
  cantidad: number;
  tipo: string;
}

const AhorroApp = () => {
  const [saldoInicial, setSaldoInicial] = useState(0);
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [nombreGasto, setNombreGasto] = useState("");
  const [cantidadGasto, setCantidadGasto] = useState(0);
  const [tipoGasto, setTipoGasto] = useState("fijo");
  const [tipoEmergencia, setTipoEmergencia] = useState("");

  const handleAgregarGasto = () => {
    if (cantidadGasto > saldoInicial) {
      message.error("¡Tus ingresos no son suficientes para este gasto!");
      return;
    }

    const nuevoGasto: Gasto = {
      nombre: nombreGasto,
      cantidad: cantidadGasto,
      tipo: tipoGasto,
    };
    setGastos([...gastos, nuevoGasto]);
    setSaldoInicial(saldoInicial - cantidadGasto); // Reducir el saldo inicial
    setNombreGasto("");
    setCantidadGasto(0);
    setTipoGasto("fijo");
  };

  const calcularPorcentajeConsumido = () => {
    const porcentajeConsumido = ((saldoInicial - calcularTotalGastos()) / saldoInicial) * 100;
    return porcentajeConsumido.toFixed(2);
  };

  const calcularTotalGastos = () => {
    return gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
  };

  return (
    <div className="container mt-5 text-white">
      <h1>Ahorro App</h1>
      <div className="row">
        <div className="col-md-6">
          <Card>
            <div className="mb-3">
              <label htmlFor="saldoInicial" className="form-label">
                Saldo Inicial:
              </label>
              <input
                type="number"
                className="form-control"
                id="saldoInicial"
                value={saldoInicial}
                onChange={(e) => setSaldoInicial(parseInt(e.target.value))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nombreGasto" className="form-label">
                Nombre del Gasto:
              </label>
              <input
                type="text"
                className="form-control"
                id="nombreGasto"
                value={nombreGasto}
                onChange={(e) => setNombreGasto(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cantidadGasto" className="form-label">
                Cantidad del Gasto:
              </label>
              <input
                type="number"
                className="form-control"
                id="cantidadGasto"
                value={cantidadGasto}
                onChange={(e) => setCantidadGasto(parseInt(e.target.value))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tipoGasto" className="form-label">
                Tipo de Gasto:
              </label>
              <select
                className="form-select"
                id="tipoGasto"
                value={tipoGasto}
                onChange={(e) => setTipoGasto(e.target.value)}
              >
                <option value="fijo">Fijo</option>
                <option value="variable">Variable</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="tipoEmergencia" className="form-label">
                Gasto de Emergencia:
              </label>
              <input
                type="text"
                className="form-control"
                id="tipoEmergencia"
                value={tipoEmergencia}
                onChange={(e) => setTipoEmergencia(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleAgregarGasto}>
              Ingresar tu gasto
            </button>
          </Card>
        </div>
        <div className="col-md-6">
          <Card title="Detalles de los Gastos">
            <div className="mb-3">
              <p>
                <strong>Saldo Restante:</strong> ${saldoInicial - calcularTotalGastos()}
              </p>
              <p>
                <strong>Porcentaje de Saldo Restante:</strong> {calcularPorcentajeConsumido()}%
              </p>
              {gastos.map((gasto, index) => (
                <div key={index}>
                  <h4>{gasto.nombre}</h4>
                  <p>
                    <strong>Cantidad:</strong> ${gasto.cantidad}
                  </p>
                  <p>
                    <strong>Tipo:</strong> {gasto.tipo}
                  </p>
                  <p>
                    <strong>Porcentaje del saldo Consumido:</strong>{" "}
                    {((gasto.cantidad / saldoInicial) * 100).toFixed(2)}%
                  </p>
                  <hr />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AhorroApp;
