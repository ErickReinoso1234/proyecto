// components/MyChartComponent.tsx
import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

interface Ahorro {
  id: number;
  name: string;
  amount: number;
  date: string;
  type: string;
}

interface MyChartComponentProps {
  ahorros: Ahorro[];
}

const MyChartComponent: React.FC<MyChartComponentProps> = ({ ahorros }) => {
  useEffect(() => {
    const series = [
      {
        name: 'Ahorros',
        data: ahorros.map(ahorro => {
          const numericAmount = Number(ahorro.amount);
          return {
            x: new Date(ahorro.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' }),
            y: isNaN(numericAmount) ? 0 : numericAmount
          };
        })
      }
    ];

    
    const maxAhorro = Math.max(...ahorros.map(ahorro => ahorro.amount), 0);

    const options = {
      series,
      chart: {
        type: 'bar',
        height: 350,
      },
      colors: ['#008FFB'],
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'category',
        title: {
          text: 'Fecha',
        },
        labels: {
          rotate: -45,  
        },
      },
      yaxis: {
        title: {
          text: 'Ahorro ($)',
        },
        labels: {
          formatter: (val: number) => `$${val.toFixed(2)}`,
        },
        min: 0,
        max: maxAhorro * 1.1, 
      },
      tooltip: {
        y: {
          formatter: (val: number) => `$${val.toFixed(2)}`, 
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      }
    };

    const chart = new ApexCharts(document.querySelector("#chart")!, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [ahorros]);

  return (
    <div id="chart"></div>
  );
};

export default MyChartComponent;
