import React from 'react';
import axios from 'axios';
import { Layout, Select, Typography, Row, Col, message } from 'antd';
import 'antd/dist/antd.less';

import './App.less';
import SiderPart from './components/Sider';
import { CSSTransition } from 'react-transition-group';

import { Bar } from 'react-chartjs-2';
import { Card } from 'antd';
import bg from './bg.png';
import GraphicXY from './components/Graphics/XY';
import Header from './components/Header';
import classNames from 'classnames';

const { Meta } = Card;

const { Content } = Layout;

const { Text } = Typography;
function App() {
  const [listOfCities, setListOfCities] = React.useState([]);
  const [listOfShop, setListOfShop] = React.useState([]);

  const [currentTown, setCurrentTown] = React.useState([]);
  const [currentShop, setCurrentShop] = React.useState([]);

  const [aboutItem, setAboutItem] = React.useState('');

  const [clickTest, setclickTest] = React.useState(false);
  React.useEffect(() => {
    getCities();
  }, []);

  ///Запросы
  async function getCities() {
    try {
      const cities = await axios.get(`https://ruprice.flareon.ru/api/entities/cities`);

      setListOfCities(cities.data);
    } catch (error) {
      message.error('Не удалось получить список городов');
    }
  }
  async function getItemById(arr) {
    try {
      const itemInfo = await axios.post(`https://ruprice.flareon.ru/api/entities/offer`, [
        ...arr[0].id,
      ]);
      setAboutItem(itemInfo.data);
      setclickTest(true);
    } catch (error) {
      message.error('не удалось получить информацию по товару');
    }
  }
  async function getListOfShop(arr) {
    try {
      const listOfShop = await axios.post(
        `https://ruprice.flareon.ru/api/entities/retailer-by-city`,

        makeArrayOfId(arr),
      );

      setListOfShop(listOfShop.data);
    } catch (error) {
      message.error('Не удалось получить магазины по городам');
    }
  }
  ///

  function getCurrentCities(value, rest) {
    getListOfShop(rest);
    setCurrentTown(rest);
  }
  function getCurrentShop(value, rest) {
    setCurrentShop(rest);
  }

  ///вспомогательные функции
  function makeArrayOfId(arr) {
    return arr.map((el) => {
      return el.id;
    });
  }
  ////функции перезаписи классов компонентов

  let TitleClass = classNames({
    titleMain: true,
    titleTest: clickTest,
  });
  let TitleSecond = classNames({
    titleSecond: true,
    titleTest: clickTest,
  });
  let formClass = classNames({
    flexie: true,
    form: true,
    formTest: clickTest,
  });
  let MainBody = classNames({
    ruka: true,
    moveRuka: clickTest,
  });

  let textForm = classNames({
    testLet: clickTest,
  });

  ////
  return (
    <Layout className="back">
      <Header setAboutItem={setAboutItem} />

      <div style={{ background: `url(${bg})` }} className={MainBody}>
        <div className="wrapMainTitle">
          <Text className={TitleClass}>Не знаете как изменились цены?</Text>
        </div>
        <div className="wrapSecondTitle">
          <Text className={TitleSecond}>
            Не проблема. <br></br>Мы все посчитали
          </Text>
        </div>
        <div className={formClass}>
          <SiderPart
            listOfCities={listOfCities}
            className={formClass}
            getCurrentCities={getCurrentCities}
            getCurrentShop={getCurrentShop}
            getItemById={getItemById}
            setListOfCities={setListOfCities}
            listOfShop={listOfShop}
            currentTown={currentTown}
            currentShop={currentShop}
            textForm={textForm}
          />
        </div>
        <CSSTransition
          in={aboutItem?.plotData?.length > 0}
          timeout={4000}
          classNames="graph"
          unmountOnExit
          // onEnter={() => setShowButton(false)}
          // onExited={() => setShowButton(true)}
        >
          <Content className="graph">
            <Row justify="center" wrap={true}>
              <Col span={8}>
                <Card
                  style={{ height: '100%' }}
                  cover={<img alt="example" src={aboutItem?.offer?.description} />}>
                  <Meta description={aboutItem?.offer?.imageUrl} />
                </Card>
              </Col>
              <Col span={16}>
                <Card hoverable>
                  <GraphicXY aboutItem={aboutItem} />
                  {/* <Bar options={options} data={data} datasetIdKey="id" /> */}
                </Card>
              </Col>
            </Row>
          </Content>
        </CSSTransition>
      </div>
    </Layout>
  );
}

export default App;
