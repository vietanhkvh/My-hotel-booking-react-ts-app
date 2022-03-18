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
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import CreditCard from '../../../assest/icons/credit-card-64.png';
import Cash from '../../../assest/icons/cash-40.png';
import styles from './CustomerInforForm.module.scss';
import { hotelRoom } from '../../../const/interface';
import { useSelector } from 'react-redux';
import { constState } from '@src/store/reducer/constReducer';
import { DATE_FORMAT_BACK_END, some, SUCCESS_CODE } from '../../constants';
import {
  savePayments,
  savePayments_D,
} from '../../../services/payments.service';
import { createSearchParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { editStatusRoom } from '../../../services/hotel.service';
const { Text, Title } = Typography;
interface CustomerInforFormProps {
  /**
   * userInfor
   */
  userInfor?: any;
  /**
   * dateIn
   */
  dateIn?: any;
  /**
   * dateOut
   */
  dateOut?: any;
}

const CustomerInforForm: FunctionComponent<CustomerInforFormProps> = (
  props
) => {
  const { userInfor } = props;
  const navigate = useNavigate();
  /////////////////////////////states
  const [value, setValue] = useState(2);
  const [user, setUser] = useState<any>({});
  const roomInfor = JSON.parse(localStorage.getItem('room-infor') || '');
  const hotelInfor = JSON.parse(localStorage.getItem('hotel-infor') || '');
  const hotelSearchingCondition = useSelector(
    (state: { const: constState }) => state?.const?.hotelSeachingCondition
  );
  const dateIn = moment(hotelSearchingCondition?.dateIn);
  const dateOut = moment(hotelSearchingCondition?.dateOut);
  ///////////////////////////////event
  const finishPaymentDe = useCallback(
    async (idPayment: string, idRoom: string) => {
      const payload = {
        idPayment: idPayment,
        idRoom: idRoom,
      };
      const respond = await savePayments_D(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
          const param: some = {
            idPayment: res?.data?.data?.ID_Payment,
            idPayment_D: res?.data?.data?.ID_Payment_D,
          };
          navigate({
            pathname: '/book-success',
            search: `?${createSearchParams(param)}`,
          });
        }
      } catch (error) {}
    },
    [navigate]
  );
  const finishPayment = useCallback(
    async (paymentMethod: number, roomInfor: hotelRoom, idAccount: number) => {
      const guestNum =
        (hotelSearchingCondition?.adults ?? 0) +
        (hotelSearchingCondition?.children ?? 0);
      const payloadP = {
        guestNum: guestNum,
        firsTotal: roomInfor?.Price,
        idCoupon: roomInfor?.ID_Coupon,
        finalTotal: roomInfor?.Final_Price + 5,
        dateIn: dateIn?.format(DATE_FORMAT_BACK_END),
        dateOut: dateOut?.format(DATE_FORMAT_BACK_END),
        idAccount: idAccount,
        paymentMethod: paymentMethod,
      };
      const payloadR = {
        idRoom: roomInfor?.ID_Room,
        idStatus: 2,
      };
      const respondP = await savePayments(payloadP);
      const respondR = await editStatusRoom(payloadR);
      try {
        const resP = await respondP;
        const resR = await respondR;
        if (
          resP?.data?.code === SUCCESS_CODE &&
          resR?.data?.code === SUCCESS_CODE
        ) {
          const idPayment = resP?.data?.data?.ID_Payment;
          finishPaymentDe(idPayment, roomInfor?.ID_Room || '');
        }
      } catch (error) {}
    },
    [
      dateIn,
      dateOut,
      finishPaymentDe,
      hotelSearchingCondition?.adults,
      hotelSearchingCondition?.children,
    ]
  );
  const onFinish = (values: any) => {
    console.log('Success:', values);
    finishPayment(values?.paymentMethod, roomInfor, userInfor?.ID_Account);
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log('value:', values);
    console.log('Failed:', errorInfo);
  };
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const setUserInfor = useCallback(() => {
    if (userInfor) {
      setUser(userInfor);
    }
  }, [userInfor]);
  useEffect(() => {
    setUserInfor();
  }, [setUserInfor]);
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
            initialValue={userInfor?.FullName}
            rules={[
              { required: true, message: 'Please input your full name!' },
            ]}
          >
            <Input placeholder='Louis Lane' value={user?.FullName} />
          </Form.Item>
          <Row gutter={5}>
            <Col span={12}>
              <Form.Item
                label='Number phone'
                name='numberPhone'
                initialValue={userInfor?.Phone}
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
                <Input placeholder='0123456789' value={user?.Phone} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label='Email'
                name='email'
                initialValue={userInfor?.Email}
                // rules={[
                //   { required: true, message: 'Please input your password!' },
                // ]}
              >
                <Input placeholder='example@gmail.com' value={user?.Email} />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles['infor-member']}>
            <Title level={4} className={styles['title-form']}>
              Pay with
            </Title>

            <Form.Item
              className={styles['radio-group']}
              name='paymentMethod'
              initialValue={value}
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
                <Radio value={2}>
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
                  <Radio value={1}>
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
