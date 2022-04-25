import { Layout, Table, Select, Typography, Button, Row, Col, Carousel, Space } from 'antd';
import logo from '../../../logo.png';
function Header({ setAboutItem }) {
  const { Header, Footer, Sider, Content } = Layout;
  return (
    <Header className="header">
      <div style={{ marginTop: 41 }}>
        <div style={{ float: 'left', margin: 10 }}>
          <a href="/" onclick="location.reload(); return false;">
            <img alt="example" src={logo} style={{ paddingRight: '58px' }} />
          </a>

          <span className="logoText">Девиз команды</span>
        </div>
        <div style={{ float: 'right' }}>
          <Button className="buttonHeader" style={{ marginRight: 30 }}>
            {' '}
            О нас
          </Button>
          <Button
            className="buttonHeader"
            onClick={() => {
              setAboutItem('');
            }}>
            {' '}
            Контакты
          </Button>
        </div>
      </div>
    </Header>
  );
}
export default Header;
