import {
  DATE_FORMAT_BACK_END,
  some,
  SUCCESS_CODE,
} from '../../../components/constants';
import { isMany } from '../../../utils/helpers';
import { Card, Col, Image, Rate, Row, Space, Typography } from 'antd';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import LocationIC from '../../../assest/icons/location-50.png';
import PhoneIC from '../../../assest/icons/phone-50.png';

import styles from './HotelId.module.scss';
import {
  getHotelInforByID,
  getHotelRoom,
} from '../../../services/hotel.service';
import {
  hotelRoom,
  hotelSearching,
  ratingInfor,
} from '../../../const/interface';
import HotelImages from '../../../components/common/HotelImages/HotelImages';
import HotelRoom from '../../../components/common/HotelRoom/HotelRoom';
import { constState } from '@src/store/reducer/constReducer';
import { useSelector } from 'react-redux';
import moment from 'moment';
import NotFound from '../../../components/common/NotFound/NotFound';
import RatedCard from '../../../components/common/RatedCard/RatedCard';
import { getRatingHotel } from '../../../services/common.service';
const { Meta } = Card;
const { Text, Title } = Typography;
interface HotelIdProps {}

const HotelId: FunctionComponent<HotelIdProps> = (props) => {
  const hotelSearchingCondition = useSelector(
    (state: { const: constState }) => state?.const?.hotelSeachingCondition
  );
  ///////////////////////////////////////state
  const { hotelId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const guestNum =
    parseInt(searchParams.get('adults') || '') +
    parseInt(searchParams.get('children') || '');

  const [hotelInfor, setHotelInfor] = useState<hotelSearching>({});
  const [hotelInfors, setHotelInfors] = useState<hotelSearching[]>([]);
  const [hotelRooms, setHotelRooms] = useState<hotelRoom[]>([]);
  const [ratingHotel, setRatingHotel] = useState<ratingInfor[]>([]);
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
              ({reviewNumber > 0 ? reviewNumber : 0} rate
              {isMany(reviewNumber ? reviewNumber : 0)})
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
    const { couponValue, minPrice, finalPrice } = props;
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
  const getHotelInfor = useCallback(
    async (hotelId: any) => {
      const payload = {
        idHotel: hotelId,
        dateIn: moment(hotelSearchingCondition?.dateIn).format(
          DATE_FORMAT_BACK_END
        ),
        dateOut: moment(hotelSearchingCondition?.dateOut).format(
          DATE_FORMAT_BACK_END
        ),
      };
      const respond = await getHotelInforByID(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
          setHotelInfor(res?.data?.data?.[0]);
          setHotelInfors(res?.data?.data);
        }
      } catch (error) {}
    },
    [hotelSearchingCondition?.dateIn, hotelSearchingCondition?.dateOut]
  );
  const getHotelRoomList = useCallback(
    async (idHotel: string | undefined) => {
      const payload: some = {
        idHotel: idHotel,
        dateOut: moment(hotelSearchingCondition?.dateOut).format(
          DATE_FORMAT_BACK_END
        ),
        dateIn: moment(hotelSearchingCondition?.dateIn).format(
          DATE_FORMAT_BACK_END
        ),
      };
      const respond = await getHotelRoom(payload);
      try {
        const res = respond;
        if (res?.data?.code === SUCCESS_CODE) {
          setHotelRooms(res?.data?.data);
        }
      } catch (err) {}
    },
    [hotelSearchingCondition?.dateIn, hotelSearchingCondition?.dateOut]
  );
  const getRatingIFHotel = useCallback(async (idHotel?: string) => {
    const payload: some = {
      idHotel: idHotel,
    };
    const respond = await getRatingHotel(payload);
    try {
      const res = respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setRatingHotel(res?.data?.data);
      }
    } catch (err) {}
  }, []);

  useEffect(() => {
    getHotelInfor(hotelId);
    getHotelRoomList(hotelId);
    getRatingIFHotel(hotelId);
  }, [getHotelInfor, getHotelRoomList, getRatingIFHotel, hotelId]);
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
      <HotelImages hotelInfors={hotelInfors} />
      <Title level={5} style={{ marginTop: 20 }}>
        Rooms
      </Title>
      {hotelRooms?.length ? (
        hotelRooms?.map((h) => (
          <HotelRoom
            key={h?.ID_Room && h?.ID_Room}
            hotelRoom={h}
            ratingPoint={hotelInfor?.Rating_Point}
            reviewNum={hotelInfor?.Review_Number}
            imgHotel={hotelInfor?.Image}
          />
        ))
      ) : (
        <Col className={styles['hotel-card']} span={24}>
          <NotFound text={'Oop... No room is avaible now!'} />
        </Col>
      )}
      <Row className={styles['rating-component']}>
        <Row>
          <Title level={5}>People say about {hotelInfor?.Hotel_Name}</Title>
        </Row>
        <Row className={styles['rate-container']}>
          <Space size={'middle'}>
            {ratingHotel?.length > 0 ? (
              ratingHotel?.map((r) => (
                <RatedCard key={r.ID_Rating} rateInfor={r} />
              ))
            ) : (
              <Text>Don't have rating yet!</Text>
            )}
          </Space>
        </Row>
      </Row>
    </Row>
  );
};

export default HotelId;
