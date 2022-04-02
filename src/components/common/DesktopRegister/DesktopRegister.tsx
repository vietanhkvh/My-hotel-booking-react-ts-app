import { FunctionComponent, useState } from 'react';
import OtpForm from '../OtpForm/OtpForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import styles from './DesktopRegister.module.scss';
interface DesktopRegisterProps {
  /**
   * setTypeModal
   */
  setTypeModal?: (val: string) => void;
}

const DesktopRegister: FunctionComponent<DesktopRegisterProps> = (props) => {
  const { setTypeModal } = props;
  ///////////////////state
  const [step, setStep] = useState<number>(0);
  const [registerUser, setRegisterUser] = useState<any>({});
  const [otpCr, setOtpCr] = useState<number>();
  return (
    <div className={styles['desktop-register']}>
      {step === 0 ? (
        <RegisterForm
          setStep={setStep}
          setRegisterUser={setRegisterUser}
          setOtpCr={setOtpCr}
        />
      ) : (
        <OtpForm registerUser={registerUser} setTypeModal={setTypeModal} otpCr={otpCr} setOtpCr={setOtpCr}/>
      )}
    </div>
  );
};

export default DesktopRegister;
