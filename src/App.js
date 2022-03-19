import React from 'react';
import axios from 'axios';
import { Layout, Table, Select, Typography, Button } from 'antd';
import 'antd/dist/antd.less';
import Input from 'antd/lib/input/Input';
import './App.less';
import SiderPart from './components/Sider';
import test from './test.svg';
import moment from 'moment';
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
  const ctx = document.getElementById('myChart').getContext('2d');
  // const myChart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //         datasets: [{
  //             label: '# of Votes',
  //             data: [12, 19, 3, 5, 2, 3],
  //             backgroundColor: [
  //                 'rgba(255, 99, 132, 0.2)',
  //                 'rgba(54, 162, 235, 0.2)',
  //                 'rgba(255, 206, 86, 0.2)',
  //                 'rgba(75, 192, 192, 0.2)',
  //                 'rgba(153, 102, 255, 0.2)',
  //                 'rgba(255, 159, 64, 0.2)'
  //             ],
  //             borderColor: [
  //                 'rgba(255, 99, 132, 1)',
  //                 'rgba(54, 162, 235, 1)',
  //                 'rgba(255, 206, 86, 1)',
  //                 'rgba(75, 192, 192, 1)',
  //                 'rgba(153, 102, 255, 1)',
  //                 'rgba(255, 159, 64, 1)'
  //             ],
  //             borderWidth: 1
  //         }]
  //     },
  //     options: {
  //         scales: {
  //             y: {
  //                 beginAtZero: true
  //             }
  //         }
  //     }
  // });
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
          <div id="chartDiv1" style={{ width: '100%', height: '500px' }}>
            {' '}
          </div>

          <Table dataSource={infoItem} columns={columns} />
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
