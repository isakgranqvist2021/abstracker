import { ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const data = {
  labels,
  datasets: [
    {
      label: 'Monday',
      data: [4, 7, 9, 5, 1, 11, 3, 0, 8, 2, 6, 10],
      backgroundColor: 'rgb(0, 25, 60)',
      borderColor: 'rgb(0, 25, 60)',
      barThickness: 20,
    },
    {
      label: 'Tuesday',
      data: [9, 8, 2, 3, 6, 10, 11, 7, 1, 0, 4, 5],
      backgroundColor: 'rgb(123, 146, 178)',
      borderColor: 'rgb(123, 146, 178)',
      barThickness: 20,
    },
    {
      label: 'Wednesday',
      data: [0, 6, 7, 2, 8, 11, 1, 5, 9, 4, 10, 3],
      backgroundColor: 'rgb(103, 203, 160)',
      borderColor: 'rgb(103, 203, 160)',
      barThickness: 20,
    },
    {
      label: 'Thursday',
      data: [7, 2, 8, 6, 10, 1, 9, 3, 5, 0, 11, 4],
      backgroundColor: 'rgb(24, 26, 42)',
      borderColor: 'rgb(24, 26, 42)',
      barThickness: 20,
    },
    {
      label: 'Friday',
      data: [5, 6, 11, 1, 10, 9, 7, 3, 0, 4, 2, 8],
      backgroundColor: 'rgb(75, 107, 251)',
      borderColor: 'rgb(75, 107, 251)',
      barThickness: 20,
    },
  ],
};

const options: ChartOptions<'bar' | 'line'> = {
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
  return (
    <div className="flex gap-3">
      <Line options={options} data={data} />
      <Bar options={options} data={data} />
    </div>
  );
}
