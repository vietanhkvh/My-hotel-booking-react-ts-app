import { Button, Row, Space, Typography } from 'antd';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import styles from './ConfirmPay.module.scss';
import PaymentInfor from '../../components/common/PaymentInfor/PaymentInfor';
import CustomerInfor from '../../components/common/CustomerInfor/CustomerInfor';
import LayoutCus from '../../components/Layout';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  hotelRoom,
  hotelSearching,
  userInfoInterface,
} from '../../const/interface';
import { getHotelInforByID, getRoom } from '../../services/hotel.service';
import { SUCCESS_CODE } from '../../components/constants';
import { useSelector } from 'react-redux';
import { constState } from '@src/store/reducer/constReducer';
import { userState } from '@src/store/reducer/userReducer';
import moment from 'moment';
import HeaderSpecial from '../../components/desktop/HeaderSpecial/HeaderSpecial';
const { Title } = Typography;
interface ConfirmPayProps {
  /**
   * dataProfileDomain
   */
  dataProfileDomain?: any;
}

const ConfirmPay: FunctionComponent<ConfirmPayProps> = (props) => {
  /////////////////////////////state
  const { dataProfileDomain } = props;
  const userInfor = useSelector(
    (state: { user: userState }) => state?.user?.userInfor
  );

  const navigate = useNavigate();
  const hotelSearchingCondition = useSelector(
    (state: { const: constState }) => state?.const?.hotelSeachingCondition
  );
  const dateIn = moment(hotelSearchingCondition?.dateIn);
  const dateOut = moment(hotelSearchingCondition?.dateOut);
  const dateGap = dateOut?.diff(dateIn, 'days');
  const [searchParams, setSearchParams] = useSearchParams();
  const idRoom = searchParams.get('hotelRoom');
  const idHotel = searchParams.get('hotelID');

  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const [user, setUser] = useState<userInfoInterface | null | undefined>(
    userInfor
  );
  const [hotelInfor, setHotelInfor] = useState<hotelSearching>({});
  const [room, setRoom] = useState<hotelRoom>();
  /////////////////////////////event
  const handleClickBack = () => {
    navigate(-1);
  };
  const getHotelInfor = useCallback(async (idHotel: string | null) => {
    const payload = {
      idHotel: idHotel,
    };
    const respond = await getHotelInforByID(payload);
    try {
      const res: any = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setHotelInfor(res?.data?.data?.[0]);
        localStorage.setItem(
          'hotel-infor',
          JSON.stringify(res?.data?.data?.[0])
        );
      }
    } catch (error) {}
  }, []);
  const loginBeforePay = useCallback(() => {
    if (!userInfor) {
      setIsOpenLogin && setIsOpenLogin(true);
    } else {
      setUser(userInfor);
    }
  }, [userInfor]);
  const getRoomInfor = useCallback(
    async (idHotel: string | null, idRoom: string | null) => {
      const payload = {
        idHotel: idHotel,
        idRoom: idRoom,
      };
      const respond = await getRoom(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
          setRoom(res?.data?.data?.[0]);
          localStorage.setItem(
            'room-infor',
            JSON.stringify(res?.data?.data?.[0])
          );
        }
      } catch (error) {}
    },
    []
  );
  useEffect(() => {
    getHotelInfor(idHotel);
    getRoomInfor(idHotel, idRoom);
    loginBeforePay();
  }, [getHotelInfor, getRoomInfor, idHotel, idRoom, loginBeforePay]);
  const Children = () => {
    return (
      <>
        <HeaderSpecial
          isOpenLogin={isOpenLogin}
          setIsOpenLogin={setIsOpenLogin}
          isNoneSearching={true}
        />
        <Row className={styles['confirm-pay-block']}>
          <Row className={styles['title']}>
            <Button
              shape='circle'
              icon={<LeftOutlined />}
              onClick={handleClickBack}
            ></Button>
            <Title level={3} style={{ paddingLeft: 20 }}>
              Confirm and payment
            </Title>
          </Row>
          <Row gutter={48}>
            <CustomerInfor
              hotelInfor={hotelInfor}
              dateIn={dateIn}
              dateOut={dateOut}
              dateGap={dateGap}
              userInfor={user}
            />
            <PaymentInfor dateGap={dateGap} room={room} />
          </Row>
        </Row>
      </>
    );
  };
  return (
    <div className={styles['confirm-pay']}>
      <LayoutCus
        contents={{
          title: 'Los Cocos',
          url: '',
          description: 'Book a room with lots of hot deals',
          icon: dataProfileDomain?.logo,
        }}
        children={<Children />}
      />
    </div>
  );
};

export default ConfirmPay;
