import { some } from 'src/const/keyString';
import React from 'react';
import styles from './MobileLayout.module.scss';
import LayoutCus from '../../Layout';
import { Layout, Row } from 'antd';
import { Outlet } from 'react-router-dom';
import Headermob from '../Headermob/Headermob';
const { Content, Footer } = Layout;
// import MobileHeader from './MobileHeader';
// import { ShareInfor } from '@src/const/shareInfor';

const LayoutMobile = () => {
  return (
    <div className={styles['layout']}>
      <Headermob />
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
interface Props {
  dataProfileDomain: some;
  children?: any;
  route: string;
}

const MobileLayout = (props) => {
  const { dataProfileDomain } = props;

  // const showHeader = [routesPath.HOME].indexOf(route) > -1;
  // if (!showHeader) {
  //   return children;
  // }
  // const router = useRouter();
  // console.log(router);

  return (
    <LayoutCus
      contents={{
        title: dataProfileDomain?.brandName,
        url: '',
        description: 'react-app',
        icon: dataProfileDomain?.logo,
        // shareImg: 'https://mytour.vn/themes/images/logo-ss-facebook.png',
      }}
      children={<LayoutMobile />}
    />
  );
};

export default MobileLayout;
