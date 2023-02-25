import { ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Monday',
      data: [0, 1, 2, 3, 4, 5, 6],
      backgroundColor: 'rgb(0, 25, 60)',
    },
    {
      label: 'Tuesday',
      data: [0, 1, 2, 3, 4, 5, 6],
      backgroundColor: 'rgb(123, 146, 178)',
    },
    {
      label: 'Wednesday',
      data: [0, 1, 2, 3, 4, 5, 6],
      backgroundColor: 'rgb(103, 203, 160)',
    },
    {
      label: 'Thursday',
      data: [0, 1, 2, 3, 4, 5, 6],
      backgroundColor: 'rgb(24, 26, 42)',
    },
    {
      label: 'Friday',
      data: [0, 1, 2, 3, 4, 5, 6],
      backgroundColor: 'rgb(75, 107, 251)',
    },
  ],
};

const options: ChartOptions<'bar'> = {
  plugins: {
    title: {
      display: true,
      text: 'Total Hours Away - Month & Day',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export function HoursAwayChart() {
  return <Bar options={options} data={data} />;
}
