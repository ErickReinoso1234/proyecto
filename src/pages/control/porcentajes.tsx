import React from 'react';
import { Select } from 'antd';
import { message } from 'antd';

const { Option } = Select;

interface PorcentajesProps {
  fixedPercentage: number;
  setFixedPercentage: React.Dispatch<React.SetStateAction<number>>;
  variablePercentage: number;
  setVariablePercentage: React.Dispatch<React.SetStateAction<number>>;
  savingsPercentage: number;
  setSavingsPercentage: React.Dispatch<React.SetStateAction<number>>;
}

export function Porcentajes({
  fixedPercentage,
  setFixedPercentage,
  variablePercentage,
  setVariablePercentage,
  savingsPercentage,
  setSavingsPercentage,
}: PorcentajesProps) {
  const handleFixedChange = (value: number) => {
    if (value < 30 || value > 50) {
      showErrorMessage('Gastos Fijos', '30% - 50%');
      return;
    }
    updatePercentages(value, 'fixed');
  };

  const handleVariableChange = (value: number) => {
    if (value < 10 || value > 30) {
      showErrorMessage('Gastos Variables', '10% - 30%');
      return;
    }
    updatePercentages(value, 'variable');
  };

  const handleSavingsChange = (value: number) => {
    if (value < 20 || value > 40) {
      showErrorMessage('Ahorros', '20% - 40%');
      return;
    }
    updatePercentages(value, 'savings');
  };

  const showErrorMessage = (label: string, range: string) => {
    const errorMessage = `El porcentaje de ${label} debe estar entre ${range}.`;
    // Use Ant Design message to show the error message
    message.error(errorMessage);
  };

  const updatePercentages = (value: number, type: 'fixed' | 'variable' | 'savings') => {
    const remainingPercentage = 100 - value;
    switch (type) {
      case 'fixed':
        setFixedPercentage(value);
        setVariableAndSavingsPercentage(remainingPercentage, variablePercentage, savingsPercentage);
        break;
      case 'variable':
        setVariablePercentage(value);
        setFixedAndSavingsPercentage(remainingPercentage, fixedPercentage, savingsPercentage);
        break;
      case 'savings':
        setSavingsPercentage(value);
        setFixedAndVariablePercentage(remainingPercentage, fixedPercentage, variablePercentage);
        break;
      default:
        break;
    }
  };

  const setVariableAndSavingsPercentage = (remaining: number, variable: number, savings: number) => {
    if (remaining === 0) {
      setVariablePercentage(0);
      setSavingsPercentage(0);
    } else if (remaining >= variable) {
      setVariablePercentage(variable);
      setSavingsPercentage(remaining - variable);
    } else {
      setVariablePercentage(remaining);
      setSavingsPercentage(0);
    }
  };

  const setFixedAndSavingsPercentage = (remaining: number, fixed: number, savings: number) => {
    if (remaining === 0) {
      setFixedPercentage(0);
      setSavingsPercentage(0);
    } else if (remaining >= fixed) {
      setFixedPercentage(fixed);
      setSavingsPercentage(remaining - fixed);
    } else {
      setFixedPercentage(remaining);
      setSavingsPercentage(0);
    }
  };

  const setFixedAndVariablePercentage = (remaining: number, fixed: number, variable: number) => {
    if (remaining === 0) {
      setFixedPercentage(0);
      setVariablePercentage(0);
    } else if (remaining >= fixed) {
      setFixedPercentage(fixed);
      setVariablePercentage(remaining - fixed);
    } else {
      setFixedPercentage(remaining);
      setVariablePercentage(0);
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2>Configuración de Porcentajes</h2>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ marginRight: '8px', color: '#000' }}>Gastos Fijos:</label>
        <Select value={fixedPercentage} onChange={handleFixedChange} style={{ width: '200px' }}>
          <Option value={50}>50%</Option>
          <Option value={40}>40%</Option>
          <Option value={30}>30%</Option>
        </Select>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ marginRight: '8px', color: '#000' }}>Gastos Variables:</label>
        <Select value={variablePercentage} onChange={handleVariableChange} style={{ width: '200px' }}>
          <Option value={30}>30%</Option>
          <Option value={20}>20%</Option>
          <Option value={10}>10%</Option>
        </Select>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ marginRight: '8px', color: '#000' }}>Ahorros:</label>
        <Select value={savingsPercentage} onChange={handleSavingsChange} style={{ width: '200px' }}>
          <Option value={20}>20%</Option>
          <Option value={30}>30%</Option>
          <Option value={40}>40%</Option>
        </Select>
      </div>
    </div>
  );
}
