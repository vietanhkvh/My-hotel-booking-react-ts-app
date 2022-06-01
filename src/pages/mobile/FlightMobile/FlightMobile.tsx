import { Button, Col, Image, Row, Typography } from 'antd';
import { FunctionComponent, useState } from 'react';
import styles from './FlightMobile.module.scss';
import LeftArrow from '../../../assest/icons/left-arrow-24.png';
// import Swap from '../../../assest/icons/swap-flight-32.png';
import clsx from 'clsx';
import moment from 'moment';
import { CalendarOutlined } from '@ant-design/icons';
// import ServiceClass from '../../../assest/icons/service-class-flight';
// import Passenger from '../../../assest/icons/passenger';
// import Searching from '../../../assest/icons/searching';
import { useNavigate } from 'react-router-dom';
import { city } from './dataRaw';
// import PopupLayer from '../../../components/mobile/PopupLayer/PopupLayer';
// import FlightCity from '../FlightCity/FlightCity';
import FlightSearching from '../../../components/common/FlightSearching/FlightSearching';
const { Text } = Typography;
interface FlightMobileProps {
  /**
   * mobile ver
   */
  isMobile?: boolean;
}

const FlightMobile: FunctionComponent<FlightMobileProps> = () => {
  const navigate = useNavigate();
  ////////////////states

  ////display state

  ///////////////func

  ///////////////events
  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles['flight-mobile']}>
      <div className={styles['header']}>
        <Button className={styles['btn-back']} onClick={handleClickBack}>
          <Image src={LeftArrow} preview={false} />
        </Button>
        <Text className={clsx(styles['text'], styles['text-large'])}>
          Flights
        </Text>
        <Text className={clsx(styles['text'], styles['text-medium'])}>
          Order cheap and promotional airline tickets
        </Text>
      </div>
      <Row className={styles['main']}>
        <FlightSearching isMoblie={true} />
      </Row>
    </div>
  );
};

export default FlightMobile;
