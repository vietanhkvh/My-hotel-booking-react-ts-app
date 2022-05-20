import { openNotificationWithIcon } from '../../../utils/helpers';
import { Button, Form } from 'antd';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import styles from './OtpForm.module.scss';
import {
  registerAccount,
  sendEmailOtp,
} from '../../../services/common.service';
import { SUCCESS_CODE } from '../../constants';
interface OtpFormProps {
  /**
   * isMobile
   */
  isMobile?: boolean;
  /**
   * registerUser
   */
  registerUser?: any;
  /**
   * setTypeModal
   */
  setTypeModal?: (val: string) => void;
  /**
   * otpCr
   */
  otpCr?: number;
  /**
   * setOtpCr
   */
  setOtpCr?: (val: number) => void;
}

const OtpForm: FunctionComponent<OtpFormProps> = (props) => {
  const { isMobile, registerUser, setTypeModal, otpCr, setOtpCr } = props;
  ///////////////////////////states
  const [isReRequest, setIsReRequest] = useState<boolean>(false);
  const [otpVal, setOtpVal] = useState<string>('');
  const [ss, setSS] = useState<number>(10);

  ///////////////////////////event

  const handleChange = useCallback((otp: string) => {
    setOtpVal(otp);
  }, []);

  const showNullOTPWarn = useCallback(() => {
    const mess = 'Please enter 6 number of your OTP code!';
    openNotificationWithIcon('error', '', mess as string);
  }, []);

  const callSendOtpCode = useCallback(async (email: string, otp: number) => {
    const payload = {
      email: email,
      otp: otp,
    };
    const respond = await sendEmailOtp(payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        openNotificationWithIcon(
          'success',
          '',
          'Your OTP code was sent to your mail!'
        );
      }
    } catch (error) {}
  }, []);
  const createOTP = () => {
    const a = Math.floor(100000 + Math.random() * 900000);
    return a;
  };
  const reSendOTP = useCallback(
    async (email: string) => {
      const otpCr = createOTP();
      setOtpCr && setOtpCr(otpCr);
      callSendOtpCode(email, otpCr);
    },
    [callSendOtpCode, setOtpCr]
  );

  const signUp = useCallback(
    async (val: any) => {
      const payload = {
        idRole: 'GUE',
        userName: val?.userName,
        password: val?.password,
        fullName: val?.fullName,
        email: val?.email,
        phone: val?.phone,
        status: 1,
      };
      const respond = await registerAccount(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
          openNotificationWithIcon('success', '', 'Register successfull1');
          setTypeModal && setTypeModal('LOGIN');
        } else if (res?.data?.code !== SUCCESS_CODE || res?.data?.data) {
          openNotificationWithIcon('error', '', 'Register failed!');
        }
      } catch (error) {}
    },
    [setTypeModal]
  );

  const submitHandler = useCallback(
    (registerUser: any, otpCr?: number) => {
      if (otpVal !== '' && otpVal.length >= 6) {
        if (otpCr?.toString() === otpVal) {
         console.log('otp tao',otpCr);
         console.log('otp nhap',otpVal);
          signUp(registerUser);
        }
        else {
          console.log('otp tao',otpCr);
          console.log('otp nhap',otpVal);
          openNotificationWithIcon('error', '', 'OTP code is not correct!');
        }
      }

      if (otpVal.length < 6) {
        showNullOTPWarn();
      }
    },
    [otpVal, showNullOTPWarn, signUp]
  );
  const tickTock = useCallback((s: number) => {
    const tick = setInterval(() => {
      s -= 1;
      setSS(s);
      if (s <= 0) {
        setIsReRequest(true);
        clearInterval(tick);
      }
    }, 1000);
  }, []);
  useEffect(() => {
    tickTock(ss);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Form className={styles['form-otp']}>
      <div className={styles['getotp']}>
        <div className={styles['text-mention']}>
          <p>{'Your OTP code was sent to your email'}</p>
        </div>
        <div className={styles['text-mention']}>
          <p className={styles['text-phone']} style={{ fontSize: '18px' }}>
            {registerUser?.email}
          </p>
        </div>
        <OtpInput
          value={otpVal}
          onChange={handleChange}
          numInputs={6}
          containerStyle={styles['input-wrapper']}
          inputStyle={{
            height: '52px',
            width: '52px',
            padding: '8px',
            borderRadius: '100px',
            textAlign: 'center',
            caretColor: '#00b6f3',
            backgroundColor: '#00b6f3',
            color: '#ffffff',
            // margin: '5px',
            fontWeight: '600',
            fontSize: '24px',
            border: '0',
            'input:not(:focus)': {
              backgroundColor: '#F1F5F9',
            },
          }}
          focusStyle={{
            backgroundColor: '#ffffff',
            color: '#00b6f3',
            border: '0',
          }}
          isInputNum={true}
          shouldAutoFocus={true}
        />
        <div className={styles['button-wrapper']}>
          <Button
            tabIndex={6}
            className={styles['button-fgt']}
            type='primary'
            onClick={() => submitHandler(registerUser, otpCr)}
          >
            {'Confirm'}
          </Button>
        </div>
        <div className={styles['label-wrapper']}>
          {!isReRequest ? (
            <label className={styles['label']}>
              {'Resend OTP code.'}{' '}
              <label className={styles['seconds']}>{ss}s </label>
            </label>
          ) : (
            <label
              className={styles['label']}
              style={{ color: 'rgb(0, 182, 243)' }}
              onClick={() => reSendOTP(registerUser?.email)}
            >
              {'Resend OTP code.'}
            </label>
          )}
        </div>
      </div>
    </Form>
  );
};

export default OtpForm;
