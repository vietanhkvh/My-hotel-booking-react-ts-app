import {
  Col,
  Form,
  Input,
  Radio,
  Row,
  Space,
  Typography,
  Image,
  Button,
} from 'antd';
import { FunctionComponent, useCallback, useState } from 'react';
import CreditCard from '../../../assest/icons/credit-card-64.png';
import Cash from '../../../assest/icons/cash-40.png';
import styles from './CustomerInforForm.module.scss';
import { isVietnamesePhoneNumber } from '../../../utils/helpers';
import { useSelector } from 'react-redux';
import { userState } from '../../../store/reducer/userReducer';
const { Text, Title } = Typography;
interface CustomerInforFormProps {
  /**
   * setIsOpenLogin
   */
  setIsOpenLogin?: (val: boolean) => void;
}

const CustomerInforForm: FunctionComponent<CustomerInforFormProps> = (props) => {
  const {setIsOpenLogin }=props
  /////////////////////////////states
  const [value, setValue] = useState(1);
  const userInfor = useSelector(
    (state: { user: userState }) => state?.user?.userInfor
  );
  ///////////////////////////////event
  const onFinish = (values: any) => {
    console.log('Success:', values);
    if (!userInfor) {
      console.log('no user');
      setIsOpenLogin&&setIsOpenLogin(true)
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
  };
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className={styles['customer-infor-form']}>
      <Form
        name='contact-form'
        layout={'horizontal'}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Row className={styles['infor-member']}>
          <Title level={4} className={styles['title-form']}>
            Contact information
          </Title>

          <Form.Item
            label='Full name'
            name='fullName'
            rules={[
              { required: true, message: 'Please input your full name!' },
            ]}
          >
            <Input placeholder='Louis Lane' />
          </Form.Item>
          <Row gutter={5}>
            <Col span={12}>
              <Form.Item
                label='Number phone'
                name='numberPhone'
                rules={[
                  { required: true, message: 'Please input your phone!' },
                  {
                    validator: (_, value) =>
                      value?.length === 10
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error('Not correct phone number format!')
                          ),
                  },
                ]}
              >
                <Input placeholder='0123456789' />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label='Email'
                name='email'
                // rules={[
                //   { required: true, message: 'Please input your password!' },
                // ]}
              >
                <Input placeholder='example@gmail.com' />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles['infor-member']}>
            <Title level={4} className={styles['title-form']}>
              Pay with
            </Title>

            <Form.Item
              className={styles['radio-group']}
              name='payment-method'
              rules={[
                {
                  required: true,
                  message: (
                    <div style={{ marginTop: '5px' }}>Please pick an item!</div>
                  ),
                },
              ]}
            >
              <Radio.Group name='radiogroup' onChange={onChange} value={value}>
                <Space direction='vertical'>
                  <Radio value={1}>
                    <Image
                      src={CreditCard}
                      preview={false}
                      width={25}
                      height={25}
                    />
                    <Text style={{ paddingLeft: 10 }}>
                      Pay with credit card
                    </Text>
                  </Radio>
                  <Radio value={2}>
                    <Image
                      style={{ lineHeight: '20px' }}
                      src={Cash}
                      preview={false}
                      width={20}
                      height={20}
                    />
                    <Text style={{ paddingLeft: 10 }}>Pay before check in</Text>
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item className={styles['button-pay']}>
              <Button className={styles['button']} htmlType='submit'>
                Pay
              </Button>
            </Form.Item>
          </Row>
        </Row>
      </Form>
    </div>
  );
};

export default CustomerInforForm;
