import { Button, Col, Image, Row, Typography } from 'antd';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import styles from './Success.module.scss';
import FireWork from '../../assest/icons/fireworks.svg';
import clsx from 'clsx';
import PaymentInfor from '../../components/common/PaymentInfor/PaymentInfor';
import { constState } from '@src/store/reducer/constReducer';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { getPaymentInfor } from '../../services/payments.service';
import { SUCCESS_CODE } from '../../components/constants';
import { useNavigate, useSearchParams } from 'react-router-dom';
const { Title, Text } = Typography;
interface SuccessProps {}

const Success: FunctionComponent<SuccessProps> = () => {
  const hotelSearchingCondition = useSelector(
    (state: { const: constState }) => state?.const?.hotelSeachingCondition
  );
  const dateIn = moment(hotelSearchingCondition?.dateIn);
  const dateOut = moment(hotelSearchingCondition?.dateOut);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  //////////////////////////state
  const [paymentInfor, setPaymentInfor] = useState<any>({});
  //////////////////////////event

  const getPaymentDe = useCallback(async () => {
    const payload = {
      idPayment: searchParams?.get('idPayment'),
      idPaymentD: searchParams?.get('idPayment_D'),
    };
    const respond = await getPaymentInfor(payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setPaymentInfor(res?.data?.data?.[0]);
      }
    } catch (error) {}
  }, [searchParams]);
  const handlerClick = () => {
    navigate({
      pathname:'/'})
  };
  useEffect(() => {
    getPaymentDe();
  }, [getPaymentDe]);
  return (
    <div className={styles['success']}>
      <Row className={styles['success-item']}>
        <Image
          className={styles['item']}
          src={FireWork}
          width={150}
          height={150}
          preview={false}
        />
        <Title className={styles['item']} level={4}>
          Your reservation record has been received.
        </Title>

        <Button className={clsx(styles['item'], styles['button'])} onClick={handlerClick}>
          Make a new reservation
        </Button>
        <Row className={styles['payment']}>
          <Title className={styles['hotel-name']} level={3}>{paymentInfor?.Hotel_Name}</Title>
          <Row className={styles['payment-wrapper']} gutter={[0, 12]}>
            <Col className={styles['payment-item']} span={11}>
              <Text className={styles['title']}>Date in</Text>
              <Text>{paymentInfor?.Date_In}</Text>
            </Col>
            <Col className={styles['payment-item']} span={11}>
              <Text className={styles['title']}>Date out</Text>
              <Text>{paymentInfor?.Date_out}</Text>
            </Col>

            <Col className={styles['payment-item']} span={11}>
              <Text className={styles['title']}>Room name</Text>
              <Text>{paymentInfor?.Room_Name}</Text>
            </Col>
            <Col className={styles['payment-item']} span={11}>
              <Text className={styles['title']}>Guest number</Text>
              <Text>{paymentInfor?.Guest_Number}</Text>
            </Col>
            <Col
              className={clsx(styles['payment-item'], styles['payment-price'])}
            >
              <Row className={styles['payment-price-item']}>
                <Text className={styles['title']}>Room price</Text>
                <Text>${paymentInfor?.First_Total}</Text>
              </Row>
              <Row
                className={styles['payment-price-item']}
                style={{ display: paymentInfor?.ID_Coupon ? 'none' : '' }}
              >
                <Text className={styles['title']}>Coupon value</Text>
                <Text>-{paymentInfor?.Value}%</Text>
              </Row>
              <Row className={styles['payment-price-item']}>
                <Text className={styles['title']}>
                  Taxes and hotel service fees
                </Text>
                <Text>${5}</Text>
              </Row>
              <Row
                className={clsx(
                  styles['payment-price-item'],
                  styles['payment-total']
                )}
              >
                <Text className={clsx(styles['title'], styles['total'])}>
                  Total payment
                </Text>
                <Text>
                  ${paymentInfor?.Final_Total}
                </Text>
              </Row>
            </Col>
          </Row>
        </Row>
      </Row>
    </div>
  );
};

export default Success;
