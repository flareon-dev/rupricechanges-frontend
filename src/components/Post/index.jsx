import { Breadcrumb, Card, Col, Divider, Image, Row, Space } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ApiAction from '../../ApiConnecntor';
import {
  FallOutlined,
  HomeOutlined,
  RetweetOutlined,
  RiseOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import GraphicXY from '../Graphics/XY';
import LineGraph from '../Graphics/Line';

const Post = ({ search }) => {
  const [itemInfo, setItemInfo] = React.useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    ApiAction.getOffer(location?.state?.listOfIds).then((res) => {
      console.log(res);
      setItemInfo(res.data);
    });
  }, [location?.state?.listOfIds]);

  console.log(`DATA POST`, itemInfo);
  let getCurrentIcon = (obj) => {
    console.log('ya redner obj', obj);
    let res = obj?.data[obj.data.length - 1].value - obj?.data[obj.data.length - 2].value;
    console.log('this', res);
    if (res < 0) {
      return <FallOutlined style={{ color: '#ff4d4f' }} />;
    } else if (res > 0) {
      return <RiseOutlined style={{ color: '#52c41a' }} />;
    } else {
      return <RetweetOutlined style={{ color: '#fadb14' }} />;
    }
  };
  return (
    <Card>
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() => {
            navigate('/');
          }}>
          поиск по запросу "{location.state?.search}"
        </Breadcrumb.Item>
        <Breadcrumb.Item>"{itemInfo?.offer?.imageUrl}"</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
          <Image src={itemInfo?.offer?.description} />
        </Col>
        <Col className="gutter-row" span={18}>
          <Title> {itemInfo?.offer?.imageUrl}</Title>

          <Space direction="vertical">
            {itemInfo.plotData &&
              itemInfo?.plotData.map((el) => {
                return (
                  <Text>
                    цена в "{el?.category}" :{' '}
                    <Text strong> {el?.data[el.data.length - 1].value} руб.</Text>{' '}
                    {getCurrentIcon(el)}
                  </Text>
                );
              })}
          </Space>
        </Col>
      </Row>

      {itemInfo.plotData && <LineGraph dataOfCitites={itemInfo.plotData || []} />}
      {id}
    </Card>
  );
};
export default Post;
