import { Layout, Table, Select, Typography, Button, Row, Col, Carousel, Space } from 'antd';
import logo from '../../../logo.png';
import Logo from './logo';
function Header({ setAboutItem }) {
  const { Header, Footer, Sider, Content } = Layout;
  return (
    <Header className="header">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 40,
        }}>
        <Logo />

        <div>
          {/* <Button className="buttonHeader" style={{ marginRight: 30 }}>
            {' '}
            О нас
          </Button> */}
          <Button className="ButtonFoxy" size="large">
            {' '}
            Войти
          </Button>
        </div>
      </div>
    </Header>
  );
}
export default Header;
