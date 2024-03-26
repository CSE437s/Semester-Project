// SavingsGraph.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  scales: {
    x: {
      // `x` uses the category scale by default
    },
    y: {
      beginAtZero: true,
    },
  },
  legend: {
    display: false,
  },
  maintainAspectRatio: false,
};

function SavingsGraph({ data }) {
  const labels = data.map(point => point.year.toString()); // Convert year to string for category scale
  const values = data.map(point => point.value);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Savings Over Time',
        data: values,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default SavingsGraph;
