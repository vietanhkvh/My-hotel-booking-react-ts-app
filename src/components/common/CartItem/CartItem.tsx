import { Button, Col, Image, Row, Space, Tag, Typography } from 'antd';
import { FunctionComponent, useState, Dispatch } from 'react';
import styles from './CartItem.module.scss';
import DoubleBed from '../../../assest/icons/double-bed-20.png';
import Room1 from '../../../assest/images/room1.jpg';
import SingleBed from '../../../assest/icons/single-bed-20.png';
import Group from '../../../assest/icons/group-16.png';
import Expand from '../../../assest/icons/expand-20.png';
import { some } from '../../../const/keyString';
import { DeleteOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { constState } from '../../../store/reducer/constReducer';
import { cartItem } from '../../../const/interface';
import { setCarts } from '../../../store/actions/constAction';
import { calcGuest, isMany } from '../../../utils/helpers';
import moment from 'moment';

const { Text } = Typography;
interface CartItemProps {
  /**
   * room infor
   */
  roomInfor?: cartItem;
}

const CartItem: FunctionComponent<CartItemProps> = (props) => {
  const { roomInfor } = props;
  ///state
  const carts = useSelector(
    (state: { const: constState }) => state?.const?.carts
  );
  const dispatch: Dispatch<any> = useDispatch();
  const dateGap = moment(roomInfor?.Date_Out).diff(moment(roomInfor?.Date_In),'days');

  //////////////////api
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
        return { color: '#d7be69', name: 'Luxury' };
    }
  };
  const handlerDetele = (idRoom?: string) => {
    const index = carts?.findIndex((c) => (c.ID_Room === idRoom));
    carts?.splice(index!, 1);
    dispatch(setCarts(carts));
  };
  //////////////////component child
  const Price = (props) => {
    ///////////////////////////state
    const { couponValue, fisrtPrice, finalPrice } = props;

    /////////////////////////////event
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
      </div>
    );
  };
  return (
    <div className={styles['cart-item']}>
      {console.log('roomInfor', roomInfor)}
      <Row className={styles['infor']}>
        <Col
          span={3}
          className={styles['infor-member']}
          style={{ justifyContent: 'flex-start' }}
        >
          <Image
            src={roomInfor?.Image_Room ? roomInfor?.Image_Room : Room1}
            preview={false}
            width={150}
            height={100}
          />
        </Col>
        <Col span={11} className={styles['room-infor']}>
          <Text className={clsx(styles['title'], styles['title-hotel'])}>
            {roomInfor?.Hotel_Name}
          </Text>

          <Text className={styles['title']}>
            {roomInfor?.Room_Name}{' '}
            <Tag color={setColorTag(roomInfor?.ID_Type_Room)?.color}>
              {setColorTag(roomInfor?.ID_Type_Room)?.name}
            </Tag>
          </Text>
          <Row className={styles['detail']}>
            <Text className={styles['detail-item']} style={{ paddingLeft: 0 }}>
              <Image
                src={
                  roomInfor?.Bed_Number && roomInfor?.Bed_Number >= 2
                    ? DoubleBed
                    : SingleBed
                }
                preview={false}
              />
              {calcGuest(roomInfor?.Bed_Number)} bed
              {isMany(calcGuest(roomInfor?.Bed_Number))}
            </Text>
            <Text className={styles['detail-item']}>
              <Image src={Group} preview={false} />
              {roomInfor?.Bed_Number} guest{isMany(roomInfor?.Bed_Number || 0)}
            </Text>
            <Text className={styles['detail-item']} style={{ border: 'none' }}>
              <Image src={Expand} preview={false} />
              {roomInfor?.Bed_Number && roomInfor?.Bed_Number * 20}m2
            </Text>
          </Row>
        </Col>
        <Col
          span={5}
          className={styles['price']}
          style={{
            justifyContent: !roomInfor?.Coupon_Value
              ? 'center'
              : 'space-evenly',
          }}
        >
          <Price
            couponValue={roomInfor?.Coupon_Value}
            fisrtPrice={roomInfor?.Price}
            finalPrice={roomInfor?.Final_Price}
          />
        </Col>
        <Col span={2} className={clsx(styles['infor-member'], styles['infor-mem'])}><Text className={styles['txt']}>x{dateGap}</Text></Col>
        <Col span={1} className={styles['infor-member']}><Text className={styles['txt']}>${roomInfor?.Final_Price! * dateGap}</Text></Col>
        <Col span={2} className={styles['infor-member']}>
          <Button
            className={clsx(styles['button'], styles['btn-add'])}
            onClick={() => handlerDetele(roomInfor?.ID_Room)}
          >
            <DeleteOutlined />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default CartItem;
