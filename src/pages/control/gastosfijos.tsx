import React, { useState } from 'react';
import { Input, Button, Select, message } from 'antd';
import { Expenses } from './types';
import { HomeOutlined, ThunderboltOutlined, AlertOutlined, WifiOutlined, FireOutlined, PhoneOutlined } from '@ant-design/icons';
import moment from 'moment-timezone';

const { Option } = Select;

interface GastosFijosProps {
  setExpenses: React.Dispatch<React.SetStateAction<Expenses>>;
  remainingFixed: number;
}

const fixedExpensesList = [
  { name: 'Alquiler', icon: <HomeOutlined /> },
  { name: 'Electricidad', icon: <ThunderboltOutlined /> },
  { name: 'Agua', icon: <AlertOutlined /> },
  { name: 'Internet', icon: <WifiOutlined /> },
  { name: 'Gas', icon: <FireOutlined /> },
  { name: 'Teléfono', icon: <PhoneOutlined /> }
];

export function GastosFijos({ setExpenses, remainingFixed }: GastosFijosProps) {
  const [name, setName] = useState('');
  const [fixed, setFixed] = useState('');
  const [date, setDate] = useState('');

  const handleAddFixedExpense = () => {
    const amount = parseFloat(fixed);
    if (amount > remainingFixed) {
      message.error('El gasto fijo excede el presupuesto permitido.');
      return;
    }

    // Validación de la fecha con Moment.js y zona horaria de Ecuador
    const currentDate = moment().tz('America/Guayaquil');
    const selectedDate = moment(date).tz('America/Guayaquil');
    if (selectedDate.isBefore(currentDate, 'day')) {
      message.error('La fecha no puede ser anterior al día de hoy.');
      return;
    }

    setExpenses((prev) => ({
      ...prev,
      fixed: [...prev.fixed, { name, amount, date, type: 'Gasto Fijo'}],
      variable: prev.variable // Asegura que la variable se mantiene igual
    }));
    setName('');
    setFixed('');
    setDate('');
  };

  const handleSelectFixedExpense = (value: string) => {
    setName(value);
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2>Gastos Fijos</h2>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ marginRight: '8px', color: '#000' }}>Nombre:</label>
        <Select
          value={name}
          style={{ width: '200px' }}
          onChange={handleSelectFixedExpense}
        >
          {fixedExpensesList.map((expense, index) => (
            <Option key={index} value={expense.name}>
              {expense.icon} {expense.name}
            </Option>
          ))}
        </Select>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ marginRight: '8px', color: '#000' }}>Monto:</label>
        <Input type="number" value={fixed} onChange={(e) => setFixed(e.target.value)} style={{ width: '200px' }} />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ marginRight: '8px', color: '#000' }}>Fecha:</label>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ width: '200px' }} />
      </div>
      <Button type="primary" onClick={handleAddFixedExpense}>Agregar Gasto Fijo</Button>
      <p>Presupuesto restante para gastos fijos: {remainingFixed}</p>
    </div>
  );
}
