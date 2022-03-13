import { FunctionComponent, useCallback, useState } from 'react';
import { Table, Badge, Menu, Dropdown, Space, Typography, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { constState } from '@src/store/reducer/constReducer';
import { hotel, hotelRoom } from '../../../const/interface';
import { getRoomsHotel } from '../../../services/hotel.service';
import { SUCCESS_CODE } from '../../../components/constants';
import MyTable from '../../../components/common/MyTable/MyTable';
import styles from "./NestedTable.module.scss";
const { Text } = Typography;
const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);
interface NestedTableProps {
  
}
 
const NestedTable: FunctionComponent<NestedTableProps> = () => {
  ///////////////////////states
  const hotelManager = useSelector(
    (state: { const: constState }) => state?.const?.hotelManager
  );
  const [rooms, setRoom] = useState<hotelRoom[]>([]);

  const hotelList: hotel[] = [];
  hotelManager?.forEach((h, index) => {
    hotelList.push({
      key: (h.ID_Hotel || '') + index,
      ID_Hotel: h.ID_Hotel,
      Hotel_Name: h.Hotel_Name,
      City: h.City,
      District: h.District,
      Ward: h.Ward,
      Street: h.Street,
      Phone: h.Phone,
      ID_Status: h.ID_Status,
      ID_Account: h.ID_Account,
    });
  });

  //////////////////////components child
  const expandRowRender = (record: any, rooms: hotelRoom[]) => {
    console.log('record', record?.ID_Hotel);
    const columnsRoom = [
      { title: 'ID Room', dataIndex: 'ID_Room', key: 'ID_Room' },
      { title: 'Room Name', dataIndex: 'Room_Name', key: 'Room_Name' },
      {
        title: 'ID Status',
        dataIndex: 'ID_Status',
        key: 'ID_Status',
        render: (val: number) => (
          <Text>
            {val === 1 ? (
              <>
                <Badge status='success' />
                Active
              </>
            ) : (
              <>
                <Badge status='error' />
                Nonactive
              </>
            )}
          </Text>
        ),
      },
      { title: 'Bed Number', dataIndex: 'Bed_Number', key: 'Bed_Number' },
      {
        title: 'Bathroom Number',
        dataIndex: 'Bathroom_Number',
        key: 'Bathroom_Number',
      },
      { title: 'Price', dataIndex: 'Price', key: 'Price' },
      { title: 'ID Type Room', dataIndex: 'ID_Type_Room', key: 'ID_Type_Room' },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },

      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size='middle'>
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown overlay={menu}>
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];

    return (
      <MyTable
        columns={columnsRoom}
        data={rooms}
        getData={getRooms}
        param={record?.ID_Hotel}
      />
    );
  };

  const columnsHotel = [
    {
      title: 'ID Hotel',
      dataIndex: 'ID_Hotel',
      key: 'ID_Hotel',
      render: (ID_Hotel) => <Text>{ID_Hotel}</Text>,
    },
    {
      title: 'Hotel Name',
      dataIndex: 'Hotel_Name',
      key: 'Hotel_Name',
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'ID_Status',
      key: 'ID_Status',
      render: (val: number) => (
        <Text>
          {val === 1 ? (
            <>
              <Badge status='success' />
              Active
            </>
          ) : (
            <>
              <Badge status='error' />
              Nonactive
            </>
          )}
        </Text>
      ),
    },
  ];

  //////////////////////events
  const getRooms = useCallback(async (idHotel: string) => {
    const payload = {
      idHotel: idHotel,
    };
    const respond = await getRoomsHotel(payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setRoom(res?.data?.data);
      }
    } catch (error) {}
  }, []);
  return <div className={styles['nested-table']}>
    <Table
        className='hotel-room-nested'
        columns={columnsHotel}
        dataSource={hotelList}
        bordered
        expandable={{
          expandedRowRender: (record) => expandRowRender(record, rooms),
        }}
        rowClassName={styles['room-manager']}
      />
  </div>;
}
 
export default NestedTable;