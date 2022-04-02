import { Button, Form, Input, Modal, Rate, Row } from 'antd';
import { FunctionComponent, useCallback } from 'react';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import styles from './RatingForm.module.scss';
import { saveRating } from '../../../services/common.service';
import { SUCCESS_CODE } from '../../../components/constants';
import { openNotificationWithIcon } from '../../../utils/helpers';
const { TextArea } = Input;
interface RatingFormProps {
  visible?: boolean;
  setVisible?: (val: boolean) => void;
  getPayment?: (val1?: number, val2?: number) => void;
  ID_Account?: number;
  idStatus?: number;
  idPaymentD?: string;
  hotelName?: string;
}

const RatingForm: FunctionComponent<RatingFormProps> = (props) => {
  const {
    visible,
    setVisible,
    getPayment,
    ID_Account,
    idStatus,
    idPaymentD,
    hotelName,
  } = props;
  ////////////////////state

  ///////////////////api
  const handleCancel = useCallback(async () => {
    console.log('Clicked cancel button');
    setVisible && setVisible(false);
  }, [setVisible]);

  const saveRatingInfor = useCallback(
    async (idPaymentD?: string, vals?: any, hotelName?: string) => {
      const payload = {
        idPaymentD: idPaymentD,
        rateCounting: vals?.rateCounting,
        rateDetail: vals?.rateDetail,
      };
      console.log('hotelName-rating',hotelName)
      const respond = await saveRating(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
          const message =
            'Add rating for ' + hotelName + ' successfull!';
          openNotificationWithIcon('success', '', message);
          getPayment && getPayment(ID_Account, idStatus);
          handleCancel();
        } else {
          openNotificationWithIcon(
            'error',
            '',
            'Add rating for ' + hotelName + ' failed'
          );
        }
      } catch (error) {
        openNotificationWithIcon(
          'error',
          '',
          'Add rating for ' + hotelName + ' failed'
        );
      }
    },
    [ID_Account, getPayment, handleCancel, idStatus]
  );
  ////////////////////event
  const onFinish = (values: any) => {
    console.log('Success:', values);
    console.log('hotelName-rating',hotelName)
    saveRatingInfor(idPaymentD, values, hotelName);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles['rating-form']}>
      <Modal
        title={'Rating information'}
        visible={visible}
        onOk={onFinish}
        onCancel={handleCancel}
        centered
        destroyOnClose
        footer={null}
      >
        <Form
          name='room-information'
          preserve={false}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='Rate'
            name='rateCounting'
            initialValue={5}
            rules={[{ required: true, message: 'Please input image link!' }]}
          >
            <Rate
              allowClear={false}
              allowHalf
              style={{ backgroundColor: '#fafafa' }}
              // character={({ index }) => customIcons[index + 1]}
            />
          </Form.Item>
          <Form.Item
            label='Detail'
            name='rateDetail'
            rules={[{ required: true, message: 'Please input image link!' }]}
          >
            <TextArea
              placeholder='write your feeling and feedback here!'
              allowClear
            />
          </Form.Item>
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
              <Button key='cancel' onClick={handleCancel}>
                Cancel
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default RatingForm;
