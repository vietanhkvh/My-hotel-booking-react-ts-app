import { Row, Typography } from 'antd';
import { FunctionComponent } from 'react';
import styles from './BtnAccount.module.scss';
import { some } from '../../constants';
import { userInfoInterface } from '../../../const/interface';
import { useNavigate } from 'react-router-dom';
const { Text } = Typography;

const adminList: some[] = [
  {
    text: 'Profile',
    icon: '',
  },
  {
    text: 'Log out',
    icon: '',
  },
];

const host: some[] = [
  {
    text: 'Profile',
    icon: '',
  },
  {
    text: 'Switch to traveling',
    icon: '',
  },
  {
    text: 'Log out',
    icon: '',
  },
];

const guest: some[] = [
  {
    text: 'Profile',
    icon: '',
  },
  {
    text: 'Switch to host',
    icon: '',
  },
  {
    text: 'Log out',
    icon: '',
  },
];

interface BtnAccountProps {
  /**
   * user information
   */
  userInfor?: null | undefined | userInfoInterface;
  /**
   * isMobile
   */
  isMobile?: boolean;
  /**
   * handleOpen
   */
  handleOpen?: (val: string) => void;
}

const BtnAccount: FunctionComponent<BtnAccountProps> = (props) => {
  ///////////////////////state
  const { userInfor, isMobile, handleOpen } = props;
  const navigate= useNavigate();
  ///////////////////////event
  const hanlderClickHistory=()=>{
    navigate('/history')
  }
  const handleLogout = () => {
    localStorage.removeItem('token-key');
    localStorage.removeItem('persist:root');
    navigate('/')
    window.location.reload()
  };

  const handleShowUpMenu = (
    userInfor: null | undefined | userInfoInterface
  ) => {
    let component: any;
    if (userInfor) {
      switch (userInfor?.ID_Role) {
        case 'ADM':
          component = (
            <>
              <Row
                className={styles['container']}
                // onClick={() =>
                //   isMobile
                //     ? 'router.push(routesPath.login)'
                //     : handleOpen && handleOpen('LOGIN')
                // }
              >
                <Text className={styles['text']}>Profile</Text>
              </Row>
              <Row className={styles['container']} onClick={handleLogout}>
                <Text className={styles['text']}>Log out</Text>
              </Row>
            </>
          );
          break;
        case 'HOS':
          component = (
            <>
              <Row
                className={styles['container']}
                // onClick={() =>
                //   isMobile
                //     ? 'router.push(routesPath.login)'
                //     : handleOpen && handleOpen('LOGIN')
                // }
              >
                <Text className={styles['text']}>Profile</Text>
              </Row>
              {/* <Row className={styles['container']}>
                <Text className={styles['text']}>Switch to host</Text>
              </Row> */}
              <Row className={styles['container']} onClick={handleLogout}>
                <Text className={styles['text']}>Log out</Text>
              </Row>
            </>
          );
          break;
        case 'GUE':
          component = (
            <>
              <Row
                className={styles['container']}
                // onClick={() =>
                //   isMobile
                //     ? 'router.push(routesPath.login)'
                //     : handleOpen && handleOpen('LOGIN')
                // }
              >
                <Text className={styles['text']}>Profile</Text>
              </Row>
              <Row className={styles['container']} onClick={hanlderClickHistory}>
                <Text className={styles['text']}>History</Text>
              </Row>
              <Row className={styles['container']} onClick={handleLogout}>
                <Text className={styles['text']}>Log out</Text>
              </Row>
            </>
          );
          break;
        default:
          component = (
            <>
              <Row
                className={styles['container']}
                onClick={() =>
                  isMobile
                    ? 'router.push(routesPath.login)'
                    : handleOpen && handleOpen('LOGIN')
                }
              >
                <Text className={styles['text']}>Profile</Text>
              </Row>
              <Row className={styles['container']} onClick={handleLogout}>
                <Text className={styles['text']}>Log out</Text>
              </Row>
            </>
          );
          break;
      }
    } else {
      component = (
        <>
          <Row
            className={styles['container']}
            onClick={() =>
              isMobile
                ? 'router.push(routesPath.login)'
                : handleOpen && handleOpen('LOGIN')
            }
          >
            <Text className={styles['text']}>Log in</Text>
          </Row>
          <Row className={styles['container']}>
            <Text className={styles['text']}>Sign up</Text>
          </Row>
        </>
      );
    }
    return component;
  };
  return (
    <div className={styles['btn-account']}>{handleShowUpMenu(userInfor)}</div>
  );
};

export default BtnAccount;
