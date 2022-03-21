import {
  Dispatch,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styles from './RoomManager.module.scss';
import {
  Badge,
  Space,
  Typography,
  Button,
  Select,
  Form,
  Popconfirm,
  InputNumber,
  Input,
  Row,
} from 'antd';
import {
  EditFilled,
  MinusOutlined,
  CloseOutlined,
  CheckOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { hotel, room, typeRooms } from '../../../const/interface';
import {
  editStatusRoom,
  getHotelTableForHost,
  getRoomsHotel,
  updateRoomInfor,
} from '../../../services/hotel.service';
import { SUCCESS_CODE } from '../../../components/constants';
// import MyTable from '../../../components/common/MyTable/MyTable';
import MyEditTable from '../../../components/common/MyEditTable/MyEditTable';
import {
  isDisableBtnAdd,
  openNotificationWithIcon,
} from '../../../utils/helpers';
import clsx from 'clsx';
import { getTypesRoom } from '../../../services/common.service';
import {
  setHotelManager,
  setTypesRoom,
} from '../../../store/actions/constAction';
import RoomInforForm from '../../../components/common/RoomInforForm/RoomInforForm';
import { constState } from '@src/store/reducer/constReducer';
import { userState } from '@src/store/reducer/userReducer';
const { Text } = Typography;
const { Option } = Select;

//editable for room table
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text' | 'select';
  record: any;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const typesRoom = useSelector(
    (state: { const: constState }) => state?.const?.typesRoom
  );
  const switchInputNode = (inputType: string) => {
    switch (inputType) {
      case 'number':
        return <InputNumber min={1} max={9999} />;
      case 'select':
        return (
          <Select
            style={{ width: 120 }}
          >
            {typesRoom?.map((t, index) => (
              <Option
                key={(t.ID_Type_Room || '') + index}
                value={t?.ID_Type_Room}
              >
                {t?.Type_Room_Name}
              </Option>
            ))}
          </Select>
        );
      default:
        return <Input />;
    }
  };

  const inputNode = switchInputNode(inputType);

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

interface RoomManagerProps {}

const RoomManager: FunctionComponent<RoomManagerProps> = () => {
  ///////////////////////states
  const userInfor = useSelector(
    (state: { user: userState }) => state?.user?.userInfor
  );
  const hotelManager = useSelector(
    (state: { const: constState }) => state?.const?.hotelManager
  );
  const dispatch: Dispatch<any> = useDispatch();

  const [form] = Form.useForm();

  const [rooms, setRoom] = useState<room[]>([]);

  const [idHotel, setIDHotel] = useState<string>('');

  const [hotels, setHotels] = useState<hotel[]>([]);

  const [editingKey, setEditingKey] = useState<string>('');

  const [visible, setVisible] = useState<boolean>(false);

  const isEditing = (record: room) => record.ID_Room === editingKey;

  ///////////////////////event
  function onChange(value) {
    console.log(`selected ${value}`);
    getRooms(value);
    setIDHotel(value);
  }
  function onSearch(val) {
    console.log('search:', val);
  }
  const showModal = () => {
    setVisible(true);
  };
  const handleAdd = () => {
    showModal();
  };
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

  const getRooms = useCallback(async (idHotel: string) => {
    const payload = {
      idHotel: idHotel,
    };
    const respond = await getRoomsHotel(payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        console.log('rooms',res?.data?.data)
        setRoom(res?.data?.data);
      }
    } catch (error) {}
  }, []);

  const updateRoom = useCallback(async (idRoom: string, roomInfor: room) => {
    const payload = {
      roomName: roomInfor?.Room_Name,
      bedNumber: roomInfor?.Bed_Number,
      bathNumber: roomInfor?.Bathroom_Number,
      price: roomInfor?.Price,
      idType: roomInfor?.ID_Type_Room,
    };
    const respond = await updateRoomInfor(idRoom, payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE && res?.data?.data === 1) {
        const message = 'Update room successfull!';
        openNotificationWithIcon('success', '', message);
        getRooms(idHotel);
      } else {
        openNotificationWithIcon('error', '', 'Update room failed');
      }
    } catch (error) {
      openNotificationWithIcon('error', '', 'Update room failed');
    }
  }, [getRooms, idHotel]);

  const updateStsRoom=useCallback(async (idRoom?: string, idStatus?:number ) => {
    const payload = {
      idRoom: idRoom,
      idStatus: idStatus,
    };

    const respond = await editStatusRoom( payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE && res?.data?.data === 1) {
        const message = 'Update status room with id: '+idRoom+' successfull!';
        openNotificationWithIcon('success', '', message);
        getRooms(idHotel)
      } else {
        openNotificationWithIcon('error', '', 'Update status room with id: '+idRoom+' failed');
      }
    } catch (error) {
      openNotificationWithIcon('error', '', 'Update status room with id: '+idRoom+' failed');
    }
  }, [getRooms, idHotel]);

  const handlerSts=(idRoom?:string, idStatus?:number)=>{
    updateStsRoom(idRoom, idStatus);
  }

  const getType = useCallback(async () => {
    const respond = await getTypesRoom();
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        dispatch(setTypesRoom(res?.data?.data));
      }
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getType();
    getHotelList(userInfor?.ID_Account);
  }, [getHotelList, getType, userInfor?.ID_Account]);

  //////////////////////components child
  const edit = (record: Partial<room>) => {
    form.setFieldsValue({
      ID_Room: '',
      Room_Name: '',
      Bed: '',
      Bathroom: '',
      Price: '',
      Type_Room: '',
      Status: '',
      ...record,
    });
    setEditingKey(record?.ID_Room || '');
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (ID_Room: any) => {
    try {
      const row = (await form.validateFields()) as room;

      const newData = [...rooms];
      const index = newData.findIndex((item) => ID_Room === item.ID_Room);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setRoom(newData);
        updateRoom(ID_Room, row);
        setEditingKey('');
      } else {
        newData.push(row);
        setRoom(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
    }
  };

  const columnsRoom = [
    {
      title: 'ID Room',
      dataIndex: 'ID_Room',
      key: 'ID_Room',
      render: (ID_Room) => <Text>{ID_Room}</Text>,
      editable: false,
    },
    {
      title: 'Room Name',
      dataIndex: 'Room_Name',
      key: 'Room_Name',
      render: (text) => <Text>{text}</Text>,
      editable: true,
    },
    {
      title: 'Bed Number',
      dataIndex: 'Bed_Number',
      key: 'Bed_Number',
      render: (text) => <Text>{text}</Text>,
      editable: true,
    },
    {
      title: 'Bathroom Number',
      dataIndex: 'Bathroom_Number',
      key: 'Bathroom_Number',
      render: (text) => <Text>{text}</Text>,
      editable: true,
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
      render: (text) => <Text>{text}</Text>,
      editable: true,
    },
    {
      title: 'Type Room',
      dataIndex: 'ID_Type_Room',
      key: 'ID_Type_Room',
      render: (text) => <Text>{text}</Text>,
      editable: true,
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
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: room) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record?.ID_Room)}
              style={{ marginRight: 8 }}
              icon={<CheckOutlined />}
            />
            <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
              <Button icon={<CloseOutlined />} />
            </Popconfirm>
          </span>
        ) : (
          <Space>
            <Button
              icon={<EditFilled />}
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            />
            {record?.ID_Status === 1 ? (
              <Button icon={<MinusOutlined />} onClick={()=>handlerSts(record?.ID_Room, 2)}/>
            ) : (
              <Button 
              icon={<PlusOutlined />}
              disabled={ record?.ID_Status === 2 && record?.ID_Payment ? false : true}
              onClick={()=>handlerSts(record?.ID_Room, 1)}
              />
            )}
          </Space>
        );
      },
    },
  ];

  const switchInputType = (dataIndex: string) => {
    switch (dataIndex) {
      case 'Room_Name':
        return 'text';
      case 'ID_Type_Room':
        return 'select';
      default:
        return 'number';
    }
  };

  const mergedColumns = columnsRoom.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: room) => ({
        record,
        inputType: switchInputType(col.dataIndex),
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <div className={styles['room-manager']}>
      <Row className={styles['function-wrapper']}>
        <Select
          className={clsx(styles['select-room'], styles['item'])}
          showSearch
          defaultValue={hotels?.[0]?.ID_Hotel}
          placeholder='Select a hotel'
          optionFilterProp='children'
          onChange={onChange}
          onSearch={onSearch}
        >
          {hotels?.map((h) => (
            <Option key={h?.ID_Hotel} value={h?.ID_Hotel}>
              {h?.Hotel_Name}
            </Option>
          ))}
        </Select>
        <Button
          className={clsx(styles['btn-add'], styles['item'])}
          onClick={handleAdd}
          disabled={isDisableBtnAdd(idHotel, editingKey)}
          type='primary'
        >
          Add new room
        </Button>
      </Row>
      <MyEditTable
        mergedColumns={mergedColumns}
        data={rooms}
        cancel={cancel}
        form={form}
        EditableCell={EditableCell}
      />
      <RoomInforForm
        visible={visible}
        setVisible={setVisible}
        getRooms={getRooms}
        idHotel={idHotel}
      />
    </div>
  );
};

export default RoomManager;
