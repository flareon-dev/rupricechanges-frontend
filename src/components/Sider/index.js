import React from 'react';
import { Layout, Table, Select, Typography, Button, Spin, Space, Row, Col } from 'antd';
import debounce from 'lodash/debounce';
import Input from 'antd/lib/input/Input';
import axios from 'axios';

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;
const { Text, Link } = Typography;
function SiderPart({
  handleChange,
  getCurrentShop,
  listOfTown,
  listOfShop,
  currentTown,
  currentShop,
  getItemInfo,
}) {
  const [value, setValue] = React.useState([]);
  const [valueCur, setvalueCur] = React.useState([]);
  function DebounceSelect({ fetchOptions, debounceTimeout = 2000, ...props }) {
    const [fetching, setFetching] = React.useState(false);
    const [options, setOptions] = React.useState([]);

    const fetchRef = React.useRef(0);
    const debounceFetcher = React.useMemo(() => {
      const loadOptions = (value) => {
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        setOptions([]);
        setFetching(true);
        fetchOptions(value).then((newOptions) => {
          console.log(value, newOptions);
          if (fetchId !== fetchRef.current) {
            // for fetch callback order
            return;
          }
          console.log(`newopt`, newOptions);
          setOptions(
            newOptions.data.map((el) => {
              return {
                value: el.title,
                label: el.title,
                id: el.ids,
              };
            }),
          );
          setFetching(false);
        });
      };

      return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    return (
      <Select
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
      />
    );
  } // Usage of DebounceSelect

  async function fetchUserList(searchedText) {
    return axios.post('https://ruprice.flareon.ru/api/entities/search-by-params', {
      cityIds: currentTown.map((el) => el.id),
      partOfDescription: searchedText,
      // retailerId: currentShop.id,
      retailerName: currentShop.value,
    });
  }

  return (
    <>
      <Row style={{ marginBottom: 25 }}>
        <Col>
          <Text className="textForm">Что хотели бы проверить ? </Text>
        </Col>
      </Row>
      <Row style={{ marginBottom: 25 }}>
        <Col span={24}>
          <Select
            className="selectorForm"
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Выбор города"
            onChange={handleChange}>
            {listOfTown.map((el) => (
              <Option key={el.id} value={el.name} id={el.id}>
                {el.name}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row gutter={18} style={{ marginBottom: 25 }}>
        <Col span={12}>
          <Select
            className="selectorForm"
            allowClear
            style={{ width: '100%' }}
            placeholder="Выбор магазина"
            onChange={getCurrentShop}>
            {listOfShop.map((el) => (
              <Option key={el} value={el} data={el}>
                {el}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={12}>
          <DebounceSelect
            className="selectorForm"
            mode="multiple"
            value={[]}
            placeholder={value[0]?.label || 'Выбор товара'}
            fetchOptions={fetchUserList}
            onChange={(newValue, vb) => {
              setValue(newValue);
              getItemInfo(vb);
              console.log('here', newValue, vb);
            }}
            style={{
              width: '100%',
            }}
          />
        </Col>
      </Row>
    </>
  );
}
export default SiderPart;
