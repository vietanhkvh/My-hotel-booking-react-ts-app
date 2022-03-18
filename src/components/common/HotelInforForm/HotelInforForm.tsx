import { SUCCESS_CODE } from '../../constants';
import { getIDHotelLastest, saveHotelInfor } from '../../../services/hotel.service';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
} from 'antd';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import styles from './HotelInforForm.module.scss';
import { useSelector } from 'react-redux';
import { userState } from '@src/store/reducer/userReducer';
import { openNotificationWithIcon } from '../../../utils/helpers';

interface HotelInforFormProps {
  visible?: boolean;
  setVisible?: (val: boolean) => void;
  getHotelList?: (val?:number, val1?:any )=> void;
  idStatus?:number;
}

const HotelInforForm: FunctionComponent<HotelInforFormProps> = (props) => {
  const { visible, setVisible, getHotelList, idStatus } = props;
  const userInfor = useSelector(
    (state: { user: userState }) => state.user?.userInfor
  );
  ///////////////////////////state
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [idHotel, setidHotel] = useState<string>('')
  //////////////////////////event
  const handleOk = (values:any) => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible && setVisible(false);
      setConfirmLoading(false);
    }, 1000);
    saveHotel(values)
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
  const saveHotel = useCallback(async(values:any)=>{
     const payload={
      idHotel: values?.idHotel,
      hotelName: values?.hotelName,
      city: values?.city,
      district: values?.district,
      ward: values?.ward,
      street: values?.street,
      phone: values?.phone,
      idStatus: values?.idStatus,
      idAccount: userInfor?.ID_Account
     }

    const respond= await saveHotelInfor(payload)
    try {
      const res = await respond
      if(res?.data?.code===SUCCESS_CODE){
        openNotificationWithIcon('success', '', 'Add new hotel successfull1');
        getHotelList&&getHotelList(userInfor?.ID_Account, idStatus )
      }
      else{
        openNotificationWithIcon('error', '', 'Add new hotel failed!');

      }
    } catch (error) {
      
    }
  },[getHotelList, idStatus, userInfor?.ID_Account])
  const getHotelIDLastest=useCallback(async()=>{
    const respond= await getIDHotelLastest();
    try {
      const res= await respond;
      if(res?.data?.code===SUCCESS_CODE){
        setidHotel(res?.data?.data)
      }
    } catch (error) {
      
    }
  },[])
  useEffect(()=>{
    getHotelIDLastest()
  },[getHotelIDLastest])
  return (
    <div className={styles['hotel-infor-form']}>
      {console.log('idHotel', idHotel)}
      <Modal
        title={'Hotel information'}
        visible={visible}
        onOk={onFinish}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        centered
        destroyOnClose
        footer={null}
      >
        <Form
          name='Hotel-information'
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
                label='ID Hotel'
                name='idHotel'
                initialValue={idHotel}
                // rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input readOnly value={idHotel} />
              </Form.Item>

              <Form.Item
                label='Status'
                name='idStatus'
                initialValue={2}
                // rules={[{ required: true, message: "Please input hotel's ward!" }]}
              >
                <Input readOnly />
              </Form.Item>
            </Space>
          </Row>

          <Row>
            <Space size={'middle'}>
              <Form.Item
                label='Name'
                name='hotelName'
                rules={[
                  {
                    required: true,
                    message: "Please input hotel's hotel name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Phone'
                name='phone'
                rules={[
                  { required: true, message: "Please input hotel's phone!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Space>
          </Row>

          <Row>
            <Space size={'middle'}>
              <Form.Item
                label='City'
                name='city'
                rules={[
                  { required: true, message: "Please input hotel's city!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='District'
                name='district'
                rules={[
                  { required: true, message: "Please input hotel's district!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Space>
          </Row>

          <Row>
            <Space size={'middle'}>
              <Form.Item
                label='Ward'
                name='ward'
                rules={[
                  { required: true, message: "Please input hotel's ward!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Street'
                name='street'
                rules={[
                  { required: true, message: "Please input hotel's street!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Space>
          </Row>

          <Row className={styles['btn-wrapper']} style={{justifyContent:'flex-end', alignItems:'center'}}>
            <Form.Item className={styles['btn-form']} style={{marginLeft:'20px'}}>
              <Button type='primary' htmlType='submit' >
                Submit
              </Button>
            </Form.Item>
            <Form.Item className={styles['btn-form']} style={{marginLeft:'20px'}}>
              <Button key='back' onClick={handleCancel} >
                Cancel
              </Button>
            </Form.Item>

          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default HotelInforForm;
