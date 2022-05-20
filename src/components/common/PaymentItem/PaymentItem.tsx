import { cartItem, hotelSearching } from '../../../const/interface';
import { Col, Image, Rate, Row, Space, Typography } from 'antd';
import { FunctionComponent } from 'react';
import HotelImg from '../../../assest/images/hotel.jpg';
import Room from '../../../assest/images/room1.jpg';
import { DATE_FORMAT } from '../../constants';
import { SUCCESS_CODE } from '../../constants';
import DoubleBed from '../../../assest/icons/double-bed-20.png';
import SingleBed from '../../../assest/icons/single-bed-20.png';
import Group from '../../../assest/icons/group-16.png';
import Expand from '../../../assest/icons/expand-20.png';
import { calcGuest, isMany } from '../../../utils/helpers';
import styles from './PaymentItem.module.scss';
import { useSelector } from 'react-redux';
import { constState } from '@src/store/reducer/constReducer';
import moment from 'moment';
const { Text, Title } = Typography;

interface PaymentItemProps {
  /**
   * room
   */
  room?: cartItem;
}

const PaymentItem: FunctionComponent<PaymentItemProps> = (props) => {
  ///////////////////////////state
  const { room } = props;

  const dateIn = moment(room?.Date_In);
  const dateOut =  moment(room?.Date_Out);
  const dateGap = dateOut.diff(dateIn,'days')
  ///////////////////////////event
  return (
    <div className={styles['payment-item']}>
      <Row className={styles['infor-member']} style={{marginBottom:15}}>
        <Col span={6} className={styles['image']}>
          <Image src={room?.Image_Hotel? room?.Image_Hotel : HotelImg} preview={false} width={103} height={88} />
        </Col>
        <Col span={18} className={styles['hotel']}>
          <Row className={styles['hotel-infor']}>
            <Title className={styles['hotel-name']} level={5}>
              {room?.Hotel_Name}
            </Title>
            <Rate
              disabled
              style={{ fontSize: 14 }}
              allowHalf
              defaultValue={
                room?.Rating_Point && room?.Rating_Point
              }
            />
            <Text className={styles['rate-point']}>
              ({room?.Rating_Point ? room?.Rating_Point : 0})
            </Text>
          </Row>
          <Row className={styles['date']}>
            <Col span={8} className={styles['date-item']}>
              <Title className={styles['title']} level={5}>
                In date
              </Title>
              <Text className={styles['conent']}>
                {dateIn.format(DATE_FORMAT)}
              </Text>
            </Col>
            <Col span={8} className={styles['date-item']}>
              <Title className={styles['title']} level={5}>
                Out date
              </Title>
              <Text className={styles['conent']}>
                {dateOut.format(DATE_FORMAT)}
              </Text>
            </Col>
            <Col span={8} className={styles['date-item']}>
              <Title className={styles['title']} level={5}>
                Night
              </Title>
              <Text className={styles['conent']}>{dateGap}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={styles['infor-member']}>
        <Col span={6} className={styles['image']}>
          <Image
            className={styles['room-img']}
            src={room?.Image_Room? room?.Image_Room : Room}
            preview={false}
            width={103}
            height={58}
          />
          {room?.Coupon_Value ? (
            <Row className={styles['coupon']}>-{room?.Coupon_Value}%</Row>
          ) : (
            <></>
          )}
        </Col>
        <Col span={18} className={styles['infor']}>
          <Title className={styles['title']} level={5}>
            {room?.Room_Name}
          </Title>
          <Row className={styles['detail']}>

            <Text className={styles['detail-item']}>
              <Image
                src={
                  room?.Bed_Number && room?.Bed_Number >= 2
                    ? DoubleBed
                    : SingleBed
                }
                preview={false}
              />
              {calcGuest(room?.Bed_Number)} bed
              {isMany(calcGuest(room?.Bed_Number))}
            </Text>
            <Text className={styles['detail-item']}>
              <Image src={Group} preview={false} />
              {room?.Bed_Number} guest{isMany(2)}
            </Text>
            <Text className={styles['detail-item']}>
              <Image src={Expand} preview={false} />
              {room?.Bed_Number && room?.Bed_Number * 20}m2
            </Text>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentItem;
