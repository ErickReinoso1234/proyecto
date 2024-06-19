import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, message } from 'antd';
import { HourglassOutlined } from '@ant-design/icons';
import moment from 'moment';

interface IngresoProps {
  setIngreso: React.Dispatch<React.SetStateAction<number>>;
  setExtraIngreso: React.Dispatch<React.SetStateAction<number>>;
}

export function Ingreso({ setIngreso, setExtraIngreso }: IngresoProps) {
  const [ingreso, setIngresoState] = useState('');
  const [extraIngreso, setExtraIngresos] = useState('');
  const [ingresoMensualActivo, setIngresoMensualActivo] = useState(true);

  useEffect(() => {
    // Verificar si ya se ingresó el ingreso mensual este mes
    const lastIncomeDate = localStorage.getItem('lastIncomeDate');
    if (lastIncomeDate) {
      const lastDate = moment(lastIncomeDate);
      const currentDate = moment();
      // Comparar si ha pasado al menos un mes desde el último ingreso mensual
      if (currentDate.diff(lastDate, 'months') >= 1) {
        setIngresoMensualActivo(true); // Activar el ingreso mensual automáticamente después de un mes
      } else {
        setIngresoMensualActivo(false); // Bloquear el ingreso mensual si ya se ingresó este mes
      }
    }
  }, []);

  const manejoIngresos = async () => {
    const amount = parseFloat(ingreso);
    if (isNaN(amount)) {
      message.error('Por favor ingresa un monto válido para el ingreso mensual.');
      return;
    }

    try {
      await axios.post('http://localhost:4000/ingresos', { amount });
      setIngreso(amount);
      setIngresoState('');
      localStorage.setItem('lastIncomeDate', moment().toISOString()); // Guardar la fecha del último ingreso mensual
      setIngresoMensualActivo(false); // Bloquear el ingreso mensual después del primer ingreso
    } catch (error) {
      console.error('Error adding income:', error);
      message.error('Error al establecer el ingreso mensual.');
    }
  };

  const manejoIngresosExtras = () => {
    const amount = parseFloat(extraIngreso);
    if (isNaN(amount)) {
      message.error('Por favor ingresa un monto válido para el ingreso extra.');
      return;
    }
    setExtraIngreso(prevExtra => prevExtra + amount);
    setExtraIngresos('');
  };

  const activarIngresoMensual = () => {
    setIngresoMensualActivo(true); // Activar manualmente el ingreso mensual
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2>Ingresar Ingreso Mensual</h2>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <label style={{ marginRight: '8px', color: '#000' }}>Ingreso:</label>
        <Input type="number" value={ingreso} onChange={(e) => setIngresoState(e.target.value)} style={{ width: '200px' }} disabled={!ingresoMensualActivo} />
        {!ingresoMensualActivo && (
          <Button icon={<HourglassOutlined />} onClick={activarIngresoMensual} style={{ marginLeft: '8px' }}>Activar</Button>
        )}
      </div>
      <Button type="primary" onClick={manejoIngresos} disabled={!ingresoMensualActivo}>Establecer Ingreso</Button>

      <h2 style={{ marginTop: '20px' }}>Ingresar Ingreso Extra</h2>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ marginRight: '8px', color: '#000' }}>Ingreso Extra:</label>
        <Input type="number" value={extraIngreso} onChange={(e) => setExtraIngresos(e.target.value)} style={{ width: '200px' }} />
      </div>
      <Button type="primary" onClick={manejoIngresosExtras}>Establecer Ingreso Extra</Button>
    </div>
  );
}