// components/MyDonutChartComponent.tsx
import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { Ahorro } from '../control/types';

interface MyDonutChartComponentProps {
  ahorros: Ahorro[];
}

const MyDonutChartComponent: React.FC<MyDonutChartComponentProps> = ({ ahorros }) => {
  useEffect(() => {
    const series = ahorros.map(ahorro => {
      const numericAmount = Number(ahorro.amount);
      return isNaN(numericAmount) ? 0 : numericAmount;
    });

    const options = {
      series,
      chart: {
        width: 380,
        type: 'donut'
      },
      labels: ahorros.map(ahorro => ahorro.name),
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    const chart = new ApexCharts(document.querySelector("#donut-chart")!, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [ahorros]);

  return (
    <div id="donut-chart"></div>
  );
};

export default MyDonutChartComponent;
