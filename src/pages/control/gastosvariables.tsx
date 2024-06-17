import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import { Expenses } from './types';
import moment from 'moment-timezone';

interface GastosVariablesProps {
  setExpenses: React.Dispatch<React.SetStateAction<Expenses>>;
  remainingVariable: number;
}

export function GastosVariables({ setExpenses, remainingVariable }: GastosVariablesProps) {
  const [name, setName] = useState('');
  const [variable, setVariable] = useState('');
  const [date, setDate] = useState('');

  const handleAddVariableExpense = () => {
    const amount = parseFloat(variable);
    if (isNaN(amount)) {
      message.error('Por favor ingresa un monto válido para el gasto variable.');
      return;
    }
    if (amount > remainingVariable) {
      message.error('El gasto variable excede el presupuesto permitido.');
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
      fixed: prev.fixed, // Asegura que los gastos fijos se mantienen igual
      variable: [...prev.variable, { name, amount, date, type: 'Gasto Variable'}],
    }));
    setName('');
    setVariable('');
    setDate('');
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2>Gastos Variables</h2>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ marginRight: '8px', color: '#000' }}>Nombre:</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} style={{ width: '200px' }} />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ marginRight: '8px', color: '#000' }}>Monto:</label>
        <Input type="number" value={variable} onChange={(e) => setVariable(e.target.value)} style={{ width: '200px' }} />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ marginRight: '8px', color: '#000' }}>Fecha:</label>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ width: '200px' }} />
      </div>
      <Button type="primary" onClick={handleAddVariableExpense}>Agregar Gasto Variable</Button>
      <p>Presupuesto restante para gastos variables: {remainingVariable}</p>
    </div>
  );
}
