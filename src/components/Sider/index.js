import React from 'react';
import { Layout, Table, Select, Typography, Button, Spin, Space } from 'antd';
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
                value: el.description,
                label: el.description,
                id: el.id,
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
      retailerId: currentShop.id,
    });
  }

  return (
    <>
      <Select
        mode="multiple"
        allowClear
        style={{ width: '40vw', marginRight: '10px' }}
        placeholder="Выбор города"
        onChange={handleChange}>
        {listOfTown.map((el) => (
          <Option key={el.id} value={el.name} id={el.id}>
            {el.name}
          </Option>
        ))}
      </Select>

      <Select
        allowClear
        style={{ width: '20vw', marginRight: '10px' }}
        placeholder="Выбор магазина"
        onChange={getCurrentShop}>
        {listOfShop.map((el) => (
          <Option key={el.id} title={el.title} slug={el.slug} id={el.id} cityid={el.cityId}>
            {el.title}
          </Option>
        ))}
      </Select>

      <DebounceSelect
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
    </>
  );
}
export default SiderPart;
