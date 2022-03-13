import { saveImg } from '../../../services/common.service';
import { FunctionComponent, useCallback, useState } from 'react';
import styles from './ImageForm.module.scss';
import { SUCCESS_CODE } from '../../constants';
import { openNotificationWithIcon } from '../../../utils/helpers';
import { Button, Form, Input, Modal, Row } from 'antd';
interface ImageFormProps {
  visible?: boolean;
  setVisible?: (val: boolean) => void;
  idHotel?:string;
  idRoom?: string;
  getImgs?: (val: string) => void;
}

const ImageForm: FunctionComponent<ImageFormProps> = (props) => {
  const { visible, setVisible, idHotel, idRoom, getImgs } = props;
  //////////////////////state
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  //////////////////////////event
  const handleOk = (values: any) => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible && setVisible(false);
      setConfirmLoading(false);
    }, 1000);
    saveImage(values);
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

  const saveImage = useCallback(
    async (values: any) => {
      const payload = {
        idHotel:idHotel,
        idRoom:idRoom,
        imgUrl: values?.Image
      };
      const respond = await saveImg(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
          openNotificationWithIcon('success', '', 'Add new image successfull1');
          getImgs && getImgs(idRoom || '');
        } else if (res?.data?.code !== SUCCESS_CODE || res?.data?.data) {
          openNotificationWithIcon('error', '', 'Add new image failed!');
        }
      } catch (error) {}
    },
    [getImgs, idRoom]
  );
  return (
    <div className={styles['image-form']}>
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
          <Form.Item
            label='Image link'
            name='Image'
            rules={[{ required: true, message: 'Please input image link!' }]}
          >
            <Input />
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

export default ImageForm;
