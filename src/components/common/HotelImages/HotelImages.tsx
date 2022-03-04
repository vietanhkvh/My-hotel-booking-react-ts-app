import { Row } from 'antd';
import { FunctionComponent, useState } from 'react';
import SlickImages from '../SlickImages/SlickImages';
import styles from './HotelImages.module.scss';
interface HotelImagesProps {}
const HotelImages: FunctionComponent<HotelImagesProps> = () => {
  ////////////////////state
  const [hotelImg, setHotelImg]= useState<any[]>([]);
 ///////////////////////event

  return (
    <Row className={styles['hotel-images']}>
      <SlickImages images={hotelImg} type='hotel'/>
    </Row>
  );
};

export default HotelImages;
