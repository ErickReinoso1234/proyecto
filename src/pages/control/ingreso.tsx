import React, { useState, useEffect } from 'react';
import { Input, Button, message, Space } from 'antd';
import moment from 'moment-timezone';
import { HourglassOutlined } from '@ant-design/icons'; // Importa el icono de calendario

interface IngresoProps {
  setIncome: React.Dispatch<React.SetStateAction<number>>;
  setExtraIncome: React.Dispatch<React.SetStateAction<number>>;
}

export function Ingreso({ setIncome, setExtraIncome }: IngresoProps) {
  const [income, setIncomeState] = useState('');
  const [extraIncome, setExtraIncomeState] = useState('');
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

  const handleSetIncome = () => {
    setIncome(parseFloat(income));
    setIncomeState('');
    localStorage.setItem('lastIncomeDate', moment().toISOString()); // Guardar la fecha del último ingreso mensual
    setIngresoMensualActivo(false); // Bloquear el ingreso mensual después del primer ingreso
  };

  const handleSetExtraIncome = () => {
    setExtraIncome(parseFloat(extraIncome));
    setExtraIncomeState('');
  };

  const handleActivarIngresoMensual = () => {
    setIngresoMensualActivo(true); // Activar manualmente el ingreso mensual
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2>Ingresar Ingreso Mensual</h2>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <label style={{ marginRight: '8px', color: '#000' }}>Ingreso:</label>
        <Input type="number" value={income} onChange={(e) => setIncomeState(e.target.value)} style={{ width: '200px' }} disabled={!ingresoMensualActivo} />
        {!ingresoMensualActivo && (
          <Button icon={<HourglassOutlined />} onClick={handleActivarIngresoMensual} style={{ marginLeft: '8px' }}>Activar</Button>
        )}
      </div>
      <Button type="primary" onClick={handleSetIncome} disabled={!ingresoMensualActivo}>Establecer Ingreso</Button>

      <h2 style={{ marginTop: '20px' }}>Ingresar Ingreso Extra</h2>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ marginRight: '8px', color: '#000' }}>Ingreso Extra:</label>
        <Input type="number" value={extraIncome} onChange={(e) => setExtraIncomeState(e.target.value)} style={{ width: '200px' }} />
      </div>
      <Button type="primary" onClick={handleSetExtraIncome}>Establecer Ingreso Extra</Button>
    </div>
  );
}
