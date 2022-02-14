import { routes } from '../../../routes/routes';
import { Col, Image, Layout, Menu, Popover, Row, Space } from 'antd';
import { FunctionComponent, useCallback, useState } from 'react';
import styles from './HeaderDesk.module.scss';
import { Link, useLocation } from 'react-router-dom';
import LogoDesk from '../../../assest/images/logo-desk.png';
import ButtonNav from '../ButtonNav/ButtonNav';
import UserIc from '../../../assest/icons/user-24.png';
import DownA from '../../../assest/icons/down-arrow-16.png';
import PhoneIc from '../../../assest/icons/phone-mob-16.png';
import BtnAccount from '../BtnAccount/BtnAccount';
import SearchingComponent from '../SearchingComponent/SearchingComponent';

const { Header } = Layout;

interface HeaderProps {}

const HeaderNav: FunctionComponent<HeaderProps> = () => {
  const { pathname } = useLocation();
  const keyActive = pathname.substring(1, pathname.length);
  //state
  const [currentKey, setCurrentKey] = useState('');
  const [isPopup, setIsPopup] = useState(false);

  //handler
  const handleClickMenu = useCallback((e: any) => {
    setCurrentKey(e?.key);
  }, []);
  const hanldeClickLogo = useCallback(() => {
    setCurrentKey('');
  }, []);
  const handleVisibleChange = useCallback((visible) => {
    setIsPopup(visible);
  }, []);

  return (
    <Row className={styles['header']}>
      <Header className={styles['header-container']}>
        <div className={styles['logo']} onClick={hanldeClickLogo}>
          <Link to=''>
            <Image preview={false} src={LogoDesk} />
          </Link>
        </div>
        <Row className={styles['nav']}>
          <Col>
            <Menu
              className={styles['menu-link']}
              mode='horizontal'
              activeKey={keyActive}
              selectedKeys={[currentKey]}
              onClick={(e) => handleClickMenu(e)}
            >
              {routes.map((i) => {
                return (
                  <Menu.Item key={i.title}>
                    <Link to={`${i?.path}`}>
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
          </Col>
          <Col className={styles['nav-left']}>
            <Row>
              <Space size={'large'}>
                <ButtonNav icon={PhoneIc} text={'1900 000'} />
                <Popover
                  overlayStyle={{ position: 'fixed' }}
                  trigger='click'
                  visible={isPopup}
                  onVisibleChange={handleVisibleChange}
                  content={<BtnAccount />}
                  placement='bottomRight'
                >
                  <Row style={{ cursor: 'pointer' }}>
                    <Col>
                      <ButtonNav icon={UserIc} text={''} />
                    </Col>
                    <Col>
                      <ButtonNav icon={DownA} text={''} />
                    </Col>
                  </Row>
                </Popover>
              </Space>
            </Row>
          </Col>
        </Row>
      </Header>
      <Row className={styles['searching']}>
        <SearchingComponent/>
      </Row>
    </Row>
  );
};

export default HeaderNav;
