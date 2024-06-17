import { useState } from 'react';
import { Row, Col, Button } from 'antd';
import { useExpenseContext } from './expensecontext';
import { Porcentajes } from './porcentajes';
import { GastosFijos } from './gastosfijos';
import { GastosVariables } from './gastosvariables';
import Summary from './summary';
import { Ahorros } from './ahorros';
import { Ingreso } from './ingreso';
import { Historial } from './historial';

export function Gastos() {
  const {
    ingreso,
    extraIngreso,
    gastos,
    ahorros,
    porcentajeFijo,
    porcentajeVariable,
    porcentajeAhorro,
    setIngreso,
    setExtraIngreso,
    setPorcentajeFijo,
    setPorcentajeVariable,
    setporcentajeAhorro,
    setGastos,
    setAhorros,
  } = useExpenseContext();

  const [showHistory, setShowHistory] = useState<boolean>(false);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const toggleStyles = {
    background: showHistory ? '#1890ff' : '#f5222d',
    color: '#fff',
    border: 'none',
    marginTop: '16px',
    width: '100%',
  };

  const columnStyles = {
    backgroundColor: '#f0f2f5',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  };

  const totalIngresos = ingreso + extraIngreso;

  const remainingFixed = (totalIngresos * porcentajeFijo) / 100 - gastos.fixed.reduce((sum, gasto) => sum + gasto.amount, 0);
  const remainingVariable = (totalIngresos * porcentajeVariable) / 100 - gastos.variable.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingSavings = (totalIngresos * porcentajeAhorro) / 100 - ahorros.reduce((sum, ahorros) => sum + ahorros.amount, 0);

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ color: 'white', textAlign: 'center' }}>Control de Gastos</h1>
      <Row gutter={16} style={{ marginTop: '24px' }}>
        <Col span={12} style={columnStyles}>
          <Ingreso setIngreso={setIngreso} setExtraIngreso={setExtraIngreso} />
        </Col>
        <Col span={12} style={columnStyles}>
          <Porcentajes
            porcentajeFijo={porcentajeFijo}
            setPorcentajeFijo={setPorcentajeFijo}
            porcentajeVariable={porcentajeVariable}
            setPorcentajeVariable={setPorcentajeVariable}
            porcentajeAhorros={porcentajeAhorro}
            setPorcentajeAhorros={setporcentajeAhorro}
          />
        </Col>
        <Col span={12} style={columnStyles}>
          <GastosFijos setGastos={setGastos} remainingFixed={remainingFixed} />
        </Col>
        <Col span={12} style={columnStyles}>
          <GastosVariables setGastos={setGastos} remainingVariable={remainingVariable} />
        </Col>
        <Col span={24} style={columnStyles}>
          <Row gutter={16}>
            <Col span={12} style={{ marginBottom: '16px' }}>
              <Ahorros setAhorros={setAhorros} remainingSavings={remainingSavings} />
            </Col>
            <Col span={12} style={{ marginBottom: '16px' }}>
              <Summary
                porcentajeFijo={porcentajeFijo}
                porcentajeVariable={porcentajeVariable}
                porcentajeAhorro={porcentajeAhorro}
                gastos={gastos}
                ahorros={ahorros}
                ingreso={totalIngresos}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Button style={toggleStyles} onClick={toggleHistory}>
            {showHistory ? 'Ocultar Historial' : 'Ver Historial'}
          </Button>
        </Col>
        <Col span={24} style={columnStyles}>
          <p>Ingreso Mensual: {ingreso}</p>
          <p>Ingreso Extra: {extraIngreso}</p>
        </Col>
        {showHistory && (
          <Col span={24} style={columnStyles}>
            <Historial expenses={gastos.fixed.concat(gastos.variable)} ahorros={ahorros} />
          </Col>
        )}
      </Row>
    </div>
  );
}
