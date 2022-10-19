import { Breadcrumb, Card, Col, Divider, Image, Row, Space } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ApiAction from '../../ApiConnecntor';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';

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
  }, [id]);
  console.log(`use`, itemInfo);
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
                    <Text strong> {el?.data[el.data.length - 1].value} руб.</Text>
                  </Text>
                );
              })}
          </Space>
        </Col>
      </Row>
      {id}
    </Card>
  );
};
export default Post;
