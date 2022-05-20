import { Button, Col, Image, Row, Typography } from 'antd';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import styles from './Success.module.scss';
import FireWork from '../../assest/icons/fireworks.svg';
import clsx from 'clsx';
import { getPaymentInfor } from '../../services/payments.service';
import { SUCCESS_CODE } from '../../components/constants';
import { useNavigate, useSearchParams } from 'react-router-dom';
const { Title, Text } = Typography;
interface SuccessProps {}

const Success: FunctionComponent<SuccessProps> = () => {
  // const hotelSearchingCondition = useSelector(
  //   (state: { const: constState }) => state?.const?.hotelSeachingCondition
  // );
  // const dateIn = moment(hotelSearchingCondition?.dateIn);
  // const dateOut = moment(hotelSearchingCondition?.dateOut);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  //////////////////////////state
  const [paymentInfor, setPaymentInfor] = useState<any>([]);
  //////////////////////////event
  const getPaymentDe = useCallback(async () => {
    const payload = {
      idPayment: searchParams?.get('idPayment'),
    };
    const respond = await getPaymentInfor(payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setPaymentInfor(res?.data?.data);
      }
    } catch (error) {}
  }, [searchParams]);
  const handlerClick = () => {
    navigate({
      pathname: '/',
    });
  };
  useEffect(() => {
    getPaymentDe();
  }, [getPaymentDe]);
  return (
    <Row className={styles['success']}>
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

        <Button
          className={clsx(styles['item'], styles['button'])}
          onClick={handlerClick}
        >
          Make a new reservation
        </Button>
        <Row className={styles['payment']}>
          <Row className={styles['payment-wrapper']} >
          { paymentInfor?.length?
          paymentInfor?.map((p)=>
          <Row className={styles['payment-item-wrapper']}>
            <Col className={styles['payment-item']} span={5} style={{backgroundColor:'#ccffcc'}}>
              <Text className={styles['title']}>Date in</Text>
              <Text className={styles['txt']}>
                {p?.Date_In}
              </Text>
            </Col>
            <Col className={styles['payment-item']} span={5} style={{backgroundColor:'#ff9999'}}>
              <Text className={styles['title']}>Date out</Text>
              <Text className={styles['txt']}>
                {p?.Date_out}
              </Text>
            </Col>

            <Col className={styles['payment-item']} span={5} style={{backgroundColor:'#ffffcc'}}>
              <Text className={styles['title']}>Detail</Text>
              <Text className={clsx(styles['txt'], styles['detail'])}>{p?.Hotel_Name + '-' +p?.Room_Name}</Text>
            </Col>
            <Col className={styles['payment-item']} span={5} style={{backgroundColor:'#ccffff'}}>
              <Text className={styles['title']}>Guest number</Text>
              <Text className={styles['txt']}>
                {p?.Guest_Number}
              </Text>
            </Col>
            </Row>
            ) 
            :''
            }
            <Col
              className={clsx(styles['payment-item'], styles['payment-price'])}
              style={{backgroundColor:'#cc9900'}}
            >
              <Row
                className={clsx(
                  styles['payment-price-item'],
                  styles['payment-total']
                )}
              >
                <Text className={clsx(styles['title'], styles['total'])}>
                  Total payment
                </Text>
                <Text className={styles['txt']}>
                  ${paymentInfor?.[0]?.Final_Total}
                </Text>
              </Row>
            </Col>
          </Row>
        </Row>
      </Row>
    </Row>
  );
};

export default Success;
