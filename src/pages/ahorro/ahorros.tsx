import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, message, Button, Modal } from "antd";
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [gastoActual, setGastoActual] = useState<Gasto | null>(null);

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
      saldoInicial - calcularTotalGastos() - gastoEmergencia;
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

    setGastoActual(nuevoGasto);
    setIsModalVisible(true);
  };

  const handleRegistrarIngresos = () => {
    setSaldoInicial((prevSaldo) => prevSaldo + otrosIngresos);
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
    const totalIngresos = saldoInicial;
    const saldoRestante = totalIngresos - calcularTotalGastos() - gastoEmergencia;
    const porcentajeConsumido = ((totalIngresos - saldoRestante) / totalIngresos) * 100;
    return porcentajeConsumido.toFixed(2);
  };

  const calcularTotalGastos = () => {
    const totalGastos = gastos.reduce((total, gasto) => total + gasto.cantidad, 0) + gastoEmergencia;
    return totalGastos;
  };

  const calcularSaldoRestante = () => {
    const totalIngresos = saldoInicial;
    return totalIngresos - calcularTotalGastos() - gastoEmergencia;
  };

  const handleHistorial = () => {
    navigate("/historial", {
      state: {
        gastos,
        saldoRestante: calcularSaldoRestante(),
        gastoEmergencia, // Agrega el gasto de emergencia al estado que se pasa al historial
      },
    });
  };

  const calcularAhorro = () => {
    return (saldoInicial * 0.1).toFixed(2);
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
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-primary mb-3"
                onClick={handleAgregarGasto}
              >
                Ingresar tu gasto
              </button>
              <button
                className="btn btn-danger mb-3"
                onClick={handleRestablecerDatos}
              >
                Restablecer datos
              </button>
            </div>
          </Card>
        </div>
        <div className="col-md-6">
          <Card>
            <div>
              <p>Total Gastos Registrados:</p>
              <p>Saldo inicial: <strong>${saldoInicial}</strong></p>
              <p>Ahorro (10%): <strong>${calcularAhorro()}</strong></p>
              <p>Porcentaje consumido {calcularPorcentajeConsumido()}%</p>
              <p>Saldo actual: <strong>${calcularSaldoRestante()}</strong></p>
            </div>
            <Button type="primary" onClick={handleHistorial}>
              Ver Historial
            </Button>
          </Card>
        </div>
      </div>
      <Modal
        title="Detalles del Gasto"
        open={isModalVisible}
        onOk={() => {
          setGastos([...gastos, gastoActual!]);
          setNombreGasto("");
          setCantidadGasto(0);
          setTipoGasto("fijo");
          setIsModalVisible(false);
        }}
        onCancel={() => setIsModalVisible(false)}
      >
        {gastoActual && (
          <div>
            <p><strong>Nombre del gasto:</strong> {gastoActual.nombre}</p>
            <p><strong>Gastos generales:</strong> ${gastoActual.cantidad}</p>
            {gastoEmergencia > 0 && (
              <p><strong>Gasto de Emergencia:</strong> ${gastoEmergencia}</p>
            )}
            <p><strong>Tipo de gasto:</strong> {gastoActual.tipo}</p>
            <p><strong>Fecha de emición del gasto:</strong> {gastoActual.fecha}</p>
            <p><strong>TOTAL DE TUS GASTOS:</strong> ${(gastoActual.cantidad + gastoEmergencia).toString()}</p>
          </div>
        )}
      </Modal>
    </div>  
  );
};

export default AhorroApp;
