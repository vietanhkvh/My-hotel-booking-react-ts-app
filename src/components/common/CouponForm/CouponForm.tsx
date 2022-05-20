import { DATE_FORMAT, DATE_FORMAT_BACK_END, SUCCESS_CODE } from '../../../components/constants';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
} from 'antd';
import moment from 'moment';
import { FunctionComponent, useCallback, useState } from 'react';
import styles from './CouponForm.module.scss';
import { coupon } from '../../../const/interface';
import { saveCoupon } from '../../../services/coupon.service';
import { openNotificationWithIcon } from '../../../utils/helpers';
import { useSelector } from 'react-redux';
import { constState } from '@src/store/reducer/constReducer';
const { RangePicker } = DatePicker;
const {Option}= Select;
interface CouponFormProps {
  visible?: boolean;
  setVisible?: (val: boolean) => void;
  idHotel?: string;
  getCoupons?: (val: string) => void;
}

const CouponForm: FunctionComponent<CouponFormProps> = (props) => {
  const { visible, setVisible, idHotel, getCoupons } = props;
  const typesRoom = useSelector(
    (state: { const: constState }) => state?.const?.typesRoom
  );
  //////////////////////state
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const [dateStart, setDateStart] = useState<any>(moment());
  const [dateEnd, setDateEnd] = useState<any>(moment().add('1', 'days'));

  //////////////////////////event
  const handleOk = (values: any) => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible && setVisible(false);
      setConfirmLoading(false);
    }, 1000);
    saveCouponIF(values);
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

  const hanldeSetDate = (date: any) => {
    setDateStart(date?.[0]);
    setDateEnd(date?.[1]);
  };
  const disabledDate = (current: any) => {
    // Can not select days before today
    return current && current < moment().add('-1', 'days').endOf('day');
  };
  const callSaveCouponInfor=useCallback(
    async (couponInfor:any, idHotel?:string) => {
      const payload = {
        idHotel: idHotel,
        name: couponInfor?.name,
        value: couponInfor?.value,
        startDate: moment(dateStart).format(DATE_FORMAT_BACK_END),
        endDate: moment(dateEnd).format(DATE_FORMAT_BACK_END),
        typeRoom: couponInfor?.typeRoom
      };
      const respond = await saveCoupon(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
          const message =
            'Add new coupon successfull!';
          openNotificationWithIcon('success', '', message);
          getCoupons&&getCoupons(idHotel||"");
        } else {
          openNotificationWithIcon(
            'error',
            '',
            'Add new coupon failed!'
          );
        }
      } catch (error) {
        openNotificationWithIcon(
          'error',
          '',
          'Add new coupon failed!'
        );
      }
    },
    [dateEnd, dateStart, getCoupons]
  );
  const saveCouponIF = (val: any) => {
    callSaveCouponInfor(val, idHotel)
  };
  return (
    <div className={styles['coupon-form']}>
      <Modal
        title={'Image information'}
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
                label='Name'
                name='name'
                // initialValue={}
                rules={[
                  { required: true, message: 'Please input name coupon!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Value'
                name='value'
                hasFeedback
                initialValue={1}
                rules={[
                  {
                    required: true,
                    message: 'Please input value!',
                  },
                ]}
              >
                <InputNumber
                  max={99}
                  min={1}
                  formatter={(value) => `${value}%`}
                />
              </Form.Item>

              <Form.Item
                label='Type room'
                name='typeRoom'
                hasFeedback
                initialValue={'LUX'}
                rules={[
                  {
                    required: true,
                    message: 'Please input value!',
                  },
                ]}
              >
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
              </Form.Item>
            </Space>
          </Row>

          <Row>
            <Space size={'middle'}>
              <Form.Item
                label='Start date - End date'
                name='rangeDate'
                hasFeedback
                initialValue={[moment(), moment().add('1', 'days')]}
                rules={[
                  {
                    required: true,
                    message: 'Please select start and end date!',
                  },
                ]}
              >
                <RangePicker
                  className={styles['date-picker']}
                  allowEmpty={[false, false]}
                  // defaultValue={[moment(), moment().add('1', 'days')]}
                  // defaultPickerValue={[moment(), moment().add('1', 'days')]}
                  disabledDate={disabledDate}
                  picker='date'
                  format={DATE_FORMAT}
                  size='middle'
                  onChange={(date) => hanldeSetDate(date)}
                />
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

export default CouponForm;
