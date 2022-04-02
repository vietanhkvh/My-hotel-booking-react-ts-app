import HeaderSpecial from '../../components/desktop/HeaderSpecial/HeaderSpecial';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import styles from './History.module.scss';
import { Badge, Button, Image, Row, Select, Space, Typography } from 'antd';
import { payment } from '@const/interface';
import { useSelector } from 'react-redux';
import { userState } from '@src/store/reducer/userReducer';
import {
  getPaymentAccount,
  getPaymentAccountAll,
  updatePaymentSts,
} from '../../services/payments.service';
import { MinusOutlined, StarOutlined } from '@ant-design/icons';
import {  SUCCESS_CODE } from '../../components/constants';
import MyEditTable from '../../components/common/MyEditTable/MyEditTable';
import { openNotificationWithIcon } from '../../utils/helpers';
import moment from 'moment';
import NoPayment from '../../assest/icons/icon_empty_order_hotel.svg';
import RatingForm from '../../components/common/RatingForm/RatingForm';
import NoData from '../../components/common/NoData/NoData';
const { Option } = Select;
const { Text, Title } = Typography;

interface HistoryProps {}

const History: FunctionComponent<HistoryProps> = () => {
  const userInfor = useSelector(
    (state: { user: userState }) => state.user?.userInfor
  );
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const [payment, setPayment] = useState<payment[]>([]);
  const [idPaymentDClick, setIdPaymentDClick] = useState<string>();
  const [hotelName, setHotelName] = useState<string>();
  const [idStatus, setIDStatus] = useState<number>(0);

  const [visible, setVisible] = useState<boolean>(false);

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
      title: 'Hotel name',
      dataIndex: 'Hotel_Name',
      key: 'Hotel_Name',
      render: (Hotel_Name) => <Text>{Hotel_Name}</Text>,
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
      render: (_: any, record: payment) => (
        <Space>
          {record?.Status === 2 && today.diff(record?.Date_In, 'days') === 0 ? (
            <Button
              icon={<MinusOutlined />}
              onClick={() =>
                handleChangeSts(record?.ID_Payment, record?.Final_Total)
              }
            />
          ) : (
            <></>
          )}
          
          {record?.ID_Rating !== null ? (
            ''
          ) : (
            today.diff(record?.Date_In, 'days') >= 1 ?
            <Button
              icon={<StarOutlined />}
              onClick={() =>
                handlerClickRate(record?.ID_Payment_D, record?.Hotel_Name)
              }
            />
            :''
          )}
        </Space>
      ),
    },
  ];
  //////////////event
  const handlerClickRate=(idPaymentD?:string, hotelName?:string)=>{
    setVisible(true)
    setIdPaymentDClick(idPaymentD);
    setHotelName(hotelName);
  }
  const handleChangeSts = (idPayment?: string, totalPay?: number) => {
    const feeCancel =  Math.ceil(totalPay! * 0.3);
    console.log('feeCancel', feeCancel);
    updateSts(idPayment, feeCancel);
  };
  const onChange = (value: any) => {
    console.log(`selected ${value}`);
    setIDStatus(value);
    getPayment(userInfor?.ID_Account, value);
  };
  const getPayment = useCallback(
    async (idAccount?: number, idStatus?: number) => {
      const payload = {
        idAccount: idAccount,
        idStatus: idStatus,
      };
      const respond =
        (await idStatus) === 0
          ? getPaymentAccountAll(payload)
          : getPaymentAccount(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
          console.log('his', res?.data?.data)
          setPayment(res?.data?.data);
        }
      } catch (error) {}
    },
    []
  );

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
          getPayment(userInfor?.ID_Account, idStatus);
        } else {
          openNotificationWithIcon('error', '', 'Cancel payment failed!');
        }
      } catch (error) {}
    },
    [getPayment, idStatus, userInfor?.ID_Account]
  );

  useEffect(() => {
    getPayment(userInfor?.ID_Account, idStatus);
  }, [getPayment, idStatus, userInfor?.ID_Account]);
  ///////////////////////////component child

  return (
    <div className={styles['history']}>
      <HeaderSpecial
        isOpenLogin={isOpenLogin}
        setIsOpenLogin={setIsOpenLogin}
        isNoneSearching={true}
      />
      <Row className={styles['history-main']}>
        <Row className={styles['select']}>
          <Select
            bordered={false}
            onChange={onChange}
            style={{ width: 120 }}
            defaultValue={idStatus}
            autoFocus={true}
          >
            <Option value={0}>All</Option>
            <Option value={1}>Pay after</Option>
            <Option value={2}>Completed</Option>
            <Option value={3}>{'Cancle & refund'}</Option>
          </Select>
        </Row>
        {payment?.length ? (
          <Row className={styles['table-wrapper']}>
            <MyEditTable data={payment} mergedColumns={columns} />
          </Row>
        ) : (
          <NoData tilte="Don't have any payment yet" img={NoPayment}/>
        )}
        <RatingForm
          visible={visible}
          setVisible={setVisible}
          getPayment={getPayment}
          ID_Account={userInfor?.ID_Account}
          idStatus={idStatus}
          idPaymentD={idPaymentDClick}
          hotelName={hotelName}
        />
      </Row>
    </div>
  );
};

export default History;
