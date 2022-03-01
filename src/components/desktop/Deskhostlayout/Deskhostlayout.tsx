import { Breadcrumb, Layout, Menu, Image } from 'antd';
import { FunctionComponent, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import HeaderHostDesk from '../HeaderHostDesk/HeaderHostDesk';
import styles from './DeskHostLayout.module.scss';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import LogoDesk from '../../../assest/images/logo-desk.png';
import LogoMob from '../../../assest/images/logo-mob.png'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
interface DeskHostLayoutProps {}

const DeskHostLayout: FunctionComponent<DeskHostLayoutProps> = () => {
  /////////////////////////state
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };
  return (
    <div className={styles['desk-host-layout']}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className={styles['logo']}>
            <Link to=''>
              <Image preview={false} src={ collapsed? LogoMob : LogoDesk} width={ collapsed? '' : 120} height={collapsed? '' : 30} />
            </Link>
          </div>
          <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
            <Menu.Item key='1' icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key='2' icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key='sub1' icon={<UserOutlined />} title='User'>
              <Menu.Item key='3'>Tom</Menu.Item>
              <Menu.Item key='4'>Bill</Menu.Item>
              <Menu.Item key='5'>Alex</Menu.Item>
            </SubMenu>
            <SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
              <Menu.Item key='6'>Team 1</Menu.Item>
              <Menu.Item key='8'>Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key='9' icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className={styles['site-layout']}>
          <Header
            className={styles['site-layout-background']}
            style={{ padding: 0 }}
          >
            <HeaderHostDesk />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className={styles['site-layout-background']}
              style={{ padding: 24, minHeight: 360 }}
            >
              Bill is a cat.
            </div>
          </Content>
          
        </Layout>
      </Layout>
    </div>
  );
};

export default DeskHostLayout;
