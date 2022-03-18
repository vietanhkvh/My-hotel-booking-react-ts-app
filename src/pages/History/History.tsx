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
import { MinusOutlined } from '@ant-design/icons';
import { SUCCESS_CODE } from '../../components/constants';
import MyEditTable from '../../components/common/MyEditTable/MyEditTable';
import { openNotificationWithIcon } from '../../utils/helpers';
import moment from 'moment';
import NoPayment from '../../assest/icons/icon_empty_order_hotel.svg' 
const { Option } = Select;
const { Text, Title } = Typography;
const NoData=()=>{

  return(
    <Row className={styles['no-data']}>
     <Title level={4}> Don't have payment yet</Title>
    <Image src={NoPayment} preview={false} width={150} height={150}/>
    </Row>
  )
}
interface HistoryProps {}

const History: FunctionComponent<HistoryProps> = () => {
  const userInfor = useSelector(
    (state: { user: userState }) => state.user?.userInfor
  );
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const [payment, setPayment] = useState<payment[]>([]);
  const [idStatus, setIDStatus] = useState<number>(0);
  const today = moment();
  const columns = [
    {
      title: 'ID Payment',
      dataIndex: 'ID_Payment',
      key: 'ID_Payment',
      render: (ID_Payment) => <Text>{ID_Payment}</Text>,
      editable: false,
    },
    {
      title: 'Guest number',
      dataIndex: 'Guest_Number',
      key: 'Guest_Number',
      render: (text) => <Text>{text}</Text>,
      editable: true,
    },
    {
      title: 'First Total',
      dataIndex: 'First_Total',
      key: 'First_Total',
      render: (text) => <Text>{text}</Text>,
      editable: true,
    },
    {
      title: 'Final total',
      dataIndex: 'Final_Total',
      key: 'Final_Total',
      render: (text) => <Text>{text}</Text>,
      editable: true,
    },
    {
      title: 'Date In',
      dataIndex: 'Date_In',
      key: 'Date_In',
      render: (text) => <Text>{text}</Text>,
      editable: true,
    },
    {
      title: 'Date out',
      dataIndex: 'Date_out',
      key: 'Date_out',
      render: (text) => <Text>{text}</Text>,
      editable: true,
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
          {console.log('today.diff(record?.Date_In '+record?.ID_Payment,today.diff(record?.Date_In, 'days'))}
          {record?.Status === 2 && today.diff(record?.Date_In,'days') === 0 ? (
            <Button
              icon={<MinusOutlined />}
              onClick={() =>
                handleChangeSts(record?.ID_Payment, record?.Final_Total)
              }
            />
          ) : <>no action</>}
        </Space>
      ),
    },
  ];
  //////////////event

  const handleChangeSts = (idPayment?: string, totalPay?: number) => {
    const feeCancel = totalPay ? Math.ceil(totalPay * 0.3) : 0;
    console.log('feeCancel', feeCancel)
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
        (await idStatus === 0
          ? getPaymentAccountAll(payload)
          : getPaymentAccount(payload));
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
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
        {
          payment?.length ?
          <Row className={styles['table-wrapper']}>
          <MyEditTable data={payment} mergedColumns={columns} />
          </Row>
          : <NoData/>  
        }
      </Row>
    </div>
  );
};

export default History;
