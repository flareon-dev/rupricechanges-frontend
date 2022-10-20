import React from 'react';
import axios from 'axios';
import { Layout, Table, Select, Typography, Button, Row, Col, Carousel, Space } from 'antd';
import 'antd/dist/antd.less';
import Input from 'antd/lib/input/Input';
import './App.less';
import SiderPart from './components/Sider';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
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

import GraphicXY from './components/Graphics/XY';
import Header from './components/Sider/Header';
import classNames from 'classnames';
import { ChordLinkDirected } from '@amcharts/amcharts5/.internal/charts/flow/ChordLinkDirected';
import ApiAction from './ApiConnecntor';
import { Route, Routes, Link } from 'react-router-dom';
import Search from 'antd/lib/transfer/search';
import SearchInput from './components/SearchInput';
import Post from './components/Post';

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
  const navigate = useNavigate();
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
      <Routes>
        <Route
          path="/"
          element={
            <SearchInput
              currentCities={currentCities}
              getRetailerByCities={getRetailerByCities}
              setCurrentCities={setCurrentCities}
              currentRetailer={currentRetailer}
              setCurrentRetailer={setCurrentRetailer}
              listOfCities={listOfCities}
              listOfRetailers={listOfRetailers}
              search={search}
              setSearch={setSearch}
              findByParams={findByParams}
            />
          }>
          <Route
            index
            element={
              <Table
                components={(e) => {
                  console.log(e);
                  return <h1>hee</h1>;
                }}
                onRow={(record) => {
                  return {
                    onClick: (event) => {
                      console.log(record);
                      navigate(`/${record.ids[0]}`, {
                        state: {
                          search: search,
                          listOfIds: record.ids || [],
                        },
                      });
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
            }
          />
          <Route path="/:id" element={<Post search={search} />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
