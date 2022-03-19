import React from 'react';
import axios from 'axios';
import { Layout, Table, Select, Typography, Button } from 'antd';
import 'antd/dist/antd.less';
import Input from 'antd/lib/input/Input';
import './App.less';
import SiderPart from './components/Sider';
import test from './test.svg';
import moment from 'moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;
const { Text, Link } = Typography;
function App() {
  const columns = [
    {
      title: 'Дата',
      dataIndex: 'date',
      render: (el) => moment(el).format('LL'),
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      render: (el) => <>{el} ₽</>,
    },
  ];
  const [listOfTown, setListOfTown] = React.useState([]);
  const [listOfShop, setListOfShop] = React.useState([]);
  const [currentTown, setCurrentTown] = React.useState([]);
  const [currentShop, setCurrentShop] = React.useState([]);
  const [infoItem, setInfoItem] = React.useState([]);
  React.useEffect(() => {
    async function fetchData() {
      try {
        const townResponse = await axios.get(`https://ruprice.flareon.ru/api/entities/cities`);

        setListOfTown(townResponse.data);
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, []);

  async function getListOfShop(arr) {
    console.log(arr);
    let test = await arr.map((el) => {
      return el.id;
    });
    console.log(test);
    try {
      const shopResponse = await axios.post(
        `https://ruprice.flareon.ru/api/entities/retailer-by-city`,

        test,
      );

      setListOfShop(shopResponse.data);
    } catch (error) {
      alert(error);
    }
  }
  function handleChange(value, rest) {
    getListOfShop(rest);
    setCurrentTown(rest);
  }
  function getCurrentShop(value, rest) {
    setCurrentShop(rest);
  }
  // function getItemInfo(arr) {
  //   let res = axios.get(`https://ruprice.flareon.ru/api/entities/price-by-offer?id=${arr[0].id}`);
  //   console.log(res.data);
  //   setInfoItem(res.data);
  // }
  async function getItemInfo(arr) {
    let test = arr[0].id;
    try {
      const res = await axios.get(
        `https://ruprice.flareon.ru/api/entities/price-by-offer?id=${test}`,
      );

      setInfoItem(res.data);
    } catch (error) {
      alert(error);
    }
  }
  console.log(currentShop);
  ////
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => 30),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => 40),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  ////
  return (
    <Layout style={{ height: '100%' }}>
      <Header
        style={{
          backgroundImage: `url(${test})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '200px',
        }}>
        Header
      </Header>
      <Layout>
        <SiderPart
          handleChange={handleChange}
          getCurrentShop={getCurrentShop}
          getItemInfo={getItemInfo}
          listOfTown={listOfTown}
          listOfShop={listOfShop}
          currentTown={currentTown}
          currentShop={currentShop}
        />
        <Content>
          <Bar options={options} data={data} />

          <Table dataSource={infoItem} columns={columns} />
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
