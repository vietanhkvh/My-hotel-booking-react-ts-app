import MyEditTable from '../../../components/common/MyEditTable/MyEditTable';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import styles from './ActiveRequestion.module.scss';
import { Badge, Button, Form, Row, Select, Space, Typography } from 'antd';
import { userInfoInterface } from '../../../const/interface';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {
  getHotelActive,
  getHotelActiveAll,
  updateHotelStatus,
} from '../../../services/hotel.service';
import { SUCCESS_CODE } from '../../../components/constants';
import { hotel } from '../../../const/interface';
import { openNotificationWithIcon } from '../../../utils/helpers';
const { Text } = Typography;
const { Option } = Select;

interface ActiveRequestionProps {}

const ActiveRequestion: FunctionComponent<ActiveRequestionProps> = () => {
  ///////////////////////state
  const [form] = Form.useForm();
  const dataHotel = [
    {
      ID_Hotel: 'HOTEL12',
      Hotel_Name: 'HOTEL12',
      Phone: '1234567890',
      ID_Account: 3,
    },
    {
      ID_Hotel: 'HOTEL13',
      Hotel_Name: 'HOTEL13',
      Phone: '1234567890',
      ID_Account: 3,
    },
  ];
  const [idStatus, setIDStatus] = useState<number>(0);
  const [hotels, setHotels] = useState<any[]>([]);
  ///////////////////////component
  const columnsHotel = [
    {
      title: 'ID Hotel',
      dataIndex: 'ID_Hotel',
      key: 'ID_Hotel',
      render: (text) => <Text>{text}</Text>,
      editable: false,
    },
    {
      title: 'Hotel Name',
      dataIndex: 'Hotel_Name',
      key: 'Hotel_Name',
      render: (text) => <Text>{text}</Text>,
      editable: true,
    },
    {
      title: 'City',
      dataIndex: 'City',
      key: 'City',
      render: (text) => <Text>{text}</Text>,
      editable: true,
    },
    {
      title: 'District',
      dataIndex: 'District',
      key: 'District',
      render: (text) => <Text>{text}</Text>,
      editable: true,
    },
    {
      title: 'Ward',
      dataIndex: 'Ward',
      key: 'Ward',
      render: (text) => <Text>{text}</Text>,
      editable: true,
    },
    {
      title: 'Street',
      dataIndex: 'Street',
      key: 'Street',
      render: (text) => <Text>{text}</Text>,
      editable: true,
    },
    {
      title: 'Phone',
      dataIndex: 'Phone',
      key: 'Phone',
      render: (text) => <Text>{text}</Text>,
      editable: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: hotel) => {
        return (
          <Space size={'middle'}>
            {record?.ID_Status === 3 ? (
              <Button
                icon={<MinusOutlined />}
                onClick={() => handleChangeSts(record?.ID_Hotel, 2)}
              />
            ) : (
              <Button
                icon={<PlusOutlined />}
                onClick={() => handleChangeSts(record?.ID_Hotel, 1)}
              />
            )}
          </Space>
        );
      },
    },
  ];
  ////////////////event
  const onChange = (value: any) => {
    console.log(`selected ${value}`);
    setIDStatus(value);
    getHotelRequest(value);
  };
  const handleChangeSts = (idHotel?: string, idStatus?: number) => {
    updateSts(idHotel, idStatus);
  };
  //api
  const getHotelRequest = useCallback(async (idStatus: number) => {
    const payload = {
      idStatus: idStatus,
    };
    const respond =
      (await idStatus) === 0 ? getHotelActiveAll() : getHotelActive(payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setHotels(res?.data?.data);
      }
    } catch (error) {}
  }, []);
  const updateSts = useCallback(
    async (idHotel?: string, idStatus?: number) => {
      const payload = {
        idHotel: idHotel,
        idStatus: idStatus,
      };
      const respond = await updateHotelStatus(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE && res?.data?.data === 1) {
          const message =
            'Accept requestion for hotel id: ' + idHotel + ' successfull!';
          openNotificationWithIcon('success', '', message);
          const id = idStatus === 2 ? 3 : 4;
          getHotelRequest(id);
        } else {
          openNotificationWithIcon(
            'error',
            '',
            'Accept requestion for hotel id: ' + idHotel + ' failed'
          );
        }
      } catch (error) {}
    },
    [getHotelRequest]
  );
  useEffect(() => {
    getHotelRequest(idStatus);
  }, [getHotelRequest, idStatus]);
  return (
    <div className={styles['active-requestion']}>
      <Row className={styles['select']}>
        <Select
          bordered={false}
          onChange={onChange}
          style={{ width: 120 }}
          defaultValue={idStatus}
          autoFocus={true}
        >
          <Option value={0}>All</Option>
          <Option value={3}>De-active</Option>
          <Option value={4}>Need-Active</Option>
        </Select>
      </Row>
      <Row className={styles['table']}>
        <MyEditTable
          mergedColumns={columnsHotel}
          data={hotels}
          // cancel={cancel}
          form={form}
          // EditableCell={EditableCell}
        />
      </Row>
    </div>
  );
};

export default ActiveRequestion;
