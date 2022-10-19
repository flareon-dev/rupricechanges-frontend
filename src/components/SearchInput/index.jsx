import { Button, Input, Select } from 'antd';
import { Outlet } from 'react-router';
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

      <Outlet />
    </>
  );
};
export default SearchInput;
