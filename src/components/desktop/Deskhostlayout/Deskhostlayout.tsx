import { Breadcrumb, Layout, Menu, Image } from 'antd';
import { FunctionComponent, useCallback, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import HeaderHostDesk from '../HeaderHostDesk/HeaderHostDesk';
import styles from './DeskHostLayout.module.scss';
import {
  PercentageOutlined,
  FileImageOutlined,
  KeyOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import LogoDesk from '../../../assest/images/logo-desk.png';
import LogoMob from '../../../assest/images/logo-mob.png';
// import MenuHost from '../MenuHost/MenuHost';
import RoomIC from '../../../assest/icons/hotel-room-100.png';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
interface DeskHostLayoutProps {}

const DeskHostLayout: FunctionComponent<DeskHostLayoutProps> = () => {
  /////////////////////////state
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const { pathname } = useLocation();
  const keyActive = pathname.substring(1, pathname.length);
  const [currentKey, setCurrentKey] = useState<string>('');
  ////////////////////////event
  const handleClickMenu = useCallback((e: any) => {
    setCurrentKey(e?.key);
  }, []);
  return (
    <div className={styles['desk-host-layout']}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className={styles['logo']}>
            <Link to=''>
              <Image
                preview={false}
                src={collapsed ? LogoMob : LogoDesk}
                width={collapsed ? '' : 120}
                height={collapsed ? '' : 30}
              />
            </Link>
          </div>
          <Menu
            theme='dark'
            defaultSelectedKeys={['1']}
            mode='inline'
            activeKey={keyActive}
            selectedKeys={[currentKey]}
            onClick={(e) => handleClickMenu(e)}
          >
            <Menu.Item key='hotel-manager' icon={<HomeOutlined />}>
              <Link to={'hotel-manager'}>
                <span
                  style={{
                    textTransform: 'capitalize',
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  Hotel
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key='room-manager' icon={<KeyOutlined />}>
            <Link to={'room-manager'}>
                <span
                  style={{
                    textTransform: 'capitalize',
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  Room
                </span>
              </Link>
            </Menu.Item>
            <SubMenu
              key='images-manager'
              icon={<FileImageOutlined />}
              title='Images'
            >
              <Menu.Item key='hotel-images'>
              <Link to={'hotel-images'}>
                <span
                  style={{
                    textTransform: 'capitalize',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Hotel
                </span>
              </Link>
                </Menu.Item>
              <Menu.Item key='room-images'>
              <Link to={'room-images'}>
                <span
                  style={{
                    textTransform: 'capitalize',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Room
                </span>
              </Link>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key='coupon-manager' icon={<PercentageOutlined />}>
            <Link to={'coupon-manager'}>
                <span
                  style={{
                    textTransform: 'capitalize',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Coupon
                </span>
              </Link>
            </Menu.Item>
          </Menu>
          {/* <MenuHost/> */}
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
              <Breadcrumb.Item>Manager</Breadcrumb.Item>
              <Breadcrumb.Item>{keyActive}</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className={styles['site-layout-background']}
              
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default DeskHostLayout;
