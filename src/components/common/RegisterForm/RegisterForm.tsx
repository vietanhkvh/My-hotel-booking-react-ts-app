import { some } from '../../../const/keyString';
import { Button, Form, Input, Typography } from 'antd';
import { FunctionComponent, useCallback, useState } from 'react';
import styles from './RegisterForm.module.scss';
import {
  checkDupUserN,
  registerAccount,
  sendEmailOtp,
} from '../../../services/common.service';
import { SUCCESS_CODE } from '../../../components/constants';
import { openNotificationWithIcon } from '../../../utils/helpers';
const { Title } = Typography;
interface RegisterFormProps {
  /**
   * set step
   */
  setStep?: (val: number) => void;
  /**
   * setRegisterUser
   */
  setRegisterUser?: (val: any) => void;
  /**
   * setOtpCr
   */
  setOtpCr?: (val: number) => void;
}

const RegisterForm: FunctionComponent<RegisterFormProps> = (props) => {
  const { setStep, setRegisterUser, setOtpCr } = props;
  const [form] = Form.useForm();
  ////////////////state
  const [isDupUserN, setIsDupUserN] = useState<boolean>();
  /////////////////////////event
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
  const checkIsDupUserName = useCallback(async (email: string) => {
    const payload = {
      userName: email,
    };
    const respond = await checkDupUserN(payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setIsDupUserN(res?.data?.data);
        if (!res?.data?.data) {
          openNotificationWithIcon('success', '', 'Email is not registed!');
        } else openNotificationWithIcon('error', '', 'Email was registed!');
      }
    } catch (error) {}
  }, []);
  const onFinish = useCallback(
    (value: some) => {
      if (!isDupUserN) {
        setStep && setStep(1);
        setRegisterUser && setRegisterUser(value);
        const otpCr = createOTP();
        console.log('opt', otpCr)
        setOtpCr && setOtpCr(otpCr);
        callSendOtpCode(value?.email, otpCr);
      } else openNotificationWithIcon('error', '', 'Email was registed!');
    },
    [callSendOtpCode, isDupUserN, setOtpCr, setRegisterUser, setStep]
  );
  return (
    <div className={styles['register-form']}>
      <Title level={4}>Sign up</Title>
      <Form
        className={styles['registerInfo']}
        form={form}
        preserve={false}
        name='registerForm'
        autoComplete='off'
        onFinish={onFinish}
      >
        {console.log('isDupUserN', isDupUserN)}
        <Form.Item
          className={styles['item-input']}
          name='userName'
          validateStatus={isDupUserN ? 'error' : ''}
          rules={[
            {
              required: true,
              message: 'Please enter your user name(email)!',
            },
            {
              type: 'email',
              message: 'Please enter rigth email formated!',
            },
          ]}
        >
          <Input
            className={styles['input-main']}
            onBlur={(e) => checkIsDupUserName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          className={styles['item-input']}
          name='email'
          rules={[
            {
              required: true,
              message: 'Please enter your email!',
            },
            {
              type: 'email',
              message: 'Please enter rigth email formated!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('userName') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two emails that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input className={styles['input-main']} placeholder={'Re-email'} />
        </Form.Item>
        <Form.Item
          className={styles['item-input']}
          name='fullName'
          rules={[
            {
              required: true,
              message: 'Please enter your name!',
            },
          ]}
        >
          <Input className={styles['input-main']} placeholder={'Full name'} />
        </Form.Item>

        <Form.Item
          className={styles['item-input']}
          name='phone'
          rules={[
            {
              required: true,
              message: 'Please enter your phone!',
            },
            () => ({
              validator(_, value) {
                if (!value || value?.length >= 10 ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The phone format is not correct!')
                );
              },
            }),
          ]}
        >
          <Input className={styles['input-main']} placeholder={'Phone'} />
        </Form.Item>
        <Form.Item
          className={styles['item-input']}
          name='password'
          rules={[
            {
              required: true,
              message: 'Please enter your password!',
            },
          ]}
        >
          <Input.Password
            className={styles['input-main']}
            placeholder={'Password'}
          />
        </Form.Item>
        <Form.Item
          className={styles['item-input']}
          name='repassword'
          rules={[
            {
              required: true,
              message: 'Please enter your re-password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password
            className={styles['input-main']}
            placeholder={'Repassword'}
          />
        </Form.Item>
        <Form.Item>
          <Button
            className={styles['btn-register']}
            type='primary'
            htmlType='submit'
          >
            {'Sign up'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
