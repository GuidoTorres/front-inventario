import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const prueba = {
  labels: ['Bueno', 'Regular', 'Malo'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3,],
      backgroundColor: [
        'rgba(145, 53, 73, 0.2)',
        'rgba(39, 100, 141, 0.2)',
        'rgba(174, 140, 52, 0.2)',

      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',

      ],
      borderWidth: 1
    }
  ]
};

const Grafico = ({data}) => (
  <Doughnut data={data} />
);

export default Grafico;
