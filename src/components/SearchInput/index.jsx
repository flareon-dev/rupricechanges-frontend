import { Button, Col, Input, Row, Select } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Outlet } from 'react-router';
import Header from '../Sider/Header';
const { Option } = Select;
const SearchInput = ({
  currentCities,
  getRetailerByCities,
  setCurrentCities,
  currentRetailer,
  setCurrentRetailer,
  listOfCities,
  listOfRetailers,
  search,
  setSearch,
  findByParams,
}) => {
  return (
    <>
      <Header />
      <div className="WrapperMain">
        <Title style={{ color: '#ffffff' }} className="fontFoxy">
          Flareon - график изменения цен товара
        </Title>

        <Row
          style={{ width: '100%' }}
          wrap
          align="middle"
          justify="center"
          gutter={[16, 32]}
          className="WrapperSearch">
          <Col xs={24} sm={24} md={24} lg={16} xl={8} xxl={8}>
            {' '}
            <Select
              mode="multiple"
              style={{
                width: '100%',
              }}
              className="borderSelect"
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
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={5} xxl={4}>
            <Select
              style={{
                width: '100%',
              }}
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
          </Col>
          <Col xs={24} sm={24} md={16} lg={16} xl={8} xxl={8}>
            <Input
              style={{
                width: '100%',
              }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={3} xxl={4}>
            <Button
              style={{
                width: '100%',
              }}
              onClick={() => {
                findByParams();
              }}>
              Найти
            </Button>
          </Col>
        </Row>
      </div>

      <Outlet />
    </>
  );
};
export default SearchInput;
