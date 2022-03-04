import { Col, Image, Row, Space, Typography } from 'antd';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { hotelRoom } from '@const/interface';
import styles from './HotelRoom.module.scss';
import Room1 from '../../../assest/images/room1.jpg';
import Room2 from '../../../assest/images/room2.jpg';
import Room3 from '../../../assest/images/room3.jpg';
import Room4 from '../../../assest/images/room4.jpg';
import DoubleBed from '../../../assest/icons/double-bed-20.png';
import SingleBed from '../../../assest/icons/single-bed-20.png';
import Group from '../../../assest/icons/group-16.png';
import Expand from '../../../assest/icons/expand-20.png';
import { getHotelRoom } from '../../../services/hotel.service';
import { some, SUCCESS_CODE } from '../../constants';
import { isMany } from '../../../utils/helpers';
const { Text } = Typography;
const ImagesMember = (props) => {
  const { images } = props;
  return (
    <Space size={2}>
      {images?.map((i: any, index: number) => (
        <Col span={8} key={index}>
          <Image src={Room2} width={66} height={49} />
        </Col>
      ))}
    </Space>
  );
};

interface HotelRoomProps {
  /**
   * id hotel
   */
  idHotel?: string;
}

const HotelRoom: FunctionComponent<HotelRoomProps> = (props) => {
  const { idHotel } = props;
  /////////////////state
  const [hotelRoom, setHotelRoom] = useState<hotelRoom>();
  const Price = (props) => {
    ///////////////////////////state
    const { idHotel, fisrtPrice } = props;
    const [percent, setPercent]= useState<number>();
    /////////////////////////////event
    // const hanldeGetCoupon = useCallback(async (idHotel: string) => {
    //   const payload: some = {
    //     idHotel: idHotel,
    //   };
    //   const respond = await getCouponHotel(payload);
    //   try{
    //     const res= await respond;
    //     if(res?.data?.code===SUCCESS_CODE){
    //       setPercent(res?.data?.data?.[0].Value);
    //     }
    //   }catch(err){
    //     alert("Sever doesn't respond")
    //   }
    // }, []);
    // useEffect(() => {
    //   hanldeGetCoupon(idHotel);
    // }, [hanldeGetCoupon, idHotel]);
    return (
      <div className={styles['price-wrapper']}>
        {percent ? (
          <>
            <Row className={styles['percent-wrapper']}>
              <Text className={styles['percent']}>-{percent}%</Text>
            </Row>
            <Text
              className={styles['item']}
              style={{ textDecorationLine: 'line-through' }}
            >
              {fisrtPrice}$
            </Text>
            <Text
              className={styles['item']}
              style={{
                fontSize: 20,
                fontWeight: 600,
                lineHeight: '24px',
                color: 'inherit',
              }}
            >
              ${fisrtPrice*(1-(percent*0.01))}
            </Text>
          </>
        ) : (
          <>
            <Text
              className={styles['item']}
              style={{
                fontSize: 20,
                fontWeight: 600,
                lineHeight: '24px',
                color: 'inherit',
              }}
            >
              ${fisrtPrice}
            </Text>
          </>
        )}
        <Text className={styles['item']}>/room/day</Text>
      </div>
    );
  };
  //////////////////event
  const getHotelRoomList = useCallback(async (idHotel: string | undefined) => {
    const payload: some = {
      idHotel: idHotel,
    };
    const respond = await getHotelRoom(payload);
    try {
      const res = respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setHotelRoom(res?.data?.data);
      }
    } catch (err) {}
  }, []);
  useEffect(() => {
    getHotelRoomList(idHotel && idHotel);
  }, [getHotelRoomList, idHotel]);
  return (
    <div className={styles['hotel-room']}>
      <Row className={styles['images']}>
        <Row className={styles['images-main']}>
          <Image src={Room1} width={202} height={151} />
        </Row>
        <Row className={styles['images-member']}>
          <Space size={2}>
            <Col span={8}>
              <Image src={Room2} width={66} height={49} />
            </Col>
            <Col span={8}>
              <Image src={Room3} width={66} height={49} />
            </Col>
            <Col span={8}>
              <Image src={Room4} width={66} height={49} />
            </Col>
          </Space>
        </Row>
      </Row>
      <Row className={styles['infor']}>
        <Col span={16}>
          <Text className={styles['title']}>{hotelRoom?.Room_Name}43243</Text>
          <Row className={styles['detail']}>
            <Text className={styles['detail-item']}>
              <Image
                src={
                  hotelRoom?.Bed_Number && hotelRoom?.Bed_Number >= 2
                    ? DoubleBed
                    : SingleBed
                }
                preview={false}
              />
              1 bed
            </Text>
            <Text className={styles['detail-item']}>
              <Image src={Group} preview={false} />
              {hotelRoom?.Bed_Number} man{isMany(2)}
            </Text>
            <Text className={styles['detail-item']}>
              <Image src={Expand} preview={false}/>
              {hotelRoom?.Bed_Number && hotelRoom?.Bed_Number * 25}23m2
            </Text>
          </Row>
        </Col>
        <Col span={8}>fdfs</Col>
      </Row>
    </div>
  );
};

export default HotelRoom;
