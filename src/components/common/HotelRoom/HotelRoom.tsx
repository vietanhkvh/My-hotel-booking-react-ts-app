import { Button, Col, Image, Row, Space, Tag, Typography } from 'antd';
import {
  Dispatch,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { cartItem, hotelRoom } from '@const/interface';
import styles from './HotelRoom.module.scss';
import Room1 from '../../../assest/images/room1.jpg';
import Room2 from '../../../assest/images/room2.jpg';
import Room3 from '../../../assest/images/room3.jpg';
import Room4 from '../../../assest/images/room4.jpg';
import DoubleBed from '../../../assest/icons/double-bed-20.png';
import SingleBed from '../../../assest/icons/single-bed-20.png';
import Group from '../../../assest/icons/group-16.png';
import Expand from '../../../assest/icons/expand-20.png';
import { some, SUCCESS_CODE } from '../../constants';
import {
  calcGuest,
  calcTotalPrice,
  isMany,
  openNotificationWithIcon,
} from '../../../utils/helpers';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { constState } from '../../../store/reducer/constReducer';
import { getImgRoom } from '../../../services/common.service';
import clsx from 'clsx';
import { setCarts } from '../../../store/actions/constAction';
import moment from 'moment';
const { Text } = Typography;
const ImagesMember = (props) => {
  const { images } = props;
  return images?.length >= 4 ? (
    <>
      <Row className={styles['images-main']}>
        <Image src={images?.[0]?.Image} width={202} height={151} />
      </Row>
      <Row className={styles['images-member']}>
        <Space size={2}>
          {images?.slice(0, 4).map((i: any, index: number) =>
            index !== 0 ? (
              <Col span={8} key={index}>
                <Image src={i.Image} width={66} height={49} />
              </Col>
            ) : (
              ''
            )
          )}
        </Space>
      </Row>
    </>
  ) : (
    <>
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
    </>
  );
};

interface HotelRoomProps {
  /**
   * hotel room infor
   */
  hotelRoom?: hotelRoom;
  /**
   * rating point
   */
  ratingPoint?: number;
  /**
   * review number
   */
  reviewNum?: number;
  /**
   * imgHotel
   */
   imgHotel?:any;
}

const HotelRoom: FunctionComponent<HotelRoomProps> = (props) => {
  ///////////////////state
  let carts = useSelector(
    (state: { const: constState }) => state?.const?.carts
  );

  const dispatch: Dispatch<any> = useDispatch();

  const { hotelRoom, ratingPoint, reviewNum, imgHotel } = props;
  const navigate = useNavigate();
  const hotelSearchingCondition = useSelector(
    (state: { const: constState }) => state?.const?.hotelSeachingCondition
  );
  // const [roomsCarts, setRoomCarts] = useState<cartItem[]>(carts||[]);

  ///////////////component child
  const Price = (props) => {
    ///////////////////////////state
    const { couponValue, fisrtPrice, finalPrice, idStatus } = props;

    /////////////////////////////event
    const handleBtnCLick = (type: string) => {
      const room = {
        ID_Hotel: hotelRoom?.ID_Hotel,
        Hotel_Name: hotelRoom?.Hotel_Name,
        ID_Room: hotelRoom?.ID_Room,
        Room_Name: hotelRoom?.Room_Name,
        Bed_Number: hotelRoom?.Bed_Number,
        ID_Coupon: hotelRoom?.ID_Coupon,
        Coupon_Value: hotelRoom?.Coupon_Value,
        Price: hotelRoom?.Price,
        Final_Price: hotelRoom?.Final_Price,
        Rating_Point: ratingPoint,
        Review_Number: reviewNum,
        ID_Type_Room: hotelRoom?.ID_Type_Room,
        Image_Room: images?.[0]?.Image,
        Image_Hotel: imgHotel,
        Date_In: hotelSearchingCondition?.dateIn,
        Date_Out:  hotelSearchingCondition?.dateOut,
      };
      console.log('carts', carts)
      if (!carts?.find((c) => c.ID_Room === room.ID_Room)) {
        carts?.push(room);
        dispatch(setCarts(carts));
        const param: some = {
          dateIn: hotelSearchingCondition?.dateIn,
          dateOut: hotelSearchingCondition?.dateOut,
          rooms: hotelSearchingCondition?.rooms,
          adults: hotelSearchingCondition?.adults,
          children: hotelSearchingCondition?.children,
          finalPrice: calcTotalPrice(carts!),
        };
        if (type === 'RESERVE') {
          navigate({
            pathname: '/book',
            search: `?${createSearchParams(param)}`,
          });
        }
      } else {
        openNotificationWithIcon(
          'error',
          '',
          "Can't reserve the room which was already added in cart!"
        );
      }
    };

    // useEffect(() => {
    //   setCart();
    // }, [setCart]);
    return (
      <div className={styles['price-wrapper']}>
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
          onClick={()=>handleBtnCLick('RESERVE')}
          disabled={idStatus === 2 ? true : false}
        >
          Reserve
        </Button>
        <Button
          className={clsx(styles['button'], styles['btn-add'])}
          onClick={()=>handleBtnCLick('ADDCART')}
          disabled={idStatus === 2 ? true : false}
        >
          Add to cart
        </Button>
      </div>
    );
  };
  ///state
  const [images, setImages] = useState<some[]>([]);
  ///event
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
  //////////////////api
  const getImgsRoom = useCallback(async (idRoom?: string) => {
    const payload: some = {
      idRoom: idRoom,
    };
    const respond = await getImgRoom(payload);
    try {
      const res = respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setImages(res?.data?.data);
      }
    } catch (err) {}
  }, []);

  useEffect(() => {
    getImgsRoom(hotelRoom?.ID_Room);
  }, [getImgsRoom, hotelRoom?.ID_Room]);
  return (
    <div className={styles['hotel-room']}>
      <Row className={styles['images']}>
        <ImagesMember images={images} />
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
              {calcGuest(hotelRoom?.Bed_Number)} bed
              {isMany(calcGuest(hotelRoom?.Bed_Number))}
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
