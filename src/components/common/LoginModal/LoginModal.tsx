import { Modal } from 'antd';
import { FunctionComponent, useEffect } from 'react';
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
  typeScreenModal: string;
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

  //////////////////////////event
  useEffect(() => {
    setTypeModal && setTypeModal(typeScreenModal && typeScreenModal);
  }, [setTypeModal, typeScreenModal]);

  return (
    <div className={styles['login-modal']}>
      <Modal
       className={styles['modal']}
        title={'Log in'}
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
        {/* {typeScreen === "LOGIN" ? ( */}
        <LoginForm
        setTypeModal={setTypeModal}
        setIsOpenLogin={setIsOpenLogin}
        // handleClose={handleClose}
        />
        {/* ) : typeScreen === "FORGOT" ? (
    <Desktopforgot setTypeModal={setTypeModal} />
  ) : (
    <Desktoplogup
      step={step}
      setStep={setStep}
      setTypeModal={setTypeModal}
    />
  )} */}
      </Modal>
    </div>
  );
};

export default LoginModal;
