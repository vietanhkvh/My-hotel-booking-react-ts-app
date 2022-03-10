import { Button, Col, Image, Radio, Rate, Row, Space, Typography } from 'antd';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import CustomerInforForm from '../CustomerInforForm/CustomerInforForm';
import styles from './CustomerInfor.module.scss';
import { hotelSearching } from '../../../const/interface';
import HotelImg from '../../../assest/images/hotel.jpg';
import { DATE_FORMAT } from '../../constants';
const { Text, Title } = Typography;
interface CustomerInforProps {
  /**
   * hotel information
   */
  hotelInfor?: hotelSearching;
  /**
   * date in
   */
  dateIn?: any;
  /**
   * date out
   */
  dateOut?: any;
  /**
   * date gap
   */
  dateGap?: number;
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
  const { hotelInfor, dateIn, dateOut, dateGap, userInfor } = props;
  /////////state
  /////////event

  return (
    <Col span={12} className={styles['customer-infor']}>
      <Row className={styles['infor-member']}>
        <Col span={6} className={styles['image']}>
          {hotelInfor?.Image ? (
            <Image src={hotelInfor?.Image} preview={false} />
          ) : (
            <Image src={HotelImg} preview={false} />
          )}
        </Col>
        <Col span={18} className={styles['hotel']}>
          <Title className={styles['hotel-name']} level={5}>
            {hotelInfor?.Hotel_Name}
          </Title>
          <Row>
            <Rate
              disabled
              style={{ fontSize: 14 }}
              allowHalf
              defaultValue={
                hotelInfor?.Rating_Point && hotelInfor?.Rating_Point
              }
            />
            <Text>({hotelInfor?.Rating_Point})</Text>
          </Row>
          <Row className={styles['date']}>
            <Col span={8} className={styles['date-item']}>
              <Title className={styles['title']} level={5}>
                Check-in date
              </Title>
              <Text className={styles['conent']}>
                {dateIn.format(DATE_FORMAT)}
              </Text>
            </Col>
            <Col span={8} className={styles['date-item']}>
              <Title className={styles['title']} level={5}>
                Check-out date
              </Title>
              <Text className={styles['conent']}>
                {dateOut.format(DATE_FORMAT)}
              </Text>
            </Col>
            <Col span={8} className={styles['date-item']}>
              <Title className={styles['title']} level={5}>
                Night number
              </Title>
              <Text className={styles['conent']}>{dateGap}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={styles['infor-member']}>
        <CustomerInforForm userInfor={userInfor}/>
      </Row>
    </Col>
  );
};

export default CustomerInfor;
