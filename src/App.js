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

import GraphicXY from './components/Sider/Graphics/XY';
import Header from './components/Sider/Header';
import classNames from 'classnames';
import { ChordLinkDirected } from '@amcharts/amcharts5/.internal/charts/flow/ChordLinkDirected';
import ApiAction from './ApiConnecntor';
import { Route, Routes, Link } from 'react-router-dom';

const { Meta } = Card;

const { Footer, Sider, Content } = Layout;
const { Option } = Select;
const { Text } = Typography;
function App() {
  const [listOfCities, setListOfCities] = React.useState([]);
  const [listOfRetailers, setListOfRetailers] = React.useState([]);
  const [currentCities, setCurrentCities] = React.useState([]);
  const [currentRetailer, setCurrentRetailer] = React.useState([]);
  const [search, setSearch] = React.useState('');
  //

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    ApiAction.getCities().then((res) => setListOfCities(res.data));
  }, []);

  const getRetailerByCities = (arr) => {
    ApiAction.getRetailerByCities(arr.map((el) => el.id)).then((res) => {
      setListOfRetailers(res.data);
    });
  };
  const findByParams = () => {
    ApiAction.findByParams({
      cityIds: currentCities.map((el) => el.id),
      partOfDescription: search,
      retailerName: currentRetailer.name,
    }).then((res) => {
      setData(res.data);
    });
  };
  const columns = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Изображение',
      dataIndex: 'pic',
      key: 'pic',
      render: (src) => {
        return <img src={src} alt="ds" />;
      },
    },
  ];

  return (
    <Layout className="back">
      <Select
        mode="multiple"
        value={currentCities}
        onChange={(item, data) => {
          getRetailerByCities(data);
          setCurrentCities(data);
        }}>
        {listOfCities?.map((el) => (
          <Option key={el.id} value={el.name} id={el.id} name={el.name}>
            {el.name}
          </Option>
        ))}
      </Select>
      <Select
        showSearch
        value={currentRetailer}
        placeholder="Search to Select"
        onChange={(item, data) => {
          setCurrentRetailer(data);
        }}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
        filterSort={(optionA, optionB) => {
          return optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase());
        }}>
        {listOfRetailers?.map((el) => (
          <Option key={el} value={el} id={el} name={el}>
            {el}
          </Option>
        ))}
      </Select>
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          findByParams();
        }}>
        Найти
      </Button>
      <Table
        onRow={(record) => {
          return {
            onClick: (event) => {
              console.log(record);
            }, // click row
            onDoubleClick: (event) => {}, // double click row
            onContextMenu: (event) => {}, // right button click row
            onMouseEnter: (event) => {}, // mouse enter row
            onMouseLeave: (event) => {}, // mouse leave row
          };
        }}
        dataSource={data}
        columns={columns}
      />
      <Routes>
        <Route path="/teams" element={<h1>hello</h1>}>
          <Route index element={<h1>hello 2</h1>} />
          <Route path=":teamId" element={<h1>hello3</h1>} />
        </Route>
        <Route />
      </Routes>
    </Layout>
  );
}

export default App;
