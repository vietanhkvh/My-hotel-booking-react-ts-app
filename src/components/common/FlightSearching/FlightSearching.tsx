import { Button, Col, Row, Typography, Image, Switch } from 'antd';
import clsx from 'clsx';
import { FunctionComponent, useState } from 'react';
import Swap from '../../../assest/icons/swap-flight-32.png';
import styles from './FlightSearching.module.scss';
import Passenger from '../../../assest/icons/passenger';
import ServiceClass from '../../../assest/icons/service-class-flight';
import { city } from '../../../pages/mobile/FlightMobile/dataRaw';
import { CalendarOutlined } from '@ant-design/icons';

import moment from 'moment';
import PopupLayer from '../../mobile/PopupLayer/PopupLayer';
import FlightCity from '../../../pages/mobile/FlightCity/FlightCity';
import Searching from '../../../assest/icons/searching';
import PassengerSelection from '../PassengerSelection/PassengerSelection';

const { Text } = Typography;
export interface IPassengerOp {
  title: string;
  note?: string;
  value: number;
  minVal: number;
  maxVal: number;
}
interface FlightSearchingProps {
  /**
   * mobile ver
   */
  isMoblie: boolean;
}

const FlightSearching: FunctionComponent<FlightSearchingProps> = (props) => {
  const { isMoblie } = props;

  const array = [
    { title: 'Adults', value: 1, minVal: 0, maxVal: 10 },
    { title: 'Child', note: '2-11 years', value: 0, minVal: 0, maxVal: 10 },
    { title: 'Babies', note: '<2 years', value: 0, minVal: 0, maxVal: 10 },
  ];
  const [arrayData, setDataArray] = useState<Array<IPassengerOp>>(array);
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
  const [isPopupCalendar, setIsPopupCalendar] = useState<boolean>(false);
  const [isPopupPassenger, setIsPopupPassenger] = useState<boolean>(false);
  const [isPopupService, setIsPopupService] = useState<boolean>(false);

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
  const handleClickPassenger = () => {
    setIsPopupPassenger(true);
  };
  return (
    <div className={styles['flight-searching']}>
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
              className={clsx(styles['btn'], styles['location'], styles['to'])}
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
            <Button
              className={styles['btn']}
              icon={<Passenger />}
              onClick={handleClickPassenger}
            >
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
          <PopupLayer
            children={
              <PassengerSelection
                array={arrayData}
                setDataArray={setDataArray}
                setIsPopupPassenger={setIsPopupPassenger}
              />
            }
            isActive={isPopupPassenger}
            setIsActive={setIsPopupPassenger}
            classContainer={styles['popup-wrap']}
          />
          <PopupLayer
            children={
              <PassengerSelection
                array={arrayData}
                setDataArray={setDataArray}
                setIsPopupPassenger={setIsPopupPassenger}
              />
            }
            isActive={isPopupPassenger}
            setIsActive={setIsPopupPassenger}
            classContainer={styles['popup-wrap']}
          />
        </Row>
        <Row className={styles['searching-item']}>
          <Col span={24} className={clsx(styles['item'])}>
            <Button
              className={clsx(styles['btn'], styles['btn-search'])}
              icon={<Searching className={styles['icon-search']} />}
            >
              <Text
                className={clsx(styles['content-text-medium'], styles['white'])}
              >
                Searching
              </Text>
            </Button>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default FlightSearching;