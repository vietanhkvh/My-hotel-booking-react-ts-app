import { Button, Col, Image, Row, Typography, Switch } from 'antd';
import { FunctionComponent, useState } from 'react';
import styles from './FlightMobile.module.scss';
import LeftArrow from '../../../assest/icons/left-arrow-24.png';
import Swap from '../../../assest/icons/swap-flight-32.png';
import clsx from 'clsx';
import moment from 'moment';
import { CalendarOutlined } from '@ant-design/icons';
import ServiceClass from '../../../assest/icons/service-class-flight';
import Passenger from '../../../assest/icons/passenger';
import Searching from '../../../assest/icons/searching';
import { useNavigate } from 'react-router-dom';
import { city } from './dataRaw';
import { Title } from 'chart.js';
import PopupLayer from '../../../components/mobile/PopupLayer/PopupLayer';
import FlightCity from '../FlightCity/FlightCity';
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
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);

  const [cityFrom, setCityFrom] = useState<{ id: string; text: string }>(
    city[0]
  );
  const [cityTo, setCityTo] = useState<{ id: string; text: string }>(city[1]);

  const today = moment();
  const [dateIn, setDateIn] = useState<string>(
    moment().format('ddd, MMMM Do, YYYY')
  );
  const [dateReturn, setDateReturn] = useState<string>(
    moment().add(1, 'days').format('ddd, MMMM Do, YYYY')
  );
  const [passengers, setPassengers] = useState<number>(1);
  const [service, setService] = useState<string>('All');

  ////display state
  const [isPopupCity, setIsPopupCity] = useState<boolean>(false);

  ///////////////func
  const displayReturn = (isRoundTrip) => {
    return isRoundTrip ? (
      <Row className={styles['searching-item']}>
        <Col
          span={24}
          className={clsx(styles['item'], styles['left-container'])}
        >
          <Text>Return date</Text>
          <Button className={styles['btn']} icon={<CalendarOutlined />}>
            <Text className={styles['content-text']}> {dateReturn}</Text>
          </Button>
        </Col>
      </Row>
    ) : (
      <></>
    );
  };
  ///////////////events
  const handleRoundTrip = () => {
    setIsRoundTrip(!isRoundTrip);
  };
  const handleClickBack = () => {
    navigate(-1);
  };
  const handleSwap = () => {
    if (cityFrom && cityTo) {
      setCityFrom(cityTo);
      setCityTo(cityFrom);
    }
  };
  const handleClickCity = () => {
    setIsPopupCity(true);
  };
  const handleClosePopup = () => {
    setIsPopupCity(false);
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
        <Row className={clsx(styles['inner'], styles['searching'])}>
          <Row className={styles['searching-item']}>
            <Col
              className={clsx(styles['item'], styles['left-container'])}
              span={10}
            >
              <Text>From</Text>
              <Button
                className={clsx(
                  styles['btn'],
                  styles['location'],
                  styles['from']
                )}
                onClick={handleClickCity}
              >
                <Text
                  className={clsx(
                    styles['content-text-large'],
                    styles['location-text']
                  )}
                >
                  {cityFrom.id}
                </Text>

                <Text
                  className={clsx(
                    styles['content-text'],
                    styles['location-text']
                  )}
                >
                  {cityFrom.text}
                </Text>
              </Button>
            </Col>
            <Col className={clsx(styles['item'], styles['switch'])} span={4}>
              <Button
                className={clsx(styles['btn'], styles['btn-swap'])}
                onClick={handleSwap}
              >
                <Image src={Swap} preview={false} />
              </Button>
            </Col>
            <Col
              className={clsx(styles['item'], styles['right-container'])}
              span={10}
            >
              <Text>To</Text>
              <Button
                className={clsx(
                  styles['btn'],
                  styles['location'],
                  styles['to']
                )}
                onClick={handleClickCity}
              >
                <Text
                  className={clsx(
                    styles['content-text-large'],
                    styles['location-text']
                  )}
                >
                  {cityTo.id}
                </Text>

                <Text
                  className={clsx(
                    styles['content-text'],
                    styles['location-text']
                  )}
                >
                  {cityTo.text}
                </Text>
              </Button>
            </Col>
          </Row>
          <PopupLayer
            isActive={isPopupCity}
            children={<FlightCity handleClose={handleClosePopup} />}
          />
          <Row className={styles['searching-item']}>
            <Col
              span={18}
              className={clsx(styles['item'], styles['left-container'])}
            >
              <Text>Departure date</Text>
              <Button className={styles['btn']} icon={<CalendarOutlined />}>
                <Text className={styles['content-text']}> {dateIn}</Text>
              </Button>
            </Col>
            <Col
              span={6}
              className={clsx(styles['item'], styles['right-container'])}
            >
              <Text>Round trip</Text>
              <Switch
                className={styles['btn-switch']}
                checked={isRoundTrip}
                onChange={handleRoundTrip}
              />
            </Col>
          </Row>
          {displayReturn(isRoundTrip)}
          <Row className={styles['searching-item']}>
            <Col
              span={12}
              className={clsx(styles['item'], styles['left-container'])}
            >
              <Text>Passenger</Text>
              <Button className={styles['btn']} icon={<Passenger />}>
                <Text className={styles['content-text']}>
                  {passengers} Adults
                </Text>
              </Button>
            </Col>
            <Col
              span={12}
              className={clsx(styles['item'], styles['left-container'])}
            >
              <Text>Service class</Text>
              <Button className={styles['btn']} icon={<ServiceClass />}>
                <Text className={styles['content-text']}>{service}</Text>
              </Button>
            </Col>
          </Row>
          <Row className={styles['searching-item']}>
            <Col span={24} className={clsx(styles['item'])}>
              <Button
                className={clsx(styles['btn'], styles['btn-search'])}
                icon={<Searching className={styles['icon-search']} />}
              >
                <Text
                  className={clsx(
                    styles['content-text-medium'],
                    styles['white']
                  )}
                >
                  Searching
                </Text>
              </Button>
            </Col>
          </Row>
        </Row>
      </Row>
    </div>
  );
};

export default FlightMobile;
