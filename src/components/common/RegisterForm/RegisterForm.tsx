import { some } from '../../../const/keyString';
import { Button, Form, Input, Typography } from 'antd';
import { FunctionComponent, useCallback } from 'react';
import styles from './RegisterForm.module.scss';
import { registerAccount } from '../../../services/common.service';
import { SUCCESS_CODE } from '../../../components/constants';
import { openNotificationWithIcon } from '../../../utils/helpers';
const { Title } = Typography;
interface RegisterFormProps {
  /**
   * setTypeModal
   */
  setTypeModal?: (val: string) => void;
  /**
   * handleClose
   */
  handleClose?: () => void;
}

const RegisterForm: FunctionComponent<RegisterFormProps> = (props) => {
  const { setTypeModal, handleClose } = props;
  const [form] = Form.useForm();
  ////////////////state
  /////////////////////////event
  const signUp = useCallback(async (val: some) => {
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
  }, [setTypeModal]);
  const onFinish = useCallback(
    (value: some) => {
      signUp(value);
    },
    [signUp]
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
        <Form.Item
          className={styles['item-input']}
          name='userName'
          rules={[
            {
              required: true,
              message: 'Please enter your user name!',
            },
          ]}
        >
          <Input className={styles['input-main']} placeholder={'User name'} />
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
          ]}
        >
          <Input className={styles['input-main']} placeholder={'Email'} />
        </Form.Item>
        <Form.Item
          className={styles['item-input']}
          name='phone'
          rules={[
            {
              required: true,
              message: 'Please enter your phone!',
            },
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
