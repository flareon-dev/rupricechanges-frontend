import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ru_RU from 'antd/lib/locale/ru_RU';
import { BackTop, ConfigProvider } from 'antd';
ReactDOM.render(
  <>
    <ConfigProvider locale={ru_RU}>
      <BackTop />
      <App />
    </ConfigProvider>
  </>,
  document.getElementById('root'),
);
