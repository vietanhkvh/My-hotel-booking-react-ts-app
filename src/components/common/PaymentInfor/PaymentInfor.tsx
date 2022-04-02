import { Col, Row, Space, Typography } from 'antd';
import { FunctionComponent } from 'react';
import styles from './PaymentInfor.module.scss';
import { calcTotalPrice, isMany } from '../../../utils/helpers';
import { cartItem, hotelRoom } from '../../../const/interface';
import PaymentItem from '../PaymentItem/PaymentItem';
import { useSelector } from 'react-redux';
import { constState } from '@src/store/reducer/constReducer';
import moment from 'moment';

const { Text, Title } = Typography;
interface PaymentInforProps {
  /**
   * room
   */
  room?: hotelRoom | undefined;
}

const PaymentInfor: FunctionComponent<PaymentInforProps> = (props) => {
  const { room } = props;
  const carts = useSelector(
    (state: { const: constState }) => state?.const?.carts
  );
  ////////////////////////state

  ////////////////////////event
  return (
    <Col span={9} className={styles['payment-infor']}>
      {carts?.map((c) => (
        <>
        <PaymentItem room={c} />
        {console.log('Date_In',c?.Date_In)}
        </>
      ))}

      <Row className={styles['payment-item']}>
        {carts?.map((c) => (
          <Row className={styles['bill-item']}>
            <Row
              className={styles['price-item']}
              style={{
                justifyContent: 'flex-end',
                display: c?.ID_Coupon ? '' : 'none',
              }}
            >
              <Text className={styles['price-raw']}>
                $
                {c?.Price! *
                  moment(c?.Date_Out).diff(moment(c?.Date_In), 'days')}
              </Text>
            </Row>
            <Row className={styles['price-item']}>
              <Col span={12}>
                <Text className={styles['hotel-text']}>
                  Pay at {c?.Hotel_Name}: {c?.Room_Name}
                </Text>
              </Col>
              <Col span={12} className={styles['price-mem']}>
                <Row>
                  <Space>
                  <Row
                    className={styles['coupon-value']}
                    style={{ display: c?.ID_Coupon ? '' : 'none' }}
                  >
                    -{c?.Coupon_Value}%
                  </Row>
                  <Text className={styles['price-text']}>
                    ${c?.Final_Price}{' '}
                  </Text>

                  <Text className={styles['price-text']}>
                    x{moment(c?.Date_Out).diff(moment(c?.Date_In), 'days')}=
                  </Text>

                  <Text className={styles['price-text']}>
                    $
                    {c?.Final_Price! *
                      moment(c?.Date_Out).diff(moment(c?.Date_In), 'days')}
                  </Text>
                  </Space>
                </Row>
              </Col>
            </Row>
          </Row>
        ))}
        <Row
          className={styles['bill-item']}
          style={{ borderBottom: '4px solid rgb(237, 242, 247)' }}
        ></Row>
        <Row className={styles['bill-item']} style={{ borderBottom: 'none' }}>
          <Text className={styles['total-txt']}>Total price</Text>
          <Text className={styles['total-txt']}>${calcTotalPrice(carts!)}</Text>
        </Row>
      </Row>
    </Col>
  );
};

export default PaymentInfor;
