// components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { getAhorros } from './dashborad.service';
import MyChartComponent from './grafica';
import MyDonutChartComponent from './donut';


interface Ahorro {
  id: number;
  name: string;
  amount: number;
  date: string;
  type: string;
}

const Dashboard: React.FC = () => {
  const [ahorros, setAhorros] = useState<Ahorro[]>([]);

  useEffect(() => {
    const fetchAhorros = async () => {
      try {
        const data = await getAhorros();
        setAhorros(data);
      } catch (error) {
        console.error('Failed to fetch ahorros', error);
      }
    };

    fetchAhorros();
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h2>Total Ahorros</h2>
          <MyChartComponent ahorros={ahorros} />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <h2>Ahorros Detallados</h2>
          <MyDonutChartComponent ahorros={ahorros} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
