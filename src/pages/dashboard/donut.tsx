// MyDonutChartComponent.tsx
import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const MyDonutChartComponent: React.FC = () => {
  useEffect(() => {
    const options = {
      series: [44, 55, 41, 17, 15, 12, 32],
      chart: {
        width: 380,
        type: 'donut',
      },
      labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
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
  }, []);

  return (
    <div id="donut-chart">
    </div>
  );
};

export default MyDonutChartComponent;
