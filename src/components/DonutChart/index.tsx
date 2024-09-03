import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, Title);

interface DonutChartProps {
  data: number[];
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const chartData = {
    labels: ['Аудио', 'Изображение', 'Видео', 'Документ', 'Другое'],
    datasets: [
      {
        label: 'Количество файлов по типу',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Количество файлов по типу',
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default DonutChart;
