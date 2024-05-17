import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, message, Button } from "antd";
import { useNavigate } from "react-router-dom";

interface Gasto {
  nombre: string;
  cantidad: number;
  tipo: string;
  fecha: string;
}

const AhorroApp = () => {
  const [saldoInicial, setSaldoInicial] = useState(() => {
    const saved = localStorage.getItem("saldoInicial");
    return saved ? parseInt(saved) : 0;
  });
  const [otrosIngresos, setOtrosIngresos] = useState(() => {
    const saved = localStorage.getItem("otrosIngresos");
    return saved ? parseInt(saved) : 0;
  });
  const [gastos, setGastos] = useState<Gasto[]>(() => {
    const saved = localStorage.getItem("gastos");
    return saved ? JSON.parse(saved) : [];
  });
  const [nombreGasto, setNombreGasto] = useState("");
  const [cantidadGasto, setCantidadGasto] = useState(0);
  const [tipoGasto, setTipoGasto] = useState("fijo");
  const [gastoEmergencia, setGastoEmergencia] = useState(() => {
    const saved = localStorage.getItem("gastoEmergencia");
    return saved ? parseInt(saved) : 0;
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("saldoInicial", saldoInicial.toString());
  }, [saldoInicial]);

  useEffect(() => {
    localStorage.setItem("otrosIngresos", otrosIngresos.toString());
  }, [otrosIngresos]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);

  useEffect(() => {
    localStorage.setItem("gastoEmergencia", gastoEmergencia.toString());
  }, [gastoEmergencia]);

  const handleAgregarGasto = () => {
    const totalDisponible =
      saldoInicial + otrosIngresos - calcularTotalGastos() - gastoEmergencia;
    if (cantidadGasto > totalDisponible) {
      message.error("¡Tus ingresos no son suficientes para este gasto!");
      return;
    }

    const nuevoGasto: Gasto = {
      nombre: nombreGasto,
      cantidad: cantidadGasto,
      tipo: tipoGasto,
      fecha: new Date().toLocaleDateString(),
    };
    setSaldoInicial(saldoInicial - cantidadGasto);

    setGastos([...gastos, nuevoGasto]);
    setSaldoInicial(saldoInicial - cantidadGasto); // Reducir el saldo inicial
    setNombreGasto("");
    setCantidadGasto(0);
    setTipoGasto("fijo");
  };

  const handleRegistrarIngresos = () => {
    setSaldoInicial(saldoInicial + otrosIngresos);
    setOtrosIngresos(0);
  };

  const handleRestablecerDatos = () => {
    localStorage.clear();
    setSaldoInicial(0);
    setOtrosIngresos(0);
    setGastos([]);
    setGastoEmergencia(0);
    message.success("Datos restablecidos con éxito.");
  };

  const calcularPorcentajeConsumido = () => {
    const totalIngresos = saldoInicial + otrosIngresos;
    const porcentajeConsumido =
      ((totalIngresos - calcularTotalGastos() - gastoEmergencia) /
        totalIngresos) *
      100;
    return porcentajeConsumido.toFixed(2);
  };

  const calcularTotalGastos = () => {
    return gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
  };

  const handleHistorial = () => {
    navigate("/historial", { state: { gastos } });
  };

  return (
    <div className="container mt-5 text-white">
      <h1>Ahorro App</h1>
      <div className="row">
        <div className="col-md-6">
          <Card>
            <div className="mb-3">
              <label htmlFor="saldoInicial" className="form-label">
                Saldo Mensual:
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
              <label htmlFor="otrosIngresos" className="form-label">
                Otros Ingresos:
              </label>
              <input
                type="number"
                className="form-control"
                id="otrosIngresos"
                value={otrosIngresos}
                onChange={(e) => setOtrosIngresos(parseInt(e.target.value))}
              />
            </div>
            <button
              className="btn btn-primary mb-3"
              onClick={handleRegistrarIngresos}
            >
              Registrar tus ingresos
            </button>
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
              <label htmlFor="gastoEmergencia" className="form-label">
                Gasto de Emergencia:
              </label>
              <input
                type="number"
                className="form-control"
                id="gastoEmergencia"
                value={gastoEmergencia}
                onChange={(e) => setGastoEmergencia(parseInt(e.target.value))}
              />
            </div>
            <button
              className="btn btn-primary mb-3"
              onClick={handleAgregarGasto}
            >
              Ingresar tu gasto
            </button>
            <button className="btn btn-danger" onClick={handleRestablecerDatos}>
              Restablecer datos
            </button>
          </Card>
        </div>
        <div className="col-md-6">
          <Card title="Detalles de los Gastos">
            <div className="mb-3">
              <p>
                <strong>Saldo Restante:</strong> $
                {saldoInicial +
                  otrosIngresos -
                  calcularTotalGastos() -
                  gastoEmergencia}
              </p>
              <p>
                <strong>Porcentaje de Saldo Restante:</strong>{" "}
                {calcularPorcentajeConsumido()}%
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
                    <strong>Fecha:</strong> {gasto.fecha}
                  </p>
                  <p>
                    <strong>Porcentaje del saldo Consumido:</strong>{" "}
                    {(
                      (gasto.cantidad / (saldoInicial + otrosIngresos)) *
                      100
                    ).toFixed(2)}
                    %
                  </p>
                  <hr />
                </div>
              ))}
            </div>
            <Button type="primary" onClick={handleHistorial}>
              Ver Historial
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AhorroApp;
