// import { Col } from 'ant';
import React from 'react';
import LayoutCus from '../../../Layout';
import useTrans from '../../../../hooks/useTrans';
import styles from './DesktopLayout.module.scss';
import HeaderDesk from '../../HeaderDesk/HeaderDesk';
import { Layout, Breadcrumb, Row } from 'antd';
import { Outlet } from 'react-router-dom';
const { Content, Footer } = Layout;
const LayoutDesk = () => {
  return (
    <div className={styles['layout']}>
      <HeaderDesk />
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
      <Footer className={styles['footer']}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </div>
  );
};
const DesktopLayout = (props) => {
  const { route, children, dataProfileDomain } = props;
  const { t } = useTrans();

  return (
    <LayoutCus
      contents={{
        title: 'react-ts-base',
        url: '',
        description: 'react-app',
        icon: dataProfileDomain?.logo,
        // shareImg: 'https://mytour.vn/themes/images/logo-ss-facebook.png',
      }}
      children={<LayoutDesk/>} 
    />
    
  );
};

export default DesktopLayout;
