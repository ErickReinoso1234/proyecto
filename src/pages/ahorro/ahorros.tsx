import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Gasto {
  nombre: string;
  cantidad: number;
  tipo: string;
}

const AhorroApp = () => {
  const [saldoInicial, setSaldoInicial] = useState(0);
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [nombreGasto, setNombreGasto] = useState('');
  const [cantidadGasto, setCantidadGasto] = useState(0);
  const [tipoGasto, setTipoGasto] = useState('fijo');
  const [tipoEmergencia, setTipoEmergencia] = useState('');

  const handleAgregarGasto = () => {
    const nuevoGasto: Gasto = {
      nombre: nombreGasto,
      cantidad: cantidadGasto,
      tipo: tipoGasto
    };
    setGastos([...gastos, nuevoGasto]);
    setSaldoInicial(saldoInicial - cantidadGasto); // Reducir el saldo inicial
    setNombreGasto('');
    setCantidadGasto(0);
    setTipoGasto('fijo');
  };

  const calcularPorcentaje = (cantidad: number) => {
    return ((cantidad / saldoInicial) * 100).toFixed(2);
  };

  return (
    <div className="container mt-5 text-white">
      <h1>Ahorro App</h1>
      <div className="mb-3">
        <label htmlFor="saldoInicial" className="form-label ">Saldo Inicial:</label>
        <input
          type="number"
          className="form-control"
          id="saldoInicial"
          value={saldoInicial}
          onChange={(e) => setSaldoInicial(parseInt(e.target.value))}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="nombreGasto" className="form-label">Nombre del Gasto:</label>
        <input
          type="text"
          className="form-control"
          id="nombreGasto"
          value={nombreGasto}
          onChange={(e) => setNombreGasto(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cantidadGasto" className="form-label">Cantidad del Gasto:</label>
        <input
          type="number"
          className="form-control"
          id="cantidadGasto"
          value={cantidadGasto}
          onChange={(e) => setCantidadGasto(parseInt(e.target.value))}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tipoGasto" className="form-label">Tipo de Gasto:</label>
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
      <button className="btn btn-primary" onClick={handleAgregarGasto}>Agregar Gasto</button>

      <h2>Gastos:</h2>
      <ul className="list-group">
        {gastos.map((gasto, index) => (
          <li key={index} className="list-group-item">
            {gasto.nombre}: ${gasto.cantidad} ({gasto.tipo})
            - Porcentaje del saldo inicial: {calcularPorcentaje(gasto.cantidad)}%
          </li>
        ))}
      </ul>
      
      <div className="mb-3">
        <label htmlFor="tipoEmergencia" className="form-label">Gasto de Emergencia:</label>
        <input
          type="text"
          className="form-control"
          id="tipoEmergencia"
          value={tipoEmergencia}
          onChange={(e) => setTipoEmergencia(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AhorroApp;
