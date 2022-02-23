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
import LoginModal from '../../common/LoginModal/LoginModal';
import { useSelector } from 'react-redux';
import { userState } from '../../../store/reducer/userReducer';
import MyAvatar from '../../common/MyAvatar/MyAvatar';

const { Header } = Layout;

interface HeaderProps {}

const HeaderNav: FunctionComponent<HeaderProps> = () => {
  const { pathname } = useLocation();
  const keyActive = pathname.substring(1, pathname.length);
  ////////////////////state
  const [currentKey, setCurrentKey] = useState('');
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const [typeScreenModal, setTypeScreenModal] = useState<string>('LOGIN');
  const [isVisPopOver, setIsVisPopOver] = useState<boolean>(false);
  const isMobile= false;
  //redux
  const userInfor = useSelector(
    (state: { user: userState }) => state.user?.userInfor
  );
  /////////////////////////////handler
  const handleClickMenu = useCallback((e: any) => {
    setCurrentKey(e?.key);
  }, []);
  const hanldeClickLogo = useCallback(() => {
    setCurrentKey('');
  }, []);
  const handleVisibleChange = useCallback(
    (vis: boolean) => {
      setIsVisPopOver(vis);
    },
    [setIsVisPopOver]
  );
  //Login pop up
  const setTypeModal = useCallback(
    (value: string) => {
      setTypeScreenModal && setTypeScreenModal(value);
    },
    [setTypeScreenModal]
  );

  const setVisPopOver = useCallback(() => {
    setIsVisPopOver && setIsVisPopOver(false);
  }, [setIsVisPopOver]);

  const handleOpen = useCallback(
    (type: string) => {
      setIsOpenLogin && setIsOpenLogin(true);
      setTypeModal(type);
      setVisPopOver();
    },
    [setIsOpenLogin, setTypeModal, setVisPopOver]
  );
  const handleClose = useCallback(() => {
    setIsOpenLogin && setIsOpenLogin(false);
  }, [setIsOpenLogin]);
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
          </Col>
          <Col className={styles['nav-left']}>
            <Row>
              <Space size={'large'}>
                <ButtonNav icon={PhoneIc} text={'1900 000'} />
                <Popover
                  overlayStyle={{ position: 'fixed' }}
                  trigger='click'
                  visible={isVisPopOver}
                  onVisibleChange={handleVisibleChange}
                  content={
                    <BtnAccount isMobile={isMobile} handleOpen={handleOpen} />
                  }
                  placement='bottomRight'
                >
                  <Row style={{ cursor: 'pointer', alignItems: 'center'  }}>
                    {userInfor ? (
                      <MyAvatar
                        userName={userInfor?.FullName}
                        width={isMobile ? 30 : ''}
                        height={isMobile ? 30 : ''}
                        fontSize={isMobile ? 14 : 16}
                      />
                    ) : (
                      <Col>
                        <ButtonNav icon={UserIc} text={''} />
                      </Col>
                    )}
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
        <SearchingComponent />
      </Row>
      <LoginModal
        isOpenLogin={isOpenLogin}
        setIsOpenLogin={setIsOpenLogin}
        handleOpen={handleOpen}
        handleClose={handleClose}
        typeScreenModal={typeScreenModal}
        setTypeModal={setTypeModal}
        isMobile={isMobile}
      />
    </Row>
  );
};

export default HeaderNav;
