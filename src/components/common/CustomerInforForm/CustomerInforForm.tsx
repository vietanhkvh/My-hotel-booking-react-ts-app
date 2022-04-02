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
import {
  Dispatch,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import CreditCard from '../../../assest/icons/credit-card-64.png';
import Cash from '../../../assest/icons/cash-40.png';
import styles from './CustomerInforForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { constState } from '@src/store/reducer/constReducer';
import {
  DATE_FORMAT,
  some,
  SUCCESS_CODE,
} from '../../constants';
import {
  saveMultiplePD,
  savePayments,
} from '../../../services/payments.service';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import moment from 'moment';
import { setCarts } from '../../../store/actions/constAction';
import { openNotificationWithIcon } from '../../../utils/helpers';
import { sendEmailBooking } from '../../../services/common.service';
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
  /**
   * setIsOpenLogin
   */
  setIsOpenLogin?: (val: boolean) => void;
}

const CustomerInforForm: FunctionComponent<CustomerInforFormProps> = (
  props
) => {
  const { userInfor, setIsOpenLogin } = props;
  const navigate = useNavigate();

  /////////////////////////////states
  const [value, setValue] = useState(2);
  const [user, setUser] = useState<any>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const roomInfor = {
    Final_Price: searchParams.get('finalPrice'),
  };
  const hotelSearchingCondition = useSelector(
    (state: { const: constState }) => state?.const?.hotelSeachingCondition
  );
  const carts = useSelector(
    (state: { const: constState }) => state?.const?.carts
  );
  const dispatch: Dispatch<any> = useDispatch();

  // const dateIn = moment(hotelSearchingCondition?.dateIn);
  // const dateOut = moment(hotelSearchingCondition?.dateOut);
  ///////////////////////////////event
  const getName = (paymentInfor: any) => {
    let detail: string = '';
    if (paymentInfor?.length !== 1) {
      paymentInfor?.forEach(
        (p: any) =>
          (detail +=
            p?.Hotel_Name +
            ' - ' +
            p?.Room_Name +
            '( ' +
            moment(p?.Date_In).format(DATE_FORMAT) +
            ' -> ' +
            moment(p?.Date_Out).format(DATE_FORMAT) +
            ' ) | ')
      );
    } else
      detail =
        paymentInfor?.[0]?.Hotel_Name +
        '-' +
        paymentInfor?.[0].Room_Name +
        '(' +
        moment(paymentInfor?.[0]?.Date_In).format(DATE_FORMAT) +
        ' -> ' +
        moment(paymentInfor?.[0]?.Date_Out).format(DATE_FORMAT) +
        ')';
    return detail;
  };
  const callSendEmailBooking = useCallback(
    async (email: string, idPayment: string) => {
      const payload = {
        email: email,
        idPayment: idPayment,
        detail: getName(carts),
      };
      const respond = await sendEmailBooking(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
          openNotificationWithIcon(
            'success',
            '',
            'Booking information was sent to your mail!'
          );
        }
      } catch (error) {}
    },
    [carts]
  );

  const finishPaymentDe = useCallback(
    async (idPayment: string, email: string) => {
      const payload = {
        paymentD: JSON.stringify(carts),
        idPayment: idPayment,
      };
      const respond = await saveMultiplePD(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
          callSendEmailBooking(email, idPayment);
          dispatch(setCarts([]));
          const param: some = {
            idPayment: idPayment,
          };
          navigate({
            pathname: '/book-success',
            search: `?${createSearchParams(param)}`,
          });
        }
      } catch (error) {}
    },
    [callSendEmailBooking, carts, dispatch, navigate]
  );

  const finishPayment = useCallback(
    async (values: any, roomInfor: any, idAccount: number) => {
      const guestNum =
        (hotelSearchingCondition?.adults ?? 0) +
        (hotelSearchingCondition?.children ?? 0);

      const payloadP = {
        idAccount: idAccount,
        guestNum: guestNum,
        finalTotal: roomInfor?.Final_Price,
        paymentMethod: values?.paymentMethod,
      };

      if (carts?.length) {
        const respondP = await savePayments(payloadP);
        try {
          const resP = await respondP;
          if (resP?.data?.code === SUCCESS_CODE) {
            const idPayment = resP?.data?.data?.ID_Payment;
            finishPaymentDe(idPayment, values?.email);
          }
        } catch (error) {}
      } else {
        openNotificationWithIcon('error', '', "Failed! Cart's empty!");
      }
    },
    [
      carts?.length,
      finishPaymentDe,
      hotelSearchingCondition?.adults,
      hotelSearchingCondition?.children,
    ]
  );
  const onFinish = (values: any) => {
    console.log('Success:', values);
    if (userInfor) {
      finishPayment(values, roomInfor, userInfor?.ID_Account);
    } else {
      setIsOpenLogin && setIsOpenLogin(true);
    }
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
    // getLastIDPD();
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
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type:'email', message : 'Please input your correct email format!'}
                ]}
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
                    <Text style={{ paddingLeft: 10 }}>
                      Pay with internet banking
                    </Text>
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
