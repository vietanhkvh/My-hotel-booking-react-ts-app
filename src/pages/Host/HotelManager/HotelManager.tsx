import { SUCCESS_CODE } from '../../../components/constants';
import { hotel } from '../../../const/interface';
import {
  getHotelTableForHost,
  updateHotelInfor,
} from '../../../services/hotel.service';
import {
  Badge,
  Button,
  Space,
  Table,
  Typography,
  Input,
  InputNumber,
  Popconfirm,
  Form,
} from 'antd';
import { Dispatch, FunctionComponent, useCallback, useEffect, useState } from 'react';
import {
  EditFilled,
  MinusOutlined,
  CloseOutlined,
  CheckOutlined,
  PlusOutlined
} from '@ant-design/icons';
import styles from './HotelManager.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { userState } from '@src/store/reducer/userReducer';
import { openNotificationWithIcon } from '../../../utils/helpers';
import HotelInforForm from '../../../components/common/HotelInforForm/HotelInforForm';
import { setHotelManager } from '../../../store/actions/constAction';
import MyEditTable from '../../../components/common/MyEditTable/MyEditTable';
// import EditableCell from '../../../components/common/EditableCell/EditableCell';
const { Text } = Typography;

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: hotel;
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
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

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

interface HotelManagerProps {}

const HotelManager: FunctionComponent<HotelManagerProps> = () => {
  const userInfor = useSelector(
    (state: { user: userState }) => state?.user?.userInfor
  );
  const dispatch: Dispatch<any> = useDispatch();
  ////////////////////state
  const [hotelList, setHotelList] = useState<hotel[]>([]);

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string>('');
  //modal hotel form state
  const [visible, setVisible] = useState<boolean>(false);

  const isEditing = (record: hotel) => record.ID_Hotel === editingKey;

  const columns = [
    {
      title: 'ID Hotel',
      dataIndex: 'ID_Hotel',
      key: 'ID_Hotel',
      render: (ID_Hotel) => <Text>{ID_Hotel}</Text>,
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
      editable: false,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: hotel) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record?.ID_Hotel)}
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
            {record?.ID_Status===1?<Button icon={<MinusOutlined />}/>: <Button icon={<PlusOutlined />}/>}
            
          </Space>
        );
      },
    },
  ];
  ///////////////////event

  const edit = (record: Partial<hotel>) => {
    form.setFieldsValue({
      ID_Hotel: '',
      Hotel_Name: '',
      City: '',
      District: '',
      Ward: '',
      Street: '',
      Phone: '',
      Status: '',
      ...record,
    });
    setEditingKey(record?.ID_Hotel || '');
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (ID_Hotel: any) => {
    try {
      const row = (await form.validateFields()) as hotel;

      const newData = [...hotelList];
      const index = newData.findIndex((item) => ID_Hotel === item.ID_Hotel);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setHotelList(newData);
        console.log('row', row)
        updateHotel(ID_Hotel,row);
        setEditingKey('');
      } else {
        newData.push(row);
        setHotelList(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: hotel) => ({
        record,
        inputType: col.dataIndex === 'ID_Status' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  ///add hotel
  const showModal = () => {
    setVisible(true);
  };
  const handleAdd = () => {
    showModal()
  };

  ///////////////////////api
  const updateHotel = useCallback(async (ID_Hotel:string,hotelInfor: any) => {
    const payload = {
      ID_Hotel: hotelInfor?.ID_Hotel,
      Hotel_Name: hotelInfor?.Hotel_Name,
      City: hotelInfor?.City,
      District: hotelInfor?.District,
      Ward: hotelInfor?.Ward,
      Street: hotelInfor?.Street,
      Phone: hotelInfor?.Phone,
    };
    const respond = await updateHotelInfor(ID_Hotel,payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE && res?.data?.data === 1) {
        const message = 'Update hotel successfull!';
        openNotificationWithIcon('success', '', message);
      } else {
        openNotificationWithIcon('error', '', 'Update hotel failed');
      }
    } catch (error) {
      openNotificationWithIcon('error', '', 'Update hotel failed');
    }
  }, []);
  const getHotelList = useCallback(async (idAccount: number | undefined) => {
    const payload = {
      idAccount: idAccount,
    };
    const respond = await getHotelTableForHost(payload);
    // const respond = await getHotelTable();
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setHotelList(res?.data?.data);
        dispatch(setHotelManager(res?.data?.data));
      }
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getHotelList(userInfor?.ID_Account);
  }, [getHotelList, userInfor?.ID_Account]);
  
  return (
    <div className={styles['hotel-manager']}>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a hotel
        </Button>
      <Form form={form} component={false}>
        <Table
          columns={mergedColumns}
          dataSource={hotelList}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          rowClassName={styles['editable-row']}
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
      <HotelInforForm visible={visible} setVisible={setVisible} getHotelList={getHotelList}/>
      {/* <MyEditTable mergedColumns={mergedColumns} data={hotelList} cancel={cancel} /> */}
    </div>
  );
};

export default HotelManager;