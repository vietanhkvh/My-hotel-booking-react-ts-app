// import { Col } from 'ant';
import React from 'react';
import LayoutCus from '../../../Layout';
import useTrans from '../../../../hooks/useTrans';
import styles from './DesktopLayout.module.scss';
import HeaderDesk from '../../HeaderDesk/HeaderDesk';
import { Layout, Breadcrumb, Row } from 'antd';
import { Outlet } from 'react-router-dom';
import Logo from '../../../../assest/images/logo-mob.png'
// import ImgHead from './imgs/los-cocos-room-header.png';
const { Content, Footer } = Layout;
const LayoutDesk = () => {
  return (
    <div className={styles['layout']}>
      {/* <Content className={styles['content']}> */}
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>List</Breadcrumb.Item>
      <Breadcrumb.Item>App</Breadcrumb.Item>
    </Breadcrumb> */}
        {/* <Row className={styles['site-layout-content']}>
          <Outlet />
        </Row> */}
      {/* </Content> */}
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
        description: 'react-app',
        icon: dataProfileDomain?.logo,
      }}
      children={<LayoutDesk />}
    />
  );
};

export default DesktopLayout;
