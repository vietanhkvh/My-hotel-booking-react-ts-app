import { HandleLogin } from '../../../modules/login/LoginFuntion';
import { Button, Col, Form, Input, Typography } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { Dispatch, FunctionComponent, useCallback } from 'react';
import styles from './LoginForm.module.scss';
import { some } from '../../constants';
import { setUserInforAction } from '../../../store/actions/userAction';
import { useDispatch } from 'react-redux';
import { openNotificationWithIcon } from '../../../utils/helpers';
const { Text } = Typography;
interface LoginFormProps {
  /**
   * typeScreenModal
   */
  typeScreenModal?: string;
  /**
   * setTypeModal
   */
  setTypeModal?: (value: string) => void;
  /**
   * isMobile
   */
  isMobile?: boolean;
  /**
   * height Container login
   */
  heightContainer?: string;
  /**
   * setIsPopUp
   */
  setIsOpenLogin?: (val: boolean) => void;
  /**
   * handleClose
   */
  handleClose?: () => void;
}

const LoginForm: FunctionComponent<LoginFormProps> = (props) => {
  const {
    setTypeModal,
    typeScreenModal,
    isMobile,
    heightContainer,
    setIsOpenLogin,
    handleClose,
  } = props;
  ////////////////////////////state
  const dispatch: Dispatch<any> = useDispatch();
  ////////////////////////////event
  const handleLoginFunction = useCallback(
    async (data: any) => {
      console.log('val', data.account, data.password);
      const request = HandleLogin(data.account, data.password);
      const response: some = await request;
      if (response.data?.data) {
        dispatch(setUserInforAction(response.data?.data));
        localStorage.setItem('token-key', response.data?.token);
        setIsOpenLogin && setIsOpenLogin(false);
        handleClose && handleClose();
      } else {
        openNotificationWithIcon('error', '', response?.error?.message);
      }
    },
    [dispatch, setIsOpenLogin, handleClose]
  );
  const onFinish = (values: any) => {
    handleLoginFunction(values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const clickForgotHandler = () => {
    setTypeModal && setTypeModal('FORGOT');
    // isMobile && router.push(routesPath.forgot);
  };

  return (
    <div className={styles['login-form']}>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        style={{ marginTop: 20, width: '100%' }}
      >
        <Form.Item
          name='account'
          rules={[
            {
              required: true,
              message: 'Please enter your phone number or email',
            },
          ]}
        >
          <Input
            placeholder={'Enter your phone number or email'}
            style={{ height: 48, width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder={'Password'} style={{ height: 48 }} />
        </Form.Item>

        <Form.Item style={{ marginBottom: 16 }}>
          <Button
            type='primary'
            htmlType='submit'
            style={{
              width: '100%',
              height: 44,
              borderRadius: 8,
            }}
          >
            {'Log in'}
          </Button>
        </Form.Item>
      </Form>
      <Col
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Paragraph className={styles['text']} onClick={clickForgotHandler}>
          {'Forgot password'}
        </Paragraph>
      </Col>
      <Text>
        {"Don't have account? "}
        <Text
          onClick={() => {
            setTypeModal && setTypeModal('REGISTER');
          }}
          style={{
            display: 'inline-block',
            color: 'rgb(0, 182, 243)',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          {'Sign up'}
        </Text>
      </Text>
    </div>
  );
};

export default LoginForm;
