import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

function LineGraph({ dataOfCitites }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  );

  console.log(`DATA GRAPH`, dataOfCitites);
  const DataTrue = dataOfCitites.map((el) => {
    return {
      labels: el.data.map((elem) => moment(elem.date).format('L')),
      datasets: {
        fill: true,
        label: 'Dataset 2',
        data: el.data.map((elem) => elem.value),

        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    };
  });
  let DataNew = {
    labels: dataOfCitites[0].data.map((elem) => moment(elem.date).format('LL')),
    datasets: dataOfCitites.map((el, index) => {
      return {
        fill: true,
        label: el.category,
        data: el.data.map((elem) => elem.value),

        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ][index],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ][index],
      };
    }),
  };

  let testData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        fill: true,
        label: 'Dataset 2',
        data: [188, 285, 1, 577, 152, 698, 726],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  console.log(`test your`, DataNew);
  console.log(`test vs`, testData);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  return <Line options={options} data={DataNew || []} />;
}
export default LineGraph;
