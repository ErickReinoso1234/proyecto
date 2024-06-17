import React, { useState } from 'react';
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
    income,
    extraIncome,
    expenses,
    savings,
    fixedPercentage,
    variablePercentage,
    savingsPercentage,
    setIncome,
    setExtraIncome,
    setFixedPercentage,
    setVariablePercentage,
    setSavingsPercentage,
    setExpenses,
    setSavings,
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

  const totalIncome = income + extraIncome;

  const remainingFixed = (totalIncome * fixedPercentage) / 100 - expenses.fixed.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingVariable = (totalIncome * variablePercentage) / 100 - expenses.variable.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingSavings = (totalIncome * savingsPercentage) / 100 - savings.reduce((sum, saving) => sum + saving.amount, 0);

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ color: 'white', textAlign: 'center' }}>Control de Gastos</h1>
      <Row gutter={16} style={{ marginTop: '24px' }}>
        <Col span={12} style={columnStyles}>
          <Ingreso setIncome={setIncome} setExtraIncome={setExtraIncome} />
        </Col>
        <Col span={12} style={columnStyles}>
          <Porcentajes
            fixedPercentage={fixedPercentage}
            setFixedPercentage={setFixedPercentage}
            variablePercentage={variablePercentage}
            setVariablePercentage={setVariablePercentage}
            savingsPercentage={savingsPercentage}
            setSavingsPercentage={setSavingsPercentage}
          />
        </Col>
        <Col span={12} style={columnStyles}>
          <GastosFijos setExpenses={setExpenses} remainingFixed={remainingFixed} />
        </Col>
        <Col span={12} style={columnStyles}>
          <GastosVariables setExpenses={setExpenses} remainingVariable={remainingVariable} />
        </Col>
        <Col span={24} style={columnStyles}>
          <Row gutter={16}>
            <Col span={12} style={{ marginBottom: '16px' }}>
              <Ahorros setSavings={setSavings} remainingSavings={remainingSavings} />
            </Col>
            <Col span={12} style={{ marginBottom: '16px' }}>
              <Summary
                fixedPercentage={fixedPercentage}
                variablePercentage={variablePercentage}
                savingsPercentage={savingsPercentage}
                expenses={expenses}
                savings={savings}
                income={totalIncome}
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
          <p>Ingreso Mensual: {income}</p>
          <p>Ingreso Extra: {extraIncome}</p>
        </Col>
        {showHistory && (
          <Col span={24} style={columnStyles}>
            <Historial expenses={expenses.fixed.concat(expenses.variable)} savings={savings} />
          </Col>
        )}
      </Row>
    </div>
  );
}
