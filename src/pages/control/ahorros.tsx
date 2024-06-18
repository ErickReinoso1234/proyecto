import React, { useState} from 'react';
import { Input, Button, message } from 'antd';
import axios from 'axios';
import moment from 'moment-timezone';
import { useExpenseContext } from './expensecontext';
import { Ahorro } from './types';

interface AhorrosProps {
  remainingSavings: number;
  setAhorros: React.Dispatch<React.SetStateAction<Ahorro[]>>;
}

export function Ahorros({ remainingSavings, setAhorros }: AhorrosProps) {
  const { ahorros, ingreso, porcentajeAhorro } = useExpenseContext();
  const [name, setName] = useState('');
  const [monto, setMonto] = useState('');
  const [date, setDate] = useState('');
  // Función para manejar el evento de agregar ahorro
  const controlAhorros = async () => {
    const savingAmount = parseFloat(monto);
    const totalSavings = ahorros.reduce((sum, ahorro) => sum + ahorro.amount, 0);
    const maxSavings = (ingreso * porcentajeAhorro) / 100;

    if (savingAmount > (maxSavings - totalSavings)) {
      message.error('El ahorro excede el presupuesto permitido.');
      return;
    }

    // Validación de la fecha
    const currentDate = moment(); // Fecha y hora actuales en la zona horaria por defecto (Ecuador)
    const selectedDate = moment(date); // Fecha seleccionada por el usuario

    if (selectedDate.isBefore(currentDate, 'day')) {
      message.error('La fecha no puede ser anterior al día de hoy.');
      return;
    }

    try {
      // Realizar la solicitud POST para agregar un nuevo ahorro
      const response = await axios.post('http://localhost:4000/ahorros', {
        name,
        amount: savingAmount,
        date,
        type: 'Ahorro',
      });

      // Actualizar el estado local con el nuevo ahorro agregado
      setAhorros((prevAhorros) => [...prevAhorros, response.data]);

      // Limpiar los campos del formulario
      setName('');
      setMonto('');
      setDate('');

      message.success('Ahorro agregado correctamente');
    } catch (error) {
      console.error('Error al agregar ahorro:', error);
      message.error('Error al agregar ahorro');
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2>Ahorros</h2>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ marginRight: '8px' }}>Nombre:</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ marginRight: '8px' }}>Monto:</label>
        <Input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ marginRight: '8px' }}>Fecha:</label>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <Button type="primary" onClick={controlAhorros}>Agregar Ahorro</Button>
      <p>Presupuesto restante para ahorros: ${remainingSavings.toFixed(2)}</p>
    </div>
  );
}