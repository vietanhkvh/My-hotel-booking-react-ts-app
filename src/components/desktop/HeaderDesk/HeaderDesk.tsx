import { routes } from '../../../routes/routes';
import { Layout, Menu } from 'antd';
import { FunctionComponent } from 'react';
import styles from './HeaderDesk.module.scss';
import { Link } from 'react-router-dom';
const { Header } = Layout;

interface HeaderProps {}

const HeaderNav: FunctionComponent<HeaderProps> = () => {
  return (
    <nav className={styles['header']}>
      <Header>
        <div className={styles['logo']} />
        <Menu
          className={styles['menu-link']}
          theme={'light'}
          mode='horizontal'
          defaultSelectedKeys={['1']}
        >
          {routes.map((i, index) => {
            const key = index + 1;
            return (
              <Menu.Item key={key}>
                <Link to={`${i?.path}`}>
                  <span style={{textTransform: 'capitalize'}}>{i?.title}
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
