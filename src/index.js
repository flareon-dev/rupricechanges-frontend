import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ru_RU from 'antd/lib/locale/ru_RU';
import { BackTop, ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(
  <>
    <ConfigProvider locale={ru_RU}>
      <BackTop />
      <BrowserRouter>
        <App />{' '}
      </BrowserRouter>
    </ConfigProvider>
  </>,
  document.getElementById('root'),
);
