import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import styles from './RoomInforForm.module.scss';
import { SUCCESS_CODE } from '../../constants';
import {
  getIDRoomLastest,
  saveRoomInfor,
} from '../../../services/hotel.service';
import { typeRooms } from '../../../const/interface';
import {
  calcGuest,
  isMany,
  openNotificationWithIcon,
} from '../../../utils/helpers';
import {
  Badge,
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
} from 'antd';
import { useSelector } from 'react-redux';
import { constState } from '../../../store/reducer/constReducer';
const { Option } = Select;
interface RoomInforFormProps {
  visible?: boolean;
  setVisible?: (val: boolean) => void;
  idHotel?: string;
  getRooms?: (val: string) => void;
}

const RoomInforForm: FunctionComponent<RoomInforFormProps> = (props) => {
  const { visible, setVisible, idHotel, getRooms } = props;
  const typesRoom = useSelector(
    (state: { const: constState }) => state?.const?.typesRoom
  );
  ///////////////////////////state
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [idRoom, setidRoom] = useState<string>('');
  const [idTypeR, setIDTypeR] = useState<string>(typesRoom?.[0]?.ID_Type_Room!);
  const [guestN, setGuestN] = useState<number>(1);
  //////////////////////////event
  const handleOk = (values: any) => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible && setVisible(false);
      setConfirmLoading(false);
    }, 1000);
    saveRoom(idHotel || '', values);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible && setVisible(false);
  };
  //form event
  const onFinish = (values: any) => {
    console.log('Success:', values);
    handleOk(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const saveRoom = useCallback(
    async (idHotel: string, values: any) => {
      const payload = {
        idHotel: idHotel,
        roomName: values?.roomName,
        bedNumber: values?.bedNumber,
        bathNumber: values?.bathNumber,
        price: values?.price,
        idType: values?.ID_Type_Room,
        idStatus: values?.idStatus === 'Non-active' ? 2 : 1,
      };
      const respond = await saveRoomInfor(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
          openNotificationWithIcon('success', '', 'Add new hotel successfull1');
          getRooms && getRooms(idHotel || '');
        } else if (res?.data?.code !== SUCCESS_CODE || res?.data?.data) {
          openNotificationWithIcon('error', '', 'Add new hotel failed!');
        }
      } catch (error) {}
    },
    [getRooms]
  );

  const getRoomIDLastest = useCallback(async () => {
    const respond = await getIDRoomLastest();
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setidRoom(res?.data?.data);
      }
    } catch (error) {}
  }, []);

  const handlerChange = (val: any) => {
    setIDTypeR(val);
  };
  const handlerSetGN = (val: any) => {
    setGuestN(val);
  };
  useEffect(() => {
    getRoomIDLastest();
  }, [getRoomIDLastest]);

  const setMaxMinRoom = (idTypeR?: string) => {
    switch (idTypeR) {
      case 'SIN':
        return { bedMax: 1, bathMax: 1, priceMin: 10 };
      case 'MED':
        return { bedMax: 2, bathMax: 2, priceMin: 25 };
      case 'LUX':
        return { bedMax: 4, bathMax: 3, priceMin: 50 };
      default:
        return { bedMax: 1, bathMax: 1, priceMin: 10 };
    }
  };
  const isSINOrDOU = (guestN?: number) => {
    return guestN && guestN >= 2 ? 'double' : 'single';
  };
  return (
    <div className={styles['room-infor-form']}>
      <Modal
        title={'Room information'}
        visible={visible}
        onOk={onFinish}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        centered
        destroyOnClose
        footer={null}
      >
        <Form
          name='room-information'
          preserve={false}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Row>
            <Space size={'middle'}>
              <Form.Item
                label='ID Room'
                name='idRooml'
                initialValue={idRoom}
                // rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input readOnly value={idHotel} />
              </Form.Item>

              <Form.Item
                label='Room Name'
                name='roomName'
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please input room name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Space>
          </Row>

          <Row>
            <Space size={'middle'}>
              <Form.Item
                label='Type'
                name='ID_Type_Room'
                initialValue={idTypeR}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please select room's type room!",
                  },
                ]}
              >
                <Select style={{ width: 120 }} onChange={handlerChange}>
                  {typesRoom?.map((t, index) => (
                    <Option
                      key={t.ID_Type_Room! + index}
                      value={t?.ID_Type_Room}
                    >
                      {t?.Type_Room_Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label={`Guest Number(${calcGuest(guestN)} ${isSINOrDOU(guestN)} bed${isMany(
                  calcGuest(guestN)
                )})`}
                name='bedNumber'
                initialValue={1}
                // hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please input bed number!',
                  },
                  () => ({
                    validator(_, value) {
                      if (!value || value <= setMaxMinRoom(idTypeR)?.bedMax) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Not allow!'));
                    },
                  }),
                ]}
              >
                <InputNumber
                  max={setMaxMinRoom(idTypeR)?.bedMax}
                  min={1}
                  onChange={handlerSetGN}
                />
              </Form.Item>

              <Form.Item
                label='Bath Number'
                name='bathNumber'
                initialValue={1}
                // hasFeedback
                rules={[
                  { required: true, message: 'Please input bath number!' },
                  () => ({
                    validator(_, value) {
                      if (!value || value <= setMaxMinRoom(idTypeR)?.bathMax) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Not allow!'));
                    },
                  }),
                ]}
              >
                <InputNumber max={setMaxMinRoom(idTypeR)?.bathMax} min={1} />
              </Form.Item>
            </Space>
          </Row>

          <Row>
            <Space>
              <Form.Item
                label='Price'
                name='price'
                initialValue={setMaxMinRoom(idTypeR)?.priceMin}
                rules={[
                  { required: true, message: 'Please input price!' },
                  () => ({
                    validator(_, value) {
                      if (!value || value >= setMaxMinRoom(idTypeR)?.priceMin) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Not allow!'));
                    },
                  }),
                ]}
              >
                <InputNumber
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  // parser={value:number => value.replace(/\$\s?|(,*)/g, '')}
                  max={10000}
                  min={setMaxMinRoom(idTypeR)?.priceMin}
                />
              </Form.Item>
              <Form.Item
                label='Status'
                name='idStatus'
                initialValue={'Non-active'}
              >
                <InputNumber readOnly style={{ width: 100 }} />
              </Form.Item>
            </Space>
          </Row>

          <Row
            className={styles['btn-wrapper']}
            style={{ justifyContent: 'flex-end', alignItems: 'center' }}
          >
            <Form.Item
              className={styles['btn-form']}
              style={{ marginLeft: '20px' }}
            >
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
            <Form.Item
              className={styles['btn-form']}
              style={{ marginLeft: '20px' }}
            >
              <Button key='back' onClick={handleCancel}>
                Cancel
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default RoomInforForm;
