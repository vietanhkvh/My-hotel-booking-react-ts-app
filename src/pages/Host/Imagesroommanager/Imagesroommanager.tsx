import {
  Button,
  Form,
  Popconfirm,
  Row,
  Select,
  Space,
  Typography,
  Image,
  InputNumber,
  Input,
} from 'antd';
import {
  Dispatch,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styles from './Imagesroommanager.module.scss';
import {
  EditFilled,
  DeleteOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import clsx from 'clsx';
import { hotel, image, room } from '../../../const/interface';
import MyEditTable from '../../../components/common/MyEditTable/MyEditTable';
import { useDispatch, useSelector } from 'react-redux';
import { userState } from '@src/store/reducer/userReducer';
import { some, SUCCESS_CODE } from '../../../components/constants';
import {
  getHotelTableForHost,
  getRoomsHotel,
} from '../../../services/hotel.service';
import { setHotelManager } from '../../../store/actions/constAction';
import { getImgRoom, updateImg } from '../../../services/common.service';
import { openNotificationWithIcon } from '../../../utils/helpers';
import ImageForm from '../../../components/common/ImageForm/ImageForm';
import { isDisableBtnAdd } from '../../../utils/helpers';
import { deleteImage } from '../../../services/images.service';
const { Text } = Typography;
const { Option } = Select;

//editable for images hotel table
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
  const switchInputNode = (inputType: string) => {
    switch (inputType) {
      case 'number':
        return <InputNumber min={1} max={9999} />;
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

interface ImagesRoomManagerProps {}

const ImagesRoomManager: FunctionComponent<ImagesRoomManagerProps> = () => {
  const userInfor = useSelector(
    (state: { user: userState }) => state?.user?.userInfor
  );
  const dispatch: Dispatch<any> = useDispatch();

  /////////////////////////state

  const [imgs, setImgs] = useState<any[]>([]);

  const [hotels, setHotels] = useState<hotel[]>([]);

  const [idHotel, setIDHotel] = useState<string>('');

  const [rooms, setRooms] = useState<room[]>([]);

  const [idRoom, setIDRoom] = useState<string>('');

  const [form] = Form.useForm();

  const [editingKey, setEditingKey] = useState<number>();

  const [visible, setVisible] = useState<boolean>(false);

  const isEditing = (record: image) => record.ID_IMG === editingKey;
  
  ////////////////////////event
  function onChangeHotel(value) {
    console.log(`selected ${value}`);
    getRooms(value);
    setIDHotel(value);
  }

  function onChangeRoom(value) {
    console.log(`selected ${value}`);
    getImgs(value);
    setIDRoom(value);
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
        setRooms(res?.data?.data);
      }
    } catch (error) {}
  }, []);

  const getImgs = useCallback(async (idRoom?: string) => {
    const payload = {
      idRoom: idRoom,
    };
    const respond = await getImgRoom(payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setImgs(res?.data?.data);
      }
    } catch (error) {}
  }, []);

  const updateImgHotel = useCallback(
    async (idImg: number, imgInfor: any) => {
      const payload = {
        idImg: idImg,
        imgUrl: imgInfor?.Image,
      };
      const respond = await updateImg(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE && res?.data?.data === 1) {
          openNotificationWithIcon('success', '', 'Update image successfull!');
          getImgs(idRoom);
          return true;
        } else {
          openNotificationWithIcon('error', '', 'Update image failed!');
          return false;
        }
      } catch (error) {}
    },
    [getImgs, idRoom]
  );
  const deleteImgs = useCallback(async (idImg?: number, idRoom?:string) => {
    const payload: some = {
      idImg: idImg,
    };
    const respond = await deleteImage(payload);
    try {
      const res = respond;
      if (res?.data?.code === SUCCESS_CODE && res?.data?.data === 1) {
        const message = 'Remove image with id: ' + idImg + ' successfull!';
        openNotificationWithIcon('success', '', message);
        getImgs(idRoom);
      } else {
        openNotificationWithIcon(
          'error',
          '',
          'Remove image with id: ' + idImg + ' failed'
        );
      }
    } catch (error) {
      openNotificationWithIcon(
        'error',
        '',
        'Remove image with id: ' + idImg + ' failed'
      );
    }
  }, [getImgs]);
  const hanlderDeleteImg=useCallback((idImg?:number, idRoom?:string)=>{
    deleteImgs(idImg, idRoom)
  },[deleteImgs])

  useEffect(() => {
    getHotelList(userInfor?.ID_Account);
  }, [getHotelList, userInfor?.ID_Account]);
  ////////////////////////////////component
  const edit = (record: Partial<image>) => {
    form.setFieldsValue({
      ID_IMG: null,
      Image: '',
      ...record,
    });
    setEditingKey(record?.ID_IMG || undefined);
  };
  const cancel = () => {
    setEditingKey(undefined);
  };

  const save = async (ID_IMG: any) => {
    try {
      const row = (await form.validateFields()) as image;

      const newData = [...imgs];
      const index = newData.findIndex((item) => ID_IMG === item.ID_IMG);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log('img', row);
        if (await updateImgHotel(ID_IMG, row)) {
          setImgs(newData);
        }
        setEditingKey(undefined);
      } else {
        newData.push(row);
        setImgs(newData);
        setEditingKey(undefined);
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columnImgs = [
    {
      title: 'ID Image',
      dataIndex: 'ID_IMG',
      key: 'ID_IMG',
      render: (text) => <Text>{text}</Text>,
      editable: false,
      width: '10%',
    },
    {
      title: 'Image link',
      dataIndex: 'Image',
      key: 'Image',
      render: (_: any, record: image) => {
        return (
          <Text>{record?.Image ? record?.Image : "Don't have image link"}</Text>
        );
      },
      editable: true,
      width: '30%',
    },
    {
      title: 'Image',
      dataIndex: 'Image',
      key: 'Image',
      render: (_: any, record: image) => {
        return (
          <Row style={{ justifyContent: 'center' }}>
            {record?.Image ? (
              <Image
                src={record?.Image}
                width={200}
                height={200}
                fallback={'Can display image!'}
              />
            ) : (
              <Text>Don't have image.</Text>
            )}
          </Row>
        );
      },
      editable: false,
      width: '50%',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: image) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record?.ID_IMG)}
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
              disabled={editingKey !== undefined}
              onClick={() => edit(record)}
            />
            <Button icon={<DeleteOutlined />} onClick={()=>hanlderDeleteImg(record?.ID_IMG, record?.ID_Room)}/>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columnImgs.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: image) => ({
        record,
        inputType: col.dataIndex === 'Image' ? 'text' : 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className={styles['images-room-manager']}>
      <Row className={styles['function-wrapper']}>
        <Space size={'middle'}>
          <Select
            className={clsx(styles['select-room'], styles['item'])}
            showSearch
            placeholder='Select a hotel'
            optionFilterProp='children'
            onChange={onChangeHotel}
            onSearch={onSearch}
          >
            {hotels?.map((h) => (
              <Option key={h.ID_Hotel} value={h?.ID_Hotel}>
                {h?.Hotel_Name}
              </Option>
            ))}
          </Select>

          <Select
            className={clsx(styles['select-room'], styles['item'])}
            showSearch
            placeholder='Select a room'
            optionFilterProp='children'
            onChange={onChangeRoom}
            onSearch={onSearch}
          >
            {rooms?.map((r) => (
              <Option key={r.ID_Room} value={r?.ID_Room}>
                {r?.Room_Name}
              </Option>
            ))}
          </Select>
        </Space>
      </Row>
      <Row className={styles['function-wrapper']}>
        <Button
          className={clsx(styles['btn-add'], styles['item'])}
          onClick={handleAdd}
          disabled={isDisableBtnAdd(idRoom, editingKey)}
          type='primary'
        >
          Add new image
        </Button>
      </Row>
      <MyEditTable
        mergedColumns={mergedColumns}
        data={imgs}
        cancel={cancel}
        form={form}
        EditableCell={EditableCell}
      />
      <ImageForm
        visible={visible}
        setVisible={setVisible}
        getImgs={getImgs}
        idHotel={idHotel}
        idRoom={idRoom}
        type='room'
      />
    </div>
  );
};

export default ImagesRoomManager;
