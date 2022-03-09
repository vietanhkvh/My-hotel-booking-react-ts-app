import { Button, Row, Space, Typography } from 'antd';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import styles from './ConfirmPay.module.scss';
import PaymentInfor from '../../components/common/PaymentInfor/PaymentInfor';
import CustomerInfor from '../../components/common/CustomerInfor/CustomerInfor';
import LayoutCus from '../../components/Layout';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { hotelSearching } from '../../const/interface';
import { getHotelInforByID } from '../../services/hotel.service';
import { SUCCESS_CODE } from '../../components/constants';
import { useSelector } from 'react-redux';
import { constState } from '@src/store/reducer/constReducer';
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
  const navigate= useNavigate();
  const hotelSearchingCondition = useSelector(
    (state: { const: constState }) => state?.const?.hotelSeachingCondition
  );
  const dateIn = moment(hotelSearchingCondition?.dateIn);
  const dateOut = moment(hotelSearchingCondition?.dateOut);
  const dateGap = dateOut?.diff(dateIn, 'days');
  const [hotelInfor, setHotelInfor] = useState<hotelSearching>({});
  const [searchParams, setSearchParams] = useSearchParams();

  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  /////////////////////////////event
  const handleClickBack=()=>{
    navigate(-1);
  }
  const getHotelInfor = useCallback(async (idHotel: string | null) => {
    const payload = {
      idHotel: idHotel,
    };
    const respond = await getHotelInforByID(payload);
    try {
      const res: any = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setHotelInfor(res?.data?.data?.[0]);
      }
    } catch (error) {}
  }, []);
  useEffect(() => {
    const idHotel = searchParams.get('hotelID');
    getHotelInfor(idHotel);
  }, [getHotelInfor, searchParams]);
  const Children = () => {
    return (
      <>
      <HeaderSpecial isOpenLogin={isOpenLogin} setIsOpenLogin={setIsOpenLogin}/>
        <Row className={styles['confirm-pay-block']}>
          <Row className={styles['title']}>
            <Button shape='circle' icon={<LeftOutlined />} onClick={handleClickBack}></Button>
            <Title level={3} style={{paddingLeft: 20}}>Confirm and payment</Title>
          </Row>
          <Row gutter={48}>
            <CustomerInfor hotelInfor={hotelInfor} dateIn={dateIn} dateOut={dateOut} dateGap={dateGap} setIsOpenLogin={setIsOpenLogin}/>
            <PaymentInfor dateGap={dateGap} />
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
