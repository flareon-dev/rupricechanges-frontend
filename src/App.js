import React from 'react';
import axios from 'axios';
import { Layout, Table, Select, Typography, Button, Row, Col, Carousel, Space } from 'antd';
import 'antd/dist/antd.less';
import Input from 'antd/lib/input/Input';
import './App.less';
import SiderPart from './components/Sider';
import logo from './logo.png';
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
import shop1 from './shopsImage/1.jpg';
import shop2 from './shopsImage/2.jpg';
import shop3 from './shopsImage/3.jpg';
import shop4 from './shopsImage/4.jpg';
import shop5 from './shopsImage/5.jpg';
import shop6 from './shopsImage/6.jpg';
import shop7 from './shopsImage/9.jpg';
import shop8 from './shopsImage/10.jpg';
import GraphicXY from './components/Sider/Graphics/XY';

const { Meta } = Card;

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
  const [aboutItem, setAboutItem] = React.useState('');
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
      const res2 = await axios.get(`https://ruprice.flareon.ru/api/entities/offer?id=${test}`);
      setAboutItem(res2.data);
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
  console.log('data aboutItem', aboutItem);
  ////
  return (
    <Layout className="back">
      <Header className="header">
        <div className="flexLogo">
          <img alt="example" src={logo} className="logo" />
          <div className="flexText">
            <Typography.Title level={1} className="titleHeader">
              Flareon
            </Typography.Title>
            <Typography.Text className="titleDescr">
              Система отслеживания изменения цен
            </Typography.Text>
            {/* хех */}
          </div>
        </div>
      </Header>
      <Layout>
        <Card bordered>
          <div className="flexie">
            <SiderPart
              className="test"
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

        {infoItem.length > 0 && (
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
        )}
        <Typography.Title style={{ margin: '0 auto' }}>Магазины</Typography.Title>
        <Carousel effect="scrollx" autoplay>
          <div>
            <h3 style={contentStyle}>
              <Row gutter={16}>
                <Col span={6}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    className="cardShop"
                    cover={<img alt="example" src={shop1} className="imgRule" />}>
                    <Meta title="Пятерочка" />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    className="cardShop"
                    cover={<img alt="example" src={shop2} className="imgRule" />}>
                    <Meta title="Перекресток" />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    className="cardShop"
                    cover={<img alt="example" src={shop3} className="imgRule" />}>
                    <Meta title="Яндекс лавка" />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    className="cardShop"
                    cover={<img alt="example" src={shop4} className="imgRule" />}>
                    <Meta title="Глобус" />
                  </Card>
                </Col>
              </Row>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <Row gutter={16}>
                <Col span={6}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    className="cardShop"
                    cover={<img alt="example" src={shop5} className="imgRule" />}>
                    <Meta title="Магнит" />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    className="cardShop"
                    cover={<img alt="example" src={shop6} className="imgRule" />}>
                    <Meta title="Карусель" />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    className="cardShop"
                    cover={<img alt="example" src={shop7} className="imgRule" />}>
                    <Meta title="Виктория" />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    className="cardShop"
                    cover={<img alt="example" src={shop8} className="imgRule" />}>
                    <Meta title="Ашан" />
                  </Card>
                </Col>
              </Row>
            </h3>
          </div>
        </Carousel>
        <Space size={[8, 16]} wrap>
          {listOfTown.map((el) => el.name)}
        </Space>
      </Layout>
    </Layout>
  );
}

export default App;
