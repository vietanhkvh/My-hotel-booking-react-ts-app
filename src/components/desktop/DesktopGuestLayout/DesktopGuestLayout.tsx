import { FunctionComponent } from 'react';
import styles from './DesktopGuestLayout.module.scss';
import { Layout, Breadcrumb, Row } from 'antd';
import { Outlet } from 'react-router-dom';
import HeaderDesk from '../HeaderDesk/HeaderDesk';
// import ImgHead from './imgs/los-cocos-room-header.png';
const { Content } = Layout;

interface DesktopGuestLayoutProps {}

const DesktopGuestLayout: FunctionComponent<DesktopGuestLayoutProps> = () => {
  return (
    <Layout className={styles['desktop-guest-layout']}>
      <HeaderDesk />
      <Content className={styles['content']}>
        <Row className={styles['site-layout-content']}>
          <Outlet />
        </Row>
      </Content>
    </Layout>
  );
};

export default DesktopGuestLayout;
