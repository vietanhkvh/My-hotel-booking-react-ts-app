import { sendEmailNewPwd } from '../../../services/common.service';
import { Button, Form, Input, Typography } from 'antd';
import { FunctionComponent, useCallback } from 'react';
import styles from './DesktopForgotPwd.module.scss';
import { SUCCESS_CODE } from '../../../components/constants';
import { openNotificationWithIcon } from '../../../utils/helpers';
const { Title, Text } = Typography;
interface DesktopForgotPwdProps {
  /**
   * setTypeModal
   */
  setTypeModal?: (val: string) => void;
}

const DesktopForgotPwd: FunctionComponent<DesktopForgotPwdProps> = (props) => {
  const { setTypeModal } = props;

  /////////////////////////api
  const sendMailNewPwd = useCallback(
    async (email: string) => {
      const payload = {
        email: email,
      };
      const respond = await sendEmailNewPwd(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
          openNotificationWithIcon(
            'success',
            '',
            'New password was sent to your email!'
          );
          setTypeModal && setTypeModal('LOGIN');
        }
      } catch (error) {}
    },
    [setTypeModal]
  );
  /////////////////////////event
  const onFinish = useCallback(
    (values: any) => {
      sendMailNewPwd(values?.email);
    },
    [sendMailNewPwd]
  );

  return (
    <div className={styles['desktop-forgot-pwd']}>
      <Title className={styles['title']} level={4}>
        Forgot password
      </Title>
      <Form onFinish={onFinish}>
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: <Text>{'Please enter your email'}</Text>,
            },
          ]}
        >
          <Input
            type={'text'}
            size='middle'
            placeholder={'example@gmail.com'}
            tabIndex={0}
            style={{ height: 48 }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            className={styles['button-fgt']}
            type='primary'
            htmlType='submit'
            tabIndex={1}
            style={{
              width: '100%',
              height: 44,
              borderRadius: 8,
            }}
          >
            {'Get new password'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DesktopForgotPwd;
