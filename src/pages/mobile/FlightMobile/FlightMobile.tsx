import { Button, Image, Row, Typography } from 'antd';
import { FunctionComponent } from 'react';
import styles from './FlightMobile.module.scss';
import LeftArrow from '../../../assest/icons/left-arrow-24.png';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import FlightSearching from '../../../components/common/FlightSearching/FlightSearching';
import DiscoverMob from '../../../components/mobile/DiscoverMob/DiscoverMob';
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
        <DiscoverMob />
      </Row>
    </div>
  );
};

export default FlightMobile;
