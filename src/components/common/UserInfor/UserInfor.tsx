import { userInfoInterface } from '@const/interface';
import {
  getAccountIF,
  updateAccountInfor,
  updateAccountSts,
} from '../../../services/common.service';
import { userState } from '@src/store/reducer/userReducer';
import { Button, Col, Divider, Form, Input, Row, Typography } from 'antd';
import { FunctionComponent, useCallback, useState, Dispatch } from 'react';
import { useSelector } from 'react-redux';
import styles from './UserInfor.module.scss';
import { SUCCESS_CODE } from '../../constants';
import { openNotificationWithIcon } from '../../../utils/helpers';
import { useDispatch } from 'react-redux';
import { setUserInforAction } from '../../../store/actions/userAction';

const { Title } = Typography;
interface UserInforProps {}

const UserInfor: FunctionComponent<UserInforProps> = () => {
  const userInfor = useSelector(
    (state: { user: userState }) => state.user?.userInfor
  );
  /////////////////state
  const [isChangePwd, setIsChangePwd] = useState<boolean>(false);
  const [userIF, setUserIF] = useState<userInfoInterface | null | undefined>(
    userInfor
  );
  const dispatch: Dispatch<any> = useDispatch();
  ///api
  const updateAccount = useCallback(
    async (idAccount?: number, values?: any) => {
      const payload = {
        idAccount: idAccount,
        email: values?.email,
        fullName: values?.fullName,
        phone: values?.phone,
        password: values?.password,
      };
      const respond = await updateAccountInfor(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
          openNotificationWithIcon(
            'success',
            '',
            'Update your infor successfull1'
          );
          setIsChangePwd(false);
        } else {
          openNotificationWithIcon('error', '', 'Update your infor failed!');
        }
      } catch (error) {}
    },
    []
  );
  const getAcc = useCallback(
    async (idAccount?: number) => {
      const payload = {
        idAccount: idAccount,
      };
      const respond = await getAccountIF(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
          dispatch(setUserInforAction(res.data?.data));
          setUserIF(res.data?.data);
        }
      } catch (error) {}
    },
    [dispatch]
  );
  const updateAccountStatus = useCallback(
    async (idAccount?: number, sts?: number) => {
      const payload = {
        idAccount: idAccount,
        status: sts,
      };
      const respond = await updateAccountSts(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
          openNotificationWithIcon(
            'success',
            '',
            'Your request is sent successfull1'
          );
          getAcc(idAccount);
        } else {
          openNotificationWithIcon(
            'error',
            '',
            'Your request is sent infor failed!'
          );
        }
      } catch (error) {}
    },
    [getAcc]
  );
  /////////////////event
  const handlerUpdate = () => {
    updateAccountStatus(userIF?.ID_Account, 3);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    updateAccount(userInfor?.ID_Account, values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={styles['user-infor']}>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        scrollToFirstError
      >
        <Form.Item
          label='Full name'
          name='fullName'
          initialValue={userInfor?.FullName}
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Email'
          name='email'
          initialValue={userInfor?.Email}
          rules={[
            { required: true, message: 'Please input your email!' },
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Phone'
          name='phone'
          initialValue={userInfor?.Phone}
          rules={[{ required: true, message: 'Please input your phone!' }]}
        >
          <Input />
        </Form.Item>

        <Row className={styles['pwd-block']} gutter={12}>
          <Col span={24}>
            <Form.Item
              label='Password'
              name='password'
              hasFeedback
              initialValue={userInfor?.Password}
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password onFocus={() => setIsChangePwd(true)} />
            </Form.Item>
          </Col>

          <Col span={24}>
            {isChangePwd ? (
              <Form.Item
                label='Re-password'
                name='rePassword'
                hasFeedback
                rules={[
                  { required: true, message: 'Please input your re-password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          'The two passwords that you entered do not match!'
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            ) : (
              ''
            )}
          </Col>
        </Row>
        <Form.Item className={styles['btn-form']}>
          <Button type='primary' htmlType='submit' className={styles['btn']}>
            Save
          </Button>
        </Form.Item>
      </Form>

      {userInfor?.ID_Role === 'GUE' ? (
        <>
          <Divider style={{ fontSize: 12 }} orientation={'left'}>
            <Title level={4}> Be-host</Title>
          </Divider>
          <Button
            className={styles['btn-request']}
            disabled={userInfor?.Status === 3 ? true : false}
            onClick={handlerUpdate}
          >
            Request to become a host
          </Button>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default UserInfor;
