import HeaderSpecial from '../../components/desktop/HeaderSpecial/HeaderSpecial';
import { FunctionComponent, useEffect, useState } from 'react';
import CartItem from '../../components/common/CartItem/CartItem';
import styles from './Cart.module.scss';
import { Button, Col, Row, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { some } from '../../const/keyString';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { constState } from '../../store/reducer/constReducer';
import { cartItem } from '@const/interface';
import NoData from '../../components/common/NoData/NoData';
import NoPayment from '../../assest/icons/icon_empty_order_hotel.svg';
import { calcTotalPrice } from '../../utils/helpers';
const { Title, Text } = Typography;

interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
  const navigate = useNavigate();
  const carts = useSelector(
    (state: { const: constState }) => state?.const?.carts
  );
  const hotelSearchingCondition = useSelector(
    (state: { const: constState }) => state?.const?.hotelSeachingCondition
  );
  ////////////////state
  const [cartItems, setCartItems] = useState<cartItem[]>(carts || []);
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const handleClickBack = () => {
    navigate(-1);
  };
  /////////////////////event
  const handleBtnCLick = () => {
    const param: some = {
      // dateIn: hotelSearchingCondition?.dateIn,
      // dateOut: hotelSearchingCondition?.dateOut,
      rooms: hotelSearchingCondition?.rooms,
      adults: hotelSearchingCondition?.adults,
      children: hotelSearchingCondition?.children,
      finalPrice: calcTotalPrice(carts!),
    };
    navigate({
      pathname: '/book',
      search: `?${createSearchParams(param)}`,
    });
  };
  useEffect(() => {
    setCartItems(carts || []);
  }, [carts]);
  return (
    <div className={styles['cart']}>
      <HeaderSpecial
        isOpenLogin={isOpenLogin}
        setIsOpenLogin={setIsOpenLogin}
        isNoneSearching={true}
      />
      <Row className={styles['title']}>
        <Button
          shape='circle'
          icon={<LeftOutlined />}
          onClick={handleClickBack}
        ></Button>
        <Title level={3} style={{ paddingLeft: 20 }}>
          Your itinerary
        </Title>
      </Row>
      {carts && carts?.length ? (
        <div className={styles['content']}>
          {cartItems?.map((c) => (
            <CartItem roomInfor={c} />
          ))}
          <Row className={styles['bill-item']} style={{ borderBottom: 'none' }}>
            <Col span={22} className={styles['price']}>
              <Text className={styles['item']}>Total Price</Text>
              <Text className={styles['item']}>${calcTotalPrice(carts)}</Text>
            </Col>
            <Col
              span={2}
              className={clsx(styles['bill-item'], styles['btn-pay'])}
            >
              <Button
                className={styles['button']}
                onClick={handleBtnCLick}
                // disabled={idStatus === 2 ? true : false}
              >
                Reserve
              </Button>
            </Col>
          </Row>
        </div>
      ) : (
        <NoData tilte="Don't have any room yet" img={NoPayment} />
      )}
    </div>
  );
};

export default Cart;
