import { Layout, Image, Menu, Breadcrumb } from "antd";
import { FunctionComponent, useCallback, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./DesktopAdminLayout.module.scss";
import LogoDesk from '../../../assest/images/logo-desk.png';
import LogoMob from '../../../assest/images/logo-mob.png';
import {
  UnlockOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import HeaderHostDesk from "../HeaderHostDesk/HeaderHostDesk";
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

interface DesktopAdminLayoutProps {
  
}
 
const DesktopAdminLayout: FunctionComponent<DesktopAdminLayoutProps> = () => {
  ///////////////////////state
  const [collapsed, setCollapsed] = useState<boolean>(false);
  
  /////////////////////event
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
  return <div className={styles['desktop-admin-layout']}>
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
            <SubMenu
              key='user-manager'
              icon={<UserOutlined />}
              title='Users'
            >
              <Menu.Item key='host-manager'>
              <Link to={'host-manager'}>
                <span
                  style={{
                    textTransform: 'capitalize',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Host
                </span>
              </Link>
                </Menu.Item>
              <Menu.Item key='guest-manager'>
              <Link to={'guest-manager'}>
                <span
                  style={{
                    textTransform: 'capitalize',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Guest
                </span>
              </Link>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key='de-active-requestion' icon={<UnlockOutlined />}>
            <Link to={'de-active-requestion'}>
                <span
                  style={{
                    textTransform: 'capitalize',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Active
                </span>
              </Link>
            </Menu.Item>
            
            <Menu.Item key='host-requestion' icon={<UsergroupAddOutlined />}>
            <Link to={'host-requestion'}>
                <span
                  style={{
                    textTransform: 'capitalize',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Be-Host
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
  </div>;
}
 
export default DesktopAdminLayout;