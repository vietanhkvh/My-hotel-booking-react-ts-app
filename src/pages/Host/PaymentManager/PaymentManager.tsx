import { hotel, payment } from '../../../const/interface';
import { userState } from '@src/store/reducer/userReducer';
import { Badge, Button, Select, Space, Typography } from 'antd';
import {
  Dispatch,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './PaymentManager.module.scss';
import { MinusOutlined, StarOutlined } from '@ant-design/icons';
import { getHotelTableForHost } from '../../../services/hotel.service';
import { SUCCESS_CODE } from '../../../components/constants';
import { setHotelManager } from '../../../store/actions/constAction';
import moment from 'moment';
import {
  getPaymentHostByHotel,
  updatePaymentSts,
} from '../../../services/payments.service';
import { openNotificationWithIcon } from '../../../utils/helpers';
import MyEditTable from '../../../components/common/MyEditTable/MyEditTable';
const { Text, Title } = Typography;
const { Option } = Select;
interface PaymentManagerProps {}

const PaymentManager: FunctionComponent<PaymentManagerProps> = () => {
  const userInfor = useSelector(
    (state: { user: userState }) => state?.user?.userInfor
  );
  const dispatch: Dispatch<any> = useDispatch();

  ////////////////////state
  const [hotels, setHotels] = useState<hotel[]>([]);
  const [idHotel, setIDHotel] = useState<string>('');
  const [payment, setPayment] = useState<payment[]>([]);

  const today = moment();
  const columns = [
    {
      title: 'ID Payment',
      dataIndex: 'ID_Payment',
      key: 'ID_Payment',
      render: (ID_Payment) => <Text>{ID_Payment}</Text>,
      editable: false,
      ellipsis: true,
    },
    {
      title: 'Room name',
      dataIndex: 'Room_Name',
      key: 'Room_Name',
      render: (Room_Name) => <Text>{Room_Name}</Text>,
      editable: false,
      ellipsis: true,
    },
    {
      title: 'Guest number',
      dataIndex: 'Guest_Number',
      key: 'Guest_Number',
      render: (text) => <Text>{text}</Text>,
      editable: true,
      ellipsis: true,
    },
    {
      title: 'First Total',
      dataIndex: 'First_Total',
      key: 'First_Total',
      render: (text) => <Text>${text}</Text>,
      editable: true,
      ellipsis: true,
    },
    {
      title: 'Final total',
      dataIndex: 'Final_Total',
      key: 'Final_Total',
      render: (text) => <Text>${text}</Text>,
      editable: true,
      ellipsis: true,
    },
    {
      title: 'Date In',
      dataIndex: 'Date_In',
      key: 'Date_In',
      render: (text) => <Text>{text}</Text>,
      editable: true,
      ellipsis: true,
    },
    {
      title: 'Date out',
      dataIndex: 'Date_out',
      key: 'Date_out',
      render: (text) => <Text>{text}</Text>,
      editable: true,
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: (val: number) => (
        <Text>
          {val === 2 ? (
            <>
              <Badge status='success' />
              Payed
            </>
          ) : val === 1 ? (
            <>
              <Badge status='warning' />
              Pay later
            </>
          ) : (
            <>
              <Badge status='error' />
              Cancle&Refund
            </>
          )}
        </Text>
      ),
      editable: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: payment) => 
          record?.Status !== 3  && today.diff(record?.Date_In, 'days') === 0 ? (
            <Button
              icon={<MinusOutlined />}
              onClick={() =>
                handleChangeSts(record?.ID_Payment, record?.Final_Total)
              }
            />
          ) : (
            <></>
      ),
    },
  ];
  //////////api
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
  const getPayment = useCallback(async (idHotel?: string) => {
    const payload = {
      idHotel: idHotel,
    };
    const respond = await getPaymentHostByHotel(payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        console.log('pay host', res?.data?.data);
        setPayment(res?.data?.data);
      }
    } catch (error) {}
  }, []);
  const updateSts = useCallback(
    async (idPayment?: string, totalPay?: number) => {
      const payload = {
        idPayment: idPayment,
        idStatus: 3,
        finalTotal: totalPay,
      };
      const respond = await updatePaymentSts(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE && res?.data?.data === 1) {
          const message = 'Cancel payment successfull!';
          openNotificationWithIcon('success', '', message);
          // updateStsRoom(,1)
          getPayment(idHotel);
        } else {
          openNotificationWithIcon('error', '', 'Cancel payment failed!');
        }
      } catch (error) {}
    },
    [getPayment, idHotel]
  );
  ///////////////////event
  const handleChangeSts = (idPayment?: string, totalPay?: number) => {
    const feeCancel = totalPay ? Math.ceil(totalPay * 0.3) : 0;
    console.log('feeCancel', feeCancel);
    updateSts(idPayment, feeCancel);
  };
  const onChange = (value: any) => {
    console.log(`selected ${value}`);
    getPayment(value);
    setIDHotel(value);
  };
  useEffect(() => {
    getHotelList(userInfor?.ID_Account);
  }, [getHotelList, userInfor?.ID_Account]);
  return (
    <div className={styles['payment-manager']}>
      <Select
        className={styles['select']}
        placeholder='Select a hotel'
        onChange={onChange}
        style={{ width: 120 }}
        autoFocus={true}
      >
        {hotels?.map((h) => (
          <Option key={h?.ID_Hotel} value={h?.ID_Hotel}>
            {h?.Hotel_Name}
          </Option>
        ))}
      </Select>
      <MyEditTable mergedColumns={columns} data={payment} />
    </div>
  );
};

export default PaymentManager;
