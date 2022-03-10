import { Layout, Row, Image, Col, Menu, Space, Popover } from 'antd';
import { FunctionComponent, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './HeaderSpecial.module.scss';
import UserIc from '../../../assest/icons/user-24.png';
import DownA from '../../../assest/icons/down-arrow-16.png';
import PhoneIc from '../../../assest/icons/phone-mob-16.png';
import LogoDesk from '../../../assest/images/logo-desk.png';
import { routes } from '../../../routes/routes';
import ButtonNav from '../ButtonNav/ButtonNav';
import BtnAccount from '../BtnAccount/BtnAccount';
import { useSelector } from 'react-redux';
import { userState } from '@src/store/reducer/userReducer';
import MyAvatar from '../../common/MyAvatar/MyAvatar';
import LoginModal from '../../common/LoginModal/LoginModal';
import SearchingComponent from '../SearchingComponent/SearchingComponent';

const { Header } = Layout;

interface HeaderSpecialProps {
  /**
   * have seaching?
   */
  isNoneSearching?: boolean;
  /**
   * is cofirm payment
   */
  isConfirmPayment?: boolean;
  /**
   * isOpenLogin
   */
  isOpenLogin?: boolean;
  /**
   * set is open login
   */
  setIsOpenLogin?: (val: boolean) => void;
  /**
   * handleClose
   */
  handleClose?: () => void;
  /**
   * typeScreenModal
   */
  typeScreenModal?: string;
  /**
   * setTypeScreenModal
   */
  setTypeScreenModal?: (val: string) => void;
}

const HeaderSpecial: FunctionComponent<HeaderSpecialProps> = (props) => {
  const { isNoneSearching = false, isOpenLogin, setIsOpenLogin } = props;
  const { pathname } = useLocation();
  const keyActive = pathname.substring(1, pathname.length);
  ////////////////////////////////redux
  const userInfor = useSelector(
    (state: { user: userState }) => state.user?.userInfor
  );
  /////////////////////////////////state
  const [currentKey, setCurrentKey] = useState<string>('');
  // const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const [isVisPopOver, setIsVisPopOver] = useState<boolean>(false);
  const [typeScreenModal, setTypeScreenModal] = useState<string>('LOGIN');
  const isMobile = false;
  /////////////////////////////////event
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
  const setVisPopOver = useCallback(() => {
    setIsVisPopOver && setIsVisPopOver(false);
  }, [setIsVisPopOver]);
  const setTypeModal = useCallback(
    (value: string) => {
      setTypeScreenModal && setTypeScreenModal(value);
    },
    [setTypeScreenModal]
  );
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
    <Row className={styles['header-special']}>
      <Header className={styles['header-container']}>
        <div className={styles['logo']} onClick={hanldeClickLogo}>
          <Link to='/'>
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
                    <BtnAccount
                      userInfor={userInfor}
                      isMobile={isMobile}
                      handleOpen={handleOpen}
                    />
                  }
                  placement='bottomRight'
                >
                  <Row style={{ cursor: 'pointer', alignItems: 'center' }}>
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
      <Row
        className={styles['searching']}
        style={{ display: isNoneSearching ? 'none' : '' }}
      >
        <SearchingComponent />
      </Row>
      <LoginModal
        isOpenLogin={isOpenLogin}
        setIsOpenLogin={setIsOpenLogin}
        handleClose={handleClose}
        typeScreenModal={typeScreenModal}
        setTypeModal={setTypeModal}
        isMobile={isMobile}
      />
    </Row>
  );
};

export default HeaderSpecial;
