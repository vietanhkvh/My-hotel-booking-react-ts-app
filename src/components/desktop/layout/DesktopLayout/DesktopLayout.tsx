// import { Col } from 'ant';
import React from 'react';
import LayoutCus from '../../../Layout';
import useTrans from '../../../../hooks/useTrans';
import styles from './DesktopLayout.module.scss';
import { Layout, Breadcrumb, Row } from 'antd';
import { Outlet } from 'react-router-dom';
// import ImgHead from './imgs/los-cocos-room-header.png';
const { Content } = Layout;
const LayoutDesk = () => {
  return (
    <div className={styles['layout']}>
      <Content className={styles['content']}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>List</Breadcrumb.Item>
      <Breadcrumb.Item>App</Breadcrumb.Item>
    </Breadcrumb> */}
        <Row className={styles['site-layout-content']}>
          <Outlet />
        </Row>
      </Content>
      
    </div>
  );
};
// const 
const DesktopLayout = (props) => {
  const { route, children, dataProfileDomain } = props;
  const { t } = useTrans();

  return (
    <LayoutCus
      contents={{
        title: 'Los Cocos',
        url: '',
        description: 'Book a room with lots of hot deals',
        icon: dataProfileDomain?.logo,
      }}
      children={<LayoutDesk />}
    />
  );
};

export default DesktopLayout;
