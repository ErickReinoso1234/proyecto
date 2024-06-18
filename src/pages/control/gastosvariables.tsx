import React, { useState} from 'react';
import axios from 'axios';
import { Input, Button, message } from 'antd';
import { Gastos } from './types';
import moment from 'moment-timezone';

interface GastosVariablesProps {
  setGastos: React.Dispatch<React.SetStateAction<Gastos>>;
  remainingVariable: number;
}

export function GastosVariables({ setGastos, remainingVariable }: GastosVariablesProps) {
  const [name, setName] = useState('');
  const [variable, setVariable] = useState('');
  const [date, setDate] = useState('');
  // Función para agregar un nuevo gasto variable
  const addVariableExpense = async () => {
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
    try {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      const response = await axios.post('http://localhost:4000/gastos-variables', {
        name,
        amount,
        date: formattedDate,
        type: 'Gasto Fijo'
      });
      // Actualizar el estado global después de agregar el nuevo gasto variable
      setGastos((prev) => ({
        ...prev,
        fixed: prev.fixed , // Asegura que los gastos fijos se mantienen igual
        variable: [...prev.variable, { name, amount, date, type: 'Gasto Variable'}, response.data],
      }));
      setName('');
      setVariable('');
      setDate('');
      message.success('¡Gasto variable agregado exitosamente!');

    } catch (error) {
      console.error('Error adding variable expense:', error);
      // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
      message.error('Error al agregar el gasto variable.');
    }
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
      <Button type="primary" onClick={addVariableExpense}>Agregar Gasto Variable</Button>
      <p>Presupuesto restante para gastos variables: {remainingVariable}</p>
    </div>
  );
}
