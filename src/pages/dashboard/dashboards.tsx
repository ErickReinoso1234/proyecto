import React from 'react';
import MyChartComponent from './grafica';
import MyDonutChartComponent from './donut';
import MyCard from './card';




const Dashboard: React.FC = () => {
  return (
    <div className='container'>
<div className='row'>
<div className='col'>
      <MyCard title="Gastos de comida" amount={2332} />
    </div>
    <div className='col'>
      <MyCard title="Gastos de Transporte" amount={3450} />
    </div>
    <div className='col'>
      <MyCard title="Gastos de Estudios" amount={2900} />
    </div>
    <div className='col'>
      <MyCard title="Otros Gastos" amount={3100} />
    </div>
    </div>
  <div><MyChartComponent /></div>
  <div><MyDonutChartComponent /></div>
  </div>
  );
};

export default Dashboard;
