import { Col, Row, Image, Typography, Divider } from 'antd';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './PaymentInfor.module.scss';
import Room from '../../../assest/images/room1.jpg';
import { hotelRoom } from '../../../const/interface';
import { getRoom } from '../../../services/hotel.service';
import { SUCCESS_CODE } from '../../constants';
import DoubleBed from '../../../assest/icons/double-bed-20.png';
import SingleBed from '../../../assest/icons/single-bed-20.png';
import Group from '../../../assest/icons/group-16.png';
import Expand from '../../../assest/icons/expand-20.png';
import { isMany } from '../../../utils/helpers';
const { Text, Title } = Typography;
interface PaymentInforProps {
  /**
   * room
   */
  room?: hotelRoom | undefined;
  /**
   * night number
   */
  dateGap: number;
}

const PaymentInfor: FunctionComponent<PaymentInforProps> = (props) => {
  const { dateGap, room } = props;
  ////////////////////////state

  const taxes: number = 5;
  ////////////////////////event
  const calcRoomFee = () => {
    return room?.Coupon_Value
      ? (room?.Final_Price * dateGap).toFixed(1)
      : room?.Price
      ? (room?.Price * dateGap).toFixed(1)
      : '';
  };
  
  // useEffect(() => {
  //   getRoomInfor(idHotel, idRoom);
  //   return () => {
  //     setRoom({
  //       ID_Room: '',
  //       Room_Name: '',
  //       ID_Hotel: '',
  //       Bed_Number: 0,
  //       Bathroom_Number: 0,
  //       Price: 0,
  //       Coupon_Value: 0,
  //       Final_Price: 0,
  //       ID_Status: 0,
  //       ID_Type_Room: '',
  //     });
  //   };
  // }, [getRoomInfor, idHotel, idRoom]);

  return (
    <Col span={9} className={styles['payment-infor']}>
      <Row className={styles['payment-item']}>
        <Image
          className={styles['room-img']}
          src={Room}
          preview={false}
          width={432}
          height={114}
        />
        {/* {console.log(
          'room-infor',
          JSON.parse(localStorage.getItem('room-infor') || '')
        )} */}
        {room?.Coupon_Value ? (
          <Row className={styles['coupon']}>-{room?.Coupon_Value}%</Row>
        ) : (
          <></>
        )}
        <Title className={styles['title']} level={5}>
          {room?.Room_Name}
        </Title>
        <Row className={styles['detail']}>
          <Text className={styles['detail-item']} style={{ paddingLeft: 0 }}>
            <Image
              src={
                room?.Bed_Number && room?.Bed_Number >= 2
                  ? DoubleBed
                  : SingleBed
              }
              preview={false}
            />
            1 bed
          </Text>
          <Text className={styles['detail-item']}>
            <Image src={Group} preview={false} />
            {room?.Bed_Number} guest{isMany(2)}
          </Text>
          <Text className={styles['detail-item']} style={{ border: 'none' }}>
            <Image src={Expand} preview={false} />
            {room?.Bed_Number && room?.Bed_Number * 20}m2
          </Text>
        </Row>
      </Row>
      <Row className={styles['payment-item']}>
        <Row className={styles['bill-item']}>
          <Text>1 room/night</Text>
          <Text>${room?.Final_Price}</Text>
          <Row className={styles['price-item']}>
            {room?.Coupon_Value ? (
              <>
                <Row className={styles['coupon-value']}>
                  -{room?.Coupon_Value}%
                </Row>
                <Text className={styles['price-raw']}>${room?.Price}</Text>
              </>
            ) : (
              <></>
            )}
          </Row>
          <Row className={styles['total-room-rate']}>
            <Text>
              1 room x {dateGap} night{isMany(dateGap)}
            </Text>
            <Text>${calcRoomFee()}</Text>
          </Row>
        </Row>
        <Row
          className={styles['bill-item']}
          style={{ borderBottom: '4px solid rgb(237, 242, 247)' }}
        >
          <Text>Taxes and hotel service fees</Text>
          <Text>${taxes}</Text>
        </Row>
        <Row className={styles['bill-item']} style={{ borderBottom: 'none' }}>
          <Text>Total room rate</Text>
          <Text>${parseFloat(calcRoomFee()) + taxes}</Text>
        </Row>
      </Row>
    </Col>
  );
};

export default PaymentInfor;
