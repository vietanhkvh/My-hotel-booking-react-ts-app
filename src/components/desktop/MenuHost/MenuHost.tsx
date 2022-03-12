import { routeGuest } from '../../../routes/routes';
import { Menu } from 'antd';
import { FunctionComponent, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './MenuHost.module.scss';
const { SubMenu } = Menu;
interface MenuHostProps {}

const MenuHost: FunctionComponent<MenuHostProps> = () => {
  ////////////////////////////state
  const { pathname } = useLocation();
  const keyActive = pathname.substring(1, pathname.length);
  const [currentKey, setCurrentKey] = useState<string>('');
  /////////////////////////////event
  const handleClickMenu = useCallback((e: any) => {
    setCurrentKey(e?.key);
  }, []);
  return (
    <div className={styles['menu-host']}>
      <Menu
        className={styles['menu-link']}
        // theme='dark'
        activeKey={keyActive}
        selectedKeys={[currentKey]}
        onClick={(e) => handleClickMenu(e)}
      >
        {routeGuest.map((i) => {
          return i?.child ? (
            <SubMenu key={i?.path} icon={i?.icon} title='User'>
              {i?.child?.map((c) => (
                <Menu.Item key={c?.path}>
                  <Link to={c?.path}>
                    <span
                      style={{
                        textTransform: 'capitalize',
                        fontSize: 16,
                        fontWeight: 600,
                      }}
                    >
                      {c?.title}
                    </span>
                  </Link>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={i.title}>
              <Link to={i?.path}>
                <span
                  style={{
                    textTransform: 'capitalize',
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  {i?.title}
                </span>
              </Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};

export default MenuHost;
