import { some, SUCCESS_CODE } from '../../../components/constants';
import { getCouponHotel } from '../../../services/coupon.service';
import { isMany } from '../../../utils/helpers';
import { Card, Col, Image, Rate, Row, Typography } from 'antd';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LocationIC from '../../../assest/icons/location-50.png';
import PhoneIC from '../../../assest/icons/phone-50.png';

import styles from './HotelId.module.scss';
import {
  getHotelInforByID,
  getHotelRoom,
} from '../../../services/hotel.service';
import { hotelRoom, hotelSearching } from '../../../const/interface';
import HotelImages from '../../../components/common/HotelImages/HotelImages';
import HotelRoom from '../../../components/common/HotelRoom/HotelRoom';
const { Meta } = Card;
const { Text, Title } = Typography;
interface HotelIdProps {}

const HotelId: FunctionComponent<HotelIdProps> = (props) => {
  //////////////////////////////////////////////////////////////////state
  const { hotelId } = useParams();
  const [hotelInfor, setHotelInfor] = useState<hotelSearching>({});
  const [hotelRooms, setHotelRooms] = useState<hotelRoom[]>([]);
  const TitleCom = (props) => {
    const { name } = props;
    return (
      <div className={styles['title-meta']}>
        <div className={styles['hotel-name']}>{name}</div>
      </div>
    );
  };
  const Description = (props) => {
    const { ratingP, street, ward, district, city, reviewNumber, phone } =
      props;
    const address = street + ', ' + ward + ', ' + district + ', ' + city;
    return (
      <Row className={styles['description']}>
        <Row className={styles['description-item']}>
          <Row>
            <Rate
              disabled
              style={{ fontSize: 14 }}
              allowHalf
              defaultValue={ratingP}
            />
            <Text
              className={styles['description-text']}
              style={{ color: '#ff385c', fontWeight: 500 }}
            >
              {ratingP}
            </Text>
          </Row>
          <Row>
            <span className={styles['description-text']}>
              ({reviewNumber} rate{isMany(reviewNumber ? reviewNumber : 0)})
            </span>
          </Row>
        </Row>
        <Row className={styles['description-item']}>
          <Col>
            <Image src={LocationIC} preview={false} width={14} height={14} />
          </Col>
          <Col style={{ marginLeft: 8 }}>
            <span>{address}</span>
          </Col>
        </Row>
        <Row className={styles['description-item']}>
          <Col>
            <Image
              src={PhoneIC}
              preview={false}
              width={16}
              height={14}
              style={{ paddingLeft: 2 }}
            />
          </Col>
          <Col style={{ marginLeft: 8 }}>
            <span>{phone}</span>
          </Col>
        </Row>
      </Row>
    );
  };
  const Price = (props) => {
    ///////////////////////////state
    const { couponValue,minPrice ,finalPrice } = props;
    // const [percent, setPercent] = useState<number>();
    /////////////////////////////event
    // const hanldeGetCoupon = useCallback(async (idHotel: string) => {
    //   const payload: some = {
    //     idHotel: idHotel,
    //   };
    //   const respond = await getCouponHotel(payload);
    //   try {
    //     const res = await respond;
    //     if (res?.data?.code === SUCCESS_CODE) {
    //       setPercent(res?.data?.data?.[0].Value);
    //     }
    //   } catch (err) {
    //     alert("Sever doesn't respond");
    //   }
    // }, []);

    ///////////////////////////////////////////////////////////////event

    // useEffect(() => {
    //   hanldeGetCoupon(idHotel);
    // }, [hanldeGetCoupon, idHotel]);
    return (
      <div className={styles['price-wrapper']}>
        {couponValue ? (
          <>
            <Row className={styles['percent-wrapper']}>
              <Text style={{ textDecorationLine: 'line-through' }}>
                ${minPrice}
              </Text>
              <Text className={styles['percent']}>-{couponValue}%</Text>
            </Row>

            <Text
              className={styles['item']}
              style={{
                fontSize: 20,
                fontWeight: 600,
                lineHeight: '24px',
                color: 'inherit',
              }}
            >
              ${finalPrice}
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
              ${finalPrice}
            </Text>
          </>
        )}
      </div>
    );
  };
  /////////////////////////////////////////////////////////////event
  const getHotelInfor = useCallback(async (hotelId: any) => {
    const payload = {
      idHotel: hotelId,
    };
    const respond = await getHotelInforByID(payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setHotelInfor(res?.data?.data?.[0]);
      }
    } catch (error) {}
  }, []);
  const getHotelRoomList = useCallback(async (idHotel: string | undefined) => {
    console.log('idhotel', idHotel) 
    const payload: some = {
      idHotel: idHotel,
    };
    const respond = await getHotelRoom(payload);
    try {
      const res = respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setHotelRooms(res?.data?.data);
      }
    } catch (err) {}
  }, []);
  useEffect(() => {
    getHotelInfor(hotelId);
    getHotelRoomList(hotelId);
  }, [getHotelInfor, getHotelRoomList, hotelId]);
  return (
    <Row className={styles['hotel-id']}>
      <Row className={styles['hotel-card']}>
        <Col span={16}>
          <Meta
            title={<TitleCom name={hotelInfor?.Hotel_Name} />}
            description={
              <Description
                ratingP={hotelInfor?.Rating_Point}
                street={hotelInfor?.Street}
                ward={hotelInfor?.Ward}
                district={hotelInfor?.District}
                city={hotelInfor?.City}
                reviewNumber={hotelInfor?.Review_Number}
                phone={hotelInfor?.Phone}
              />
            }
          />
        </Col>
        <Col span={8} className={styles['price']}>
          <Price
            couponValue={hotelInfor?.Coupon_Value}
            minPrice={hotelInfor?.Min_Price}
            finalPrice={hotelInfor?.Final_Price}
          />
        </Col>
      </Row>
      <HotelImages />
      <Title level={5} style={{ marginTop: 20 }} >Rooms</Title>
      {hotelRooms?.map((h) => (
        <HotelRoom key={h?.ID_Room && h?.ID_Room} hotelRoom={h} />
      ))}
    </Row>
  );
};

export default HotelId;
