import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Select, message} from 'antd';
import { HomeOutlined, ThunderboltOutlined, AlertOutlined, WifiOutlined, FireOutlined, PhoneOutlined } from '@ant-design/icons';
import moment from 'moment-timezone';
import { Gastos } from './types';

const { Option } = Select;

interface GastosFijosProps {
  setGastos: React.Dispatch<React.SetStateAction<Gastos>>;
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

export function GastosFijos({ setGastos, remainingFixed }: GastosFijosProps) {
  const [name, setName] = useState('');
  const [fixed, setFixed] = useState('');
  const [date, setDate] = useState('');

  const addFixedExpense = async () => {
    const amount = parseFloat(fixed);
    if (isNaN(amount)) {
      message.error('Por favor ingresa un monto válido para el gasto fijo.');
      return;
    }
    if (amount > remainingFixed) {
      message.error('El gasto fijo excede el presupuesto permitido.');
      return;
    }

    const currentDate = moment().tz('America/Guayaquil');
    const selectedDate = moment(date).tz('America/Guayaquil');
    if (selectedDate.isBefore(currentDate, 'day')) {
      message.error('La fecha no puede ser anterior al día de hoy.');
      return;
    }

    try {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      const response = await axios.post('http://localhost:4000/gastos-fijos', {
        name,
        amount,
        date: formattedDate,
        type: 'Gasto Fijo'
      });
      // Actualizar el estado global después de agregar el nuevo gasto fijo
      setGastos((prev) => ({
        ...prev,
        fixed: [...prev.fixed, response.data],
        variable: prev.variable // Asegura que la variable se mantiene igual
      }));
      setName('');
      setFixed('');
      setDate('');
      message.success('¡Gasto fijo agregado exitosamente!');
    } catch (error: any) { // Definir explícitamente como 'any'
      console.error('Error adding fixed expense:', error);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || 'Error al agregar el gasto fijo.';
        message.error(`Error: ${errorMessage}`);
      } else {
        message.error('Error al agregar el gasto fijo.');
      }
    }
  };

  const selectGastoFijo = (value: string) => {
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
          onChange={selectGastoFijo}
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
      <Button type="primary" onClick={addFixedExpense}>Agregar Gasto Fijo</Button>
      <p>Presupuesto restante para gastos fijos: ${remainingFixed.toFixed(2)}</p>
    </div>
  );
}
