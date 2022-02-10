import { routes } from '../../../routes/routes';
import { Image, Layout, Menu } from 'antd';
import { FunctionComponent, useState } from 'react';
import styles from './HeaderDesk.module.scss';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import LogoDesk from '../../../assest/images/logo-desk.png'
const { Header } = Layout;

interface HeaderProps {}

const HeaderNav: FunctionComponent<HeaderProps> = () => {
  const { pathname } = useLocation();
  const keyActive= pathname.substring(1,pathname.length)
console.log(keyActive)
  return (
    <nav className={styles['header']}>
      <Header className={styles['header-container']}>
        <div className={styles['logo']} >
          <Link to=''>
          <Image preview={false} src={LogoDesk}/>
          </Link>
          </div>
        <Menu
          className={styles['menu-link']}
          theme={'light'}
          mode='horizontal'
          // defaultSelectedKeys={['1']}
          // selectedKeys={keySelected}
          // activeKey={keyActive!=='' ? keyActive  }
        >
          {routes.map((i) => {
            return (
              <Menu.Item key={i.title}>
                <Link to={`${i?.path}`} >
                  <span style={{textTransform: 'capitalize', fontSize:16, fontWeight:600}}>{i?.title}
                  </span>
                  </Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Header>
    </nav>
  );
};

export default HeaderNav;
