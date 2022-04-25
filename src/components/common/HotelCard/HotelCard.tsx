import { Card, Col, Image, Rate, Row, Typography } from 'antd';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import styles from './HotelCard.module.scss';
import LocationIC from '../../../assest/icons/location-50.png';
import Hotel from '../../../assest/images/hotel.jpg';
import { isMany } from '../../../utils/helpers';
import { getCouponHotel } from '../../../services/coupon.service';
import { DATE_FORMAT_BACK_END, some, SUCCESS_CODE } from '../../constants';
import PhoneIC from '../../../assest/icons/phone-50.png';
import { useSelector } from 'react-redux';
import { constState } from '@src/store/reducer/constReducer';
import moment from 'moment';
const { Meta } = Card;
const { Text } = Typography;
interface HotelCardProps {
  /**
   * id hotel
   */
  idHotel: string;
  /**
   * hotel name
   */
  name?: string;
  /**
   * district
   */
  district?: string;
  /**
   * phone number
   */
  phone?: string;
  /**
   * min price
   */
  minPrice?: number;
  /**
   * coupon Val
   */
  couponVal?: number;
  /**
   * image src
   */
  image?: any;
  /**
   * review number
   */
  reviewNumber?: number;
  /**
   * rating point
   */
  rating: number;
  /**
   * params
   */
  params: any;
}

const HotelCard: FunctionComponent<HotelCardProps> = (props) => {
  ///////////////////////////state
  const {
    idHotel,
    name,
    district,
    phone,
    minPrice,
    couponVal,
    image,
    reviewNumber,
    rating,
    params,
  } = props;
  const navigate = useNavigate();
  const hotelSearchingCondition = useSelector(
    (state: { const: constState }) => state?.const?.hotelSeachingCondition
  );
  ////////////////////////component
  const Title = (props) => {
    const { name, idHotel } = props;
    return (
      <div className={styles['title-meta']}>
        <Link to={`/hotel/${idHotel}`}>
          <div className={styles['hotel-name']}>{name}</div>
        </Link>
      </div>
    );
  };
  const Description = (props) => {
    const { ratingP, district, reviewNumber, phone } = props;
    return (
      <Row className={styles['description']}>
        {console.log('image', image)}
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
            <span>{district}</span>
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
    const { idHotel, fisrtPrice, percent } = props;
    // const [percent, setPercent]= useState<number>();
    /////////////////////////////event
    // const hanldeGetCoupon = useCallback(async (idHotel: string) => {
    //   const payload: some = {
    //     idHotel: idHotel,
    //     dateIn: moment(hotelSearchingCondition?.dateIn).format(DATE_FORMAT_BACK_END),
    //     dateOut: moment(hotelSearchingCondition?.dateOut).format(DATE_FORMAT_BACK_END),
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
    //   // hanldeGetCoupon(idHotel);
    // }, [hanldeGetCoupon, idHotel]);
    return (
      <div className={styles['price-wrapper']}>
        {percent ? (
          <>
            <Row className={styles['percent-wrapper']}>
              <Text className={styles['percent']}>-{percent}%</Text>
            </Row>
            {/* <Text
              className={styles['item']}
              style={{ textDecorationLine: 'line-through' }}
            >
              {fisrtPrice}$
            </Text> */}
          </>
        ) : (
          <></>
        )}
        <Text
          className={styles['item']}
          style={{
            fontSize: 20,
            fontWeight: 600,
            lineHeight: '24px',
            color: 'inherit',
          }}
        >
          From ${fisrtPrice}
        </Text>
        <Text className={styles['item']}>/room/day</Text>
      </div>
    );
  };
  ///////////////////////////event
  const handleClickHotelCard = (idHotel: string) => {
    navigate({
      pathname: `/hotel/${idHotel}`,
      search: `?${createSearchParams(params)}`,
    });
  };
  return (
    <div className={styles['hotel-card']}>
      <Card
        className={styles['card-wrapper']}
        hoverable
        style={{}}
        cover={
          <Image
            alt='example'
            src={image ? image : Hotel}
            width={286}
            height={214}
            style={{
              borderRadius: '8px',
              objectFit: 'cover',
              objectPosition: '30% 0%',
            }}
          />
        }
        bodyStyle={{ width: 'calc(100% - 286px)' }}
      >
        <Row
          className={styles['price-detail']}
          onClick={() => handleClickHotelCard(idHotel)}
        >
          <Col span={16}>
            <Meta
              title={<Title name={name} idHotel={idHotel} />}
              description={
                <Description
                  ratingP={rating}
                  district={district}
                  reviewNumber={reviewNumber}
                  phone={phone}
                />
              }
            />
          </Col>
          <Col span={8} className={styles['price']}>
            <Price
              idHotel={idHotel}
              fisrtPrice={minPrice}
              percent={couponVal}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default HotelCard;
