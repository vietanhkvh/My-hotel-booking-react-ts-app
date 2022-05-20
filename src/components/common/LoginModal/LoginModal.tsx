import { Modal } from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import DesktopForgotPwd from '../DesktopForgotPwd/DesktopForgotPwd';
import DesktopRegister from '../DesktopRegister/DesktopRegister';
import LoginForm from '../LoginForm/LoginForm';
import styles from './LoginModal.module.scss';
interface LoginModalProps {
  /**
   *isOpenLogin
   */
  isOpenLogin?: boolean;
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
  setTypeModal?: (val: string) => void;
  /**
   * isMobile
   */
  isMobile?: boolean;
  /**
   * setIsOpenLogin
   */
  setIsOpenLogin?: (val: boolean) => void;
  /**
   * inPopper
   */
  inPopper?: boolean;
}

const LoginModal: FunctionComponent<LoginModalProps> = (props) => {
  const {
    isOpenLogin,
    handleClose,
    typeScreenModal,
    setTypeModal,
    isMobile,
    setIsOpenLogin,
    inPopper,
  } = props;
  //////////////////////////state
  // const [typeScreen, setTypeScreen] = useState<string>("LOGIN");
  //////////////////////////event
  // useEffect(() => {
  //   setTypeScreen();
  // }, []);

  return (
    <div className={styles['login-modal']}>
      <Modal
        className={styles['modal']}
        centered
        visible={isOpenLogin}
        onCancel={() => {
          handleClose && handleClose();
          setTypeModal && setTypeModal('LOGIN');
          // setStep(0);
        }}
        footer={null}
        bodyStyle={{ padding: '24px' }}
        width={'100%'}
        style={{ textAlign: 'center', maxWidth: 407 }}
      >
        {typeScreenModal === 'LOGIN' ? (
          <LoginForm
            setTypeModal={setTypeModal}
            setIsOpenLogin={setIsOpenLogin}
            handleClose={handleClose}
          />
        ) : typeScreenModal === "FORGOT" ? (
          <DesktopForgotPwd setTypeModal={setTypeModal}/>
        ) : (
          <DesktopRegister setTypeModal={setTypeModal}/>
        )}
      </Modal>
    </div>
  );
};

export default LoginModal;
