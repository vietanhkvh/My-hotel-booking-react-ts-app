import { FunctionComponent } from 'react';
import styles from './Headermob.module.scss';
import { Image, Layout, Menu, Row } from 'antd';
import { routes } from '../../../routes/routes';
import { Link } from 'react-router-dom';
const { Header } = Layout;
interface HeadermobProps {}

const Headermob: FunctionComponent<HeadermobProps> = () => {
  return (
    <nav className={styles['headermob']}>
      <Header className={styles['header']}>
        <div className={styles['logo']} />
      </Header>
      <Menu
        className={styles['menu-link']}
        theme={'light'}
        mode='horizontal'
        defaultSelectedKeys={['1']}
      >
        {routes.map((i, index) => {
          const key = index + 1;
          return (
            <Menu.Item key={key} className={styles['item-link']}> 
              <Link to={`${i?.path}`}>
                <span style={{ textTransform: 'capitalize' }}>{i?.title}</span>
              </Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </nav>
  );
};

export default Headermob;
