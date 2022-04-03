import React from 'react';
import axios from 'axios';
import { Layout, Table, Select, Typography, Button, Row, Col, Carousel, Space } from 'antd';
import 'antd/dist/antd.less';
import Input from 'antd/lib/input/Input';
import './App.less';
import SiderPart from './components/Sider';
import { CSSTransition } from 'react-transition-group';

import moment from 'moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card } from 'antd';
import bg from './bg.png';
import shop2 from './shopsImage/2.jpg';
import shop3 from './shopsImage/3.jpg';
import shop4 from './shopsImage/4.jpg';
import shop5 from './shopsImage/5.jpg';
import shop6 from './shopsImage/6.jpg';
import shop7 from './shopsImage/9.jpg';
import shop8 from './shopsImage/10.jpg';
import GraphicXY from './components/Sider/Graphics/XY';
import Header from './components/Sider/Header';

const { Meta } = Card;

const { Footer, Sider, Content } = Layout;
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
  const [aboutItem, setAboutItem] = React.useState('');
  const [inProp, setInProp] = React.useState(false);
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
    console.log(rest);
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
    console.log(`need`, arr);
    let test = arr[0].id;
    try {
      // const res = await axios.get(
      //   `https://ruprice.flareon.ru/api/entities/price-by-offer?id=${test}`,
      // );
      const res2 = await axios.post(`https://ruprice.flareon.ru/api/entities/offer`, [
        ...arr[0].id,
      ]);
      setAboutItem(res2.data);
      // setInfoItem(res.data);
    } catch (error) {
      alert(error);
    }
  }
  console.log(currentShop);
  ////
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    type: 'line',
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'График изменения цены',
      },
    },
  };
  const contentStyle = {
    display: 'flex',
    height: '300px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  };
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const labels = infoItem.map((el) => moment(el.date).format('L'));

  const data = {
    labels,
    datasets: [
      {
        label: aboutItem.description,
        data: infoItem.map((el) => el.price),
        backgroundColor: '#f5bda3',
      },
    ],
  };

  let sourse = infoItem.map((el) => {
    return {
      date: moment(el.date).valueOf(),
      value: el.price,
    };
  });
  console.log('data inProp', inProp);
  ////
  return (
    <Layout className="back">
      <Header setAboutItem={setAboutItem} />
      {!aboutItem?.plotData?.length > 0 && (
        <div style={{ background: `url(${bg})` }} className="ruka">
          <div className="wrapMainTitle">
            <Text className="titleMain">Не знаете как изменились цены?</Text>
          </div>
          <div className="wrapSecondTitle">
            <Text className="titleSecond">
              Не проблема. <br></br>Мы все посчитали
            </Text>
          </div>
          <Card className="flexie form">
            <div>
              <SiderPart
                handleChange={handleChange}
                getCurrentShop={getCurrentShop}
                getItemInfo={getItemInfo}
                listOfTown={listOfTown}
                listOfShop={listOfShop}
                currentTown={currentTown}
                currentShop={currentShop}
              />
            </div>
          </Card>
        </div>
      )}
      <CSSTransition
        in={aboutItem?.plotData?.length > 0}
        timeout={4000}
        classNames="graph"
        unmountOnExit
        // onEnter={() => setShowButton(false)}
        // onExited={() => setShowButton(true)}
      >
        <Content className="graph">
          <Row justify="center" wrap={false}>
            <Col span={8}>
              <Card
                style={{ height: '100%' }}
                cover={<img alt="example" src={aboutItem.imageUrl} />}>
                <Meta description={aboutItem.description} />
              </Card>
            </Col>
            <Col span={16}>
              <Card hoverable>
                <GraphicXY sourse={sourse} />
                <Bar options={options} data={data} datasetIdKey="id" />
              </Card>
            </Col>
          </Row>

          <Table dataSource={infoItem} columns={columns} />
        </Content>
      </CSSTransition>
      {/* {aboutItem?.plotData?.length > 0 && (
        <Content>
          <Row justify="center" wrap={false}>
            <Col span={8}>
              <Card
                style={{ height: '100%' }}
                cover={<img alt="example" src={aboutItem.imageUrl} />}>
                <Meta description={aboutItem.description} />
              </Card>
            </Col>
            <Col span={16}>
              <Card hoverable>
                <GraphicXY sourse={sourse} />
                <Bar options={options} data={data} datasetIdKey="id" />
              </Card>
            </Col>
          </Row>

          <Table dataSource={infoItem} columns={columns} />
        </Content>
      )} */}
    </Layout>
  );
}

export default App;
