import MyEditTable from '../../../components/common/MyEditTable/MyEditTable';
import { coupon, hotel } from '../../../const/interface';
import {
  Badge,
  Button,
  DatePicker,
  Form,
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
import {
  EditFilled,
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import styles from './CouponManager.module.scss';
import { getHotelTableForHost } from '../../../services/hotel.service';
import { setHotelManager } from '../../../store/actions/constAction';
import {
  DATE_FORMAT_BACK_END,
  SUCCESS_CODE,
} from '../../../components/constants';
import {
  getListCouponHotel,
  updateCoupon,
} from '../../../services/coupon.service';
import { useDispatch, useSelector } from 'react-redux';
import { userState } from '@src/store/reducer/userReducer';
import moment from 'moment';
import CouponForm from '../../../components/common/CouponForm/CouponForm';
import {
  isDisableBtnAdd,
  openNotificationWithIcon,
} from '../../../utils/helpers';
import { constState } from '@src/store/reducer/constReducer';
const { Option } = Select;
const { Text } = Typography;

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
  const typesRoom = useSelector(
    (state: { const: constState }) => state?.const?.typesRoom
  );
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const switchInputNode = (inputType: string) => {
    switch (inputType) {
      case 'number':
        return <InputNumber min={1} max={9999} />;
      case 'datePicker':
        return <DatePicker onChange={handleChange} />;
      case 'selectSts':
        return (
          <Select defaultValue={1} style={{ width: 120 }}>
            <Option key={'active'} value={1}>
              Active
            </Option>
            <Option key={'non-active'} value={2}>
              Non-active
            </Option>
          </Select>
        );
      case 'selectTR':
        return (
          <Select style={{ width: 120 }}>
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
  // const inputNode1 = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          // initialValue={dataIndex==='State_Date'? moment(record[dataIndex]) : record[dataIndex]}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
          {/* {inputNode1} */}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

interface CouponManagerProps {}

const CouponManager: FunctionComponent<CouponManagerProps> = () => {
  const userInfor = useSelector(
    (state: { user: userState }) => state?.user?.userInfor
  );
  const dispatch: Dispatch<any> = useDispatch();
  const typesRoom = useSelector(
    (state: { const: constState }) => state?.const?.typesRoom
  );
  ///////////////////////states

  const [form] = Form.useForm();

  const [hotels, setHotels] = useState<hotel[]>([]);

  const [idHotel, setIDHotel] = useState<string>('');

  const [coupons, setCoupons] = useState<coupon[]>([]);

  const [editingKey, setEditingKey] = useState<number>();

  const [visible, setVisible] = useState<boolean>(false);

  const isEditing = (record: coupon) => record.ID_Coupon === editingKey;

  ///////////////////////event
  function onChange(value) {
    console.log(`selected ${value}`);
    getCoupons(value);
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
  const getCoupons = useCallback(async (idHotel?: string) => {
    const payload = {
      idHotel: idHotel,
    };
    const respond = await getListCouponHotel(payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setCoupons(res?.data?.data);
      }
    } catch (error) {}
  }, []);
  useEffect(() => {
    getHotelList(userInfor?.ID_Account);
  }, [getHotelList, userInfor?.ID_Account]);

  const updateCouponInfor = useCallback(
    async (ID_Coupon: string, couponInfor: coupon) => {
      const payload = {
        idCoupon: ID_Coupon,
        name: couponInfor.Name,
        value: couponInfor.Value,
        startDate: couponInfor.State_Date,
        endDate: couponInfor.End_Date,
        idStatus: couponInfor.ID_Status,
        typeRoom: couponInfor?.ID_Type_Room,
      };
      const respond = await updateCoupon(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE && res?.data?.data === 1) {
          const message =
            'Update coupon with id: ' + ID_Coupon + ' successfull!';
          openNotificationWithIcon('success', '', message);
          getCoupons(couponInfor?.ID_Hotel);
          return true;
        } else {
          openNotificationWithIcon(
            'error',
            '',
            'Update coupon with id: ' + ID_Coupon + ' failed'
          );
          return false;
        }
      } catch (error) {
        openNotificationWithIcon(
          'error',
          '',
          'Update coupon with id: ' + ID_Coupon + ' failed'
        );
      }
    },
    [getCoupons]
  );
  ////////////////////////////////component
  const edit = (record: Partial<coupon>) => {
    form.setFieldsValue({
      ID_Coupon: null,
      ID_Hotel: '',
      Name: '',
      Value: null,
      Start_Date: null,
      End_Date: null,
      ID_Status: null,
      ...record,
    });
    setEditingKey(record?.ID_Coupon || undefined);
  };
  const cancel = () => {
    setEditingKey(undefined);
  };

  const save = async (ID_Coupon: any) => {
    try {
      const row = (await form.validateFields()) as coupon;

      const newData = [...coupons];
      const index = newData.findIndex((item) => ID_Coupon === item.ID_Coupon);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log('coupon', row);
        if (await updateCouponInfor(ID_Coupon, row)) {
          setCoupons(newData);
        }
        setEditingKey(undefined);
      } else {
        newData.push(row);
        setCoupons(newData);
        setEditingKey(undefined);
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columnCoupon = [
    {
      title: 'ID Coupon',
      dataIndex: 'ID_Coupon',
      key: 'ID_Coupon',
      render: (text) => <Text>{text}</Text>,
      editable: false,
      ellipsis: true,
    },
    {
      title: 'ID Hotel',
      dataIndex: 'ID_Hotel',
      key: 'ID_Hotel',
      render: (text: string) => {
        return <Text>{text}</Text>;
      },
      editable: true,
      ellipsis: true,
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      render: (text: string) => <Text>{text}</Text>,
      editable: true,
      ellipsis: true,
    },
    {
      title: 'Value',
      dataIndex: 'Value',
      key: 'Value',
      render: (text: string) => <Text>{text}%</Text>,
      editable: true,
      ellipsis: true,
    },
    {
      title: 'Start date',
      dataIndex: 'State_Date',
      key: 'State_Date',
      render: (_: any, record: coupon) => {
        // const dateObj = new Date(record?.State_Date);
        return (
          <>
            <Text>{record?.State_Date}</Text>
          </>
        );
      },
      editable: true,
      ellipsis: true,
    },
    {
      title: 'End date',
      dataIndex: 'End_Date',
      key: 'End_Date',
      editable: true,
      ellipsis: true,
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
      editable: true,
    },
    {
      title: 'Type Room',
      dataIndex: 'ID_Type_Room',
      key: 'ID_Type_Room',
      render: (val: string) => <Text>{val}</Text>,
      editable: true,
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: coupon) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record?.ID_Coupon)}
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
            {/* <Button icon={<DeleteOutlined />} /> */}
          </Space>
        );
      },
    },
  ];

  const switchInputType = (dataIndex: string) => {
    switch (dataIndex) {
      // case 'State_Date':
      //   return 'datePicker';
      // case 'End_Date':
      //   return 'datePicker';
      case 'Value':
        return 'number';
      case 'ID_Status':
        return 'selectSts';
      case 'ID_Type_Room':
        return 'selectTR';
      default:
        return 'text';
    }
  };

  const mergedColumns = columnCoupon.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: coupon) => ({
        record,
        inputType: switchInputType(col.dataIndex),
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className={styles['coupon-manager']}>
      <Row className={styles['function-wrapper']}>
        <Select
          className={clsx(styles['select-room'], styles['item'])}
          showSearch
          placeholder='Select a hotel'
          optionFilterProp='children'
          defaultValue={hotels?.[0]?.ID_Hotel}
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
          disabled={isDisableBtnAdd(idHotel, editingKey)}
          type='primary'
        >
          {console.log('isDisableBtnAdd', isDisableBtnAdd(idHotel, editingKey))}
          Add new coupon
        </Button>
      </Row>
      <MyEditTable
        mergedColumns={mergedColumns}
        data={coupons}
        cancel={cancel}
        form={form}
        EditableCell={EditableCell}
      />
      <CouponForm
        visible={visible}
        setVisible={setVisible}
        getCoupons={getCoupons}
        idHotel={idHotel}
      />
    </div>
  );
};

export default CouponManager;
