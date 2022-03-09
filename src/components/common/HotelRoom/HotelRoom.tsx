import { Button, Col, Divider, Image, Row, Space, Tag, Typography } from 'antd';
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
import { some } from '../../constants';
import { isMany } from '../../../utils/helpers';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { constState } from '../../../store/reducer/constReducer';
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
   * hotel room infor
   */
  hotelRoom?: hotelRoom;
}

const HotelRoom: FunctionComponent<HotelRoomProps> = (props) => {
  const { hotelRoom } = props;
  const navigate = useNavigate();
  const hotelSearchingCondition = useSelector(
    (state: { const: constState }) => state?.const?.hotelSeachingCondition
  );
  /////////////////state
  // const [tag, setTag] = useState<{ color?: string; name?: string }>({
  //   color: '#7541ff',
  //   name: 'NOMARL',
  // });
  const Price = (props) => {
    ///////////////////////////state
    const { couponValue, fisrtPrice, finalPrice, idStatus } = props;
    // const [percent, setPercent] = useState<number>();
    /////////////////////////////event
    const handleBtnCLick = () => {
      const param: some = {
        hotelID: hotelRoom?.ID_Hotel,
        hotelRoom: hotelRoom?.ID_Room,
        dateIn: hotelSearchingCondition?.dateIn,
        dateOut: hotelSearchingCondition?.dateOut,
        rooms: hotelSearchingCondition?.rooms,
        adults: hotelSearchingCondition?.adults,
        children: hotelSearchingCondition?.children,
      };
      navigate({
        pathname: '/book',
        search: `?${createSearchParams(param)}`,
      });
    };
    return (
      <div className={styles['price-wrapper']}>
        {console.log('hotelRoom', hotelRoom)}
        {couponValue ? (
          <>
            <Row className={styles['percent-wrapper']}>
              <Text className={styles['percent']}>-{couponValue}%</Text>
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
              ${fisrtPrice}
            </Text>
          </>
        )}
        <Text className={styles['item']}>/room/day</Text>
        <Button
          className={styles['button']}
          onClick={handleBtnCLick}
          disabled={idStatus === 2 ? true : false}
        >
          Reserve
        </Button>
      </div>
    );
  };

  //////////////////event
  const setColorTag = (idTypeRoom?: string) => {
    switch (idTypeRoom) {
      case 'LUX':
        return { color: '#d7be69', name: 'Luxury' };
      case 'MED':
        return { color: '#41a1ff', name: 'Medium' };
      case 'SIN':
        return { color: '#70d092', name: 'Small' };
      default:
        return { color: '#d7be69', name: 'Default' };
    }
  };
  useEffect(() => {
    // getHotelRoomList(idHotel && idHotel);
    // setColorTag(hotelRoom?.ID_Type_Room)
  }, []);
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
        <Col span={16} className={styles['room-infor']}>
          <Tag color={setColorTag(hotelRoom?.ID_Type_Room)?.color}>
            {setColorTag(hotelRoom?.ID_Type_Room)?.name}
          </Tag>
          <Text className={styles['title']}>{hotelRoom?.Room_Name}</Text>
          <Row className={styles['detail']}>
            <Text className={styles['detail-item']} style={{ paddingLeft: 0 }}>
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
              {hotelRoom?.Bed_Number} guest{isMany(2)}
            </Text>
            <Text className={styles['detail-item']} style={{ border: 'none' }}>
              <Image src={Expand} preview={false} />
              {hotelRoom?.Bed_Number && hotelRoom?.Bed_Number * 20}m2
            </Text>
          </Row>
        </Col>
        <Col span={8} className={styles['price']}>
          <Price
            couponValue={hotelRoom?.Coupon_Value}
            fisrtPrice={hotelRoom?.Price}
            finalPrice={hotelRoom?.Final_Price}
            idStatus={hotelRoom?.ID_Status}
          />
        </Col>
      </Row>
    </div>
  );
};

export default HotelRoom;
