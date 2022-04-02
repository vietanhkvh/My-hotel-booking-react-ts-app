import { hotel, image } from '../../../const/interface';
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import clsx from 'clsx';
import {
  Dispatch,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  EditFilled,
  DeleteOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import styles from './ImagesManager.module.scss';
import MyEditTable from '../../../components/common/MyEditTable/MyEditTable';
import { getHotelTableForHost } from '../../../services/hotel.service';
import { setHotelManager } from '../../../store/actions/constAction';
import { some, SUCCESS_CODE } from '../../../components/constants';
import { getImgHotel, updateImg } from '../../../services/common.service';
import { userState } from '../../../store/reducer/userReducer';
import { isDisableBtnAdd, openNotificationWithIcon } from '../../../utils/helpers';
import ImageForm from '../../../components/common/ImageForm/ImageForm';
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

interface ImagesManagerProps {}

const ImagesManager: FunctionComponent<ImagesManagerProps> = () => {
  const userInfor = useSelector(
    (state: { user: userState }) => state?.user?.userInfor
  );
  const dispatch: Dispatch<any> = useDispatch();
  ///////////////////////states

  const [form] = Form.useForm();

  const [imgs, setImgs] = useState<any[]>([]);

  // const [typesRoom, setTypesRoom] = useState<typeRooms[]>();

  const [idHotel, setIDHotel] = useState<string>('');

  const [hotels, setHotels] = useState<hotel[]>([]);

  const [editingKey, setEditingKey] = useState<number>();

  const [visible, setVisible] = useState<boolean>(false);

  const isEditing = (record: image) => record.ID_IMG === editingKey;

  ///////////////////////event
  function onChange(value) {
    console.log(`selected ${value}`);
    getImgs(value);
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

  const getImgs = useCallback(async (idHotel?: string) => {
    const payload = {
      idHotel: idHotel,
    };
    const respond = await getImgHotel(payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setImgs(res?.data?.data);
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    getHotelList(userInfor?.ID_Account);
  }, [getHotelList, userInfor?.ID_Account]);

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
          getImgs(idHotel);
          return true;
        } else {
          openNotificationWithIcon('error', '', 'Update image failed!');
          return false;
        }
      } catch (error) {}
    },
    [getImgs, idHotel]
  );
  const deleteImgs = useCallback(async (idImg?: number, idHotel?:string) => {
    const payload: some = {
      idImg: idImg,
    };
    const respond = await deleteImage(payload);
    try {
      const res = respond;
      if (res?.data?.code === SUCCESS_CODE && res?.data?.data === 1) {
        const message = 'Remove image with id: ' + idImg + ' successfull!';
        openNotificationWithIcon('success', '', message);
        getImgs(idHotel);
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

  const hanlderDeleteImg=useCallback((idImg?:number, idHotel?:string)=>{
    deleteImgs(idImg,idHotel)
  },[deleteImgs])
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
        return <Text>{record?.Image}</Text>;
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
                width={100}
                height={100}
                fallback={'Can display image!'}
              />
            ) : (
              <Text>Don't have image yet.</Text>
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
            <Button icon={<DeleteOutlined />} onClick={()=>hanlderDeleteImg(record?.ID_IMG, record?.ID_Hotel)}/>
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
    <div className={styles['images-manager']}>
      <Row className={styles['function-wrapper']}>
        <Select
          className={clsx(styles['select-room'], styles['item'])}
          showSearch
          // defaultValue={hotelManager?.[0]?.ID_Hotel||''}
          placeholder='Select a hotel'
          optionFilterProp='children'
          onChange={onChange}
          onSearch={onSearch}
        >
          {hotels?.map((h) => (
            <Option key={h.ID_Hotel} value={h?.ID_Hotel}>
              {h?.Hotel_Name}
            </Option>
          ))}
        </Select>
        <Button
          className={clsx(styles['btn-add'], styles['item'])}
          onClick={handleAdd}
          disabled={isDisableBtnAdd(idHotel,editingKey)}
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
        idRoom={''}
        type='hotel'
      />
    </div>
  );
};

export default ImagesManager;
