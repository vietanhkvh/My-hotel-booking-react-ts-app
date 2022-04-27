import { Col, DatePicker, Row, Typography } from 'antd';
import {
  Dispatch,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styles from './DashBoardHost.module.scss';
import Statistical from '../../../components/common/Statistical/Statistical';
import { useDispatch, useSelector } from 'react-redux';
import { userState } from '@src/store/reducer/userReducer';
import {
  getPaymentAmount,
  getTotalIncome,
  getTotalIncomeEY,
  getTotalR,
  getTotalRA,
} from '../../../services/common.service';
import { SUCCESS_CODE } from '../../../components/constants';
import BarChart from '../../../components/common/BarChart/BarChart';
import LineChart from '../../../components/common/LineChart/LineChart';
import ProgressChart from '../../../components/common/ProgressChart/ProgressChart';
import { getHotelTableForHost } from '../../../services/hotel.service';
import { setHotelManager } from '../../../store/actions/constAction';
import RingProgressChart from '../../../components/common/RingProgressChart/RingProgressChart';
import moment from 'moment';
import { constState } from '@src/store/reducer/constReducer';
const { Title } = Typography;
interface DashBoardHostProps {}

const DashBoardHost: FunctionComponent<DashBoardHostProps> = () => {
  const userInfor = useSelector(
    (state: { user: userState }) => state?.user?.userInfor
  );
  const hotelManager = useSelector(
    (state: { const: constState }) => state?.const?.hotelManager
  );
  const dispatch: Dispatch<any> = useDispatch();
  ///////////////////////////state
  const [paymentA, setPaymentA] = useState<number>();
  const [income, setIncome] = useState<number>();
  const [incomeEY, setIncomeEY] = useState<number[]>();
  const [incomeTHY, setIncomeTHY] = useState<number>();
  const [hotels, setHotels] = useState<any>('');
  const [idHotel, setIDHotel] = useState<any>(hotelManager?.[0]?.ID_Hotel);
  const [year, setYear] = useState<any>(moment().year());
  const [yearT, setYearT] = useState<any>(moment().year());
  const [roomAct, setRoomAct] = useState<number>(0);
  const [roomA, setRoomA] = useState<number>(0);
  //////////////////////////api
  const getPaymentA = useCallback(async (idAccount: number) => {
    const payload = {
      idAccount: idAccount,
    };
    const respond = await getPaymentAmount(payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setPaymentA(res?.data?.data?.Payments_Amount);
      }
    } catch (error) {}
  }, []);

  const getTotalI = useCallback(async (idAccount: number, year: any) => {
    const payload = {
      idAccount: idAccount,
      year: year,
    };
    const respond = await getTotalIncome(payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setIncome(res?.data?.data);
      }
    } catch (error) {}
  }, []);

  const getTotalIM = useCallback(async (idAccount: number, year: any) => {
    const payload = {
      idAccount: idAccount,
      year: year,
    };
    const respond = await getTotalIncomeEY(payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setIncomeEY(res?.data?.data);
      }
    } catch (error) {}
  }, []);

  const getTotalRoomA = useCallback(async (idAccount: number) => {
    const payload = {
      idAccount: idAccount,
    };
    const respond = await getTotalRA(payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setRoomAct(res?.data?.data?.Room_Active);
      }
    } catch (error) {}
  }, []);

  const getTotalRoom = useCallback(async (idAccount: number) => {
    const payload = {
      idAccount: idAccount,
    };
    const respond = await getTotalR(payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setRoomA(res?.data?.data?.Room_Amount);
      }
    } catch (error) {}
  }, []);

  const getHotelList = useCallback(
    async (idAccount: number | undefined) => {
      const payload = {
        idAccount: idAccount,
      };
      const respond = await getHotelTableForHost(payload);
      // const respond = await getHotelTable();
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
          setHotels(res?.data?.data);
          dispatch(setHotelManager(res?.data?.data));
        }
      } catch (error) {}
    },
    [dispatch]
  );

  //////////////////////////func logic
  const nextTargetNum = (paymentA?: number) => {
    if (paymentA) {
      const index = paymentA!.toString().length;
      let next: number = 1;
      for (let i = 0; i < index; i++) {
        next *= 10;
      }
      let res = paymentA! / next;
      return { res: res, next: next };
    }
    return { res: 0, next: 0 };
  };
  //////////////////////////event
  useEffect(() => {
    getPaymentA(userInfor?.ID_Account!);
    getTotalI(userInfor?.ID_Account!, yearT);
    getTotalIM(userInfor?.ID_Account!, yearT);
    getHotelList(userInfor?.ID_Account);
    getTotalRoomA(userInfor?.ID_Account!);
    getTotalRoom(userInfor?.ID_Account!);
  }, [
    getHotelList,
    getPaymentA,
    getTotalI,
    getTotalIM,
    getTotalRoom,
    getTotalRoomA,
    userInfor?.ID_Account,
    yearT,
  ]);
  return (
    <div className={styles['dash-board-host']}>
      <Row gutter={[16, 16]} className={styles['container']}>
        <Col xs={24} sm={12} md={12} lg={8} className={styles['member']}>
          <Statistical
            title='Total room orders'
            value={paymentA}
            suffix={`/${nextTargetNum(paymentA!)?.next}`}
            Chart={() => (
              <ProgressChart percent={nextTargetNum(paymentA)?.res} />
            )}
            footer={false}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Statistical
            title='Total income'
            value={income}
            prefix={<Title level={2}>$</Title>}
            precision={1}
            yearSelect={true}
            styleYear={{ left: 300, width: 100 }}
            setYearOption={setYearT}
            Chart={() => <LineChart data={incomeEY} />}
            footer={false}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Statistical
            title='Active rooms'
            value={roomAct}
            suffix={`/${roomA}`}
            Chart={() => <RingProgressChart percent={roomAct! / roomA!} />}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Statistical
            title='Income each hotel for month'
            prefix={<Title level={2}>$</Title>}
            value={incomeTHY}
            dataSelect={hotels}
            setDataOption={setIDHotel}
            setYearOption={setYear}
            heightContent={300}
            yearSelect={true}
            Chart={() => (
              <BarChart
                xField={'month'}
                idAccout={userInfor?.ID_Account}
                idHotel={idHotel}
                setIncomeTHY={setIncomeTHY}
                year={year}
              />
            )}
            footer={false}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DashBoardHost;
