import { Col, Row } from 'antd';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import CustomerInforForm from '../CustomerInforForm/CustomerInforForm';
import styles from './CustomerInfor.module.scss';
import { hotelSearching } from '../../../const/interface';

interface CustomerInforProps {
  /**
   * hotel information
   */
  hotelInfor?: hotelSearching;
  /**
   * setIsOpenLogin
   */
  setIsOpenLogin?: (val: boolean) => void;
  /**
   * userInfor
   */
  userInfor?:any;
}

const CustomerInfor: FunctionComponent<CustomerInforProps> = (props) => {
  const { userInfor,setIsOpenLogin } = props;
  /////////state
  /////////event

  return (
    <Col span={12} className={styles['customer-infor']}>
      <Row className={styles['infor-member']}>
        <CustomerInforForm userInfor={userInfor} setIsOpenLogin={setIsOpenLogin}/>
      </Row>
    </Col>
  );
};

export default CustomerInfor;
