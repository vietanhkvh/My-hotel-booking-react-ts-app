import { FunctionComponent } from 'react';
import styles from './DesktopGuestLayout.module.scss';
import { Layout, Breadcrumb, Row } from 'antd';
import { Outlet } from 'react-router-dom';
import HeaderDesk from '../HeaderDesk/HeaderDesk';
// import ImgHead from './imgs/los-cocos-room-header.png';
const { Content, Footer } = Layout;
interface DesktopGuestLayoutProps {}

const DesktopGuestLayout: FunctionComponent<DesktopGuestLayoutProps> = () => {
  return (
    <Layout className={styles['desktop-guest-layout']}>
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
    </Layout>
  );
};

export default DesktopGuestLayout;
