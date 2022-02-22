import { Button, Col, DatePicker, Image, Popover, Row, Typography } from 'antd';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import LocationInputSearch from '../LocationInputSearch/LocationInputSearch';
import styles from './HotelSearching.module.scss';
import Search from '../../../assest/icons/icons8-search.svg';
import moment from 'moment';
import PopupNumberGuest from '../PopupNumberGuest/PopupNumberGuest';
import { DATE_FORMAT } from '../../constants';
const { Text } = Typography;
const { RangePicker } = DatePicker;
interface HotelSearchingProps {}

const HotelSearching: FunctionComponent<HotelSearchingProps> = () => {
  ////////////////////////////state
  const [adults, setAdults] = useState<number>(1);
  const [rooms, setRooms] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [location, setLocation] = useState<string>('');

  //popup
  const [visible, setVisible] = useState<boolean>(false);
  //disable search
  const [disSearch, setDisSearch] = useState<boolean>(true);
  //date
  const [dateIn, setDateIn] = useState<any>(moment());
  const [dateOut, setDateOut] = useState<any>(moment().add('1', 'days'));
  const [dateDiff, setDateDiff] = useState<number>(1);
  /////////////////////////////event
  const isMany = (num: number) => {
    return num >= 2 ? 's' : '';
  };
  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current && current < moment().add('-1', 'days').endOf('day');
  };
  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible);
  };
  const hanldeSetDate = (date: any) => {
    setDateIn(date?.[0]);
    setDateOut(date?.[1]);
  };
  const hanldeSetDateDiff = (dateIn: any, dateOut: any) => {
    const daygap = dateOut?.diff(dateIn, 'days');
    daygap === undefined ? setDateDiff(0) : setDateDiff(daygap);
  };
  const hanldeSetAdults = (num: number) => {
    setAdults(num);
  };
  const hanldeSetRooms = (num: number) => {
    setRooms(num);
  };
  const hanldeSetChildren = (num: number) => {
    setChildren(num);
  };
  const hanldeSetLocation = (location: string) => {
    setLocation(location);
  };
  const hanleSetDisSearch = (disSearch: boolean) => {
    setDisSearch(disSearch);
  };
  const hanldeDisSearch = useCallback((location: string, dateDiff: number) => {
    if (!location || dateDiff === 0) {
      hanleSetDisSearch(true);
    } else {
      hanleSetDisSearch(false);
    }
  }, []);
  /////////////////////useEffect
  useEffect(() => {
    hanldeSetDateDiff(dateIn, dateOut);
    hanldeDisSearch(location, dateDiff);
  }, [dateDiff, dateIn, dateOut, hanldeDisSearch, location]);
  return (
    <Row
      className={styles['hotel-searching']}
      gutter={28}
      style={{ margin: '0' }}
    >
      <Col span={8} className={styles['item-container']}>
        <Row className={styles['title-wrapper']}>
          <Text className={styles['title']}>Location</Text>
        </Row>
        <LocationInputSearch
          placeholder={'Thành phố, khách sạn, điểm đến'}
          handleSetLocation={hanldeSetLocation}
        />
      </Col>

      <Col span={8} className={styles['item-container']}>
        <Row className={styles['title-wrapper']}>
          <Text className={styles['title']}>Check In/Out</Text>
          <Text className={styles['count-date']}>
            {' '}
            {dateDiff} day{isMany(dateDiff)}
          </Text>
        </Row>
        <Row>
          <RangePicker
            allowEmpty={[false, false]}
            defaultValue={[moment(), moment().add('1', 'days')]}
            defaultPickerValue={[moment(), moment().add('1', 'days')]}
            disabledDate={disabledDate}
            bordered={false}
            picker='date'
            format={DATE_FORMAT}
            className={styles['date-picker']}
            size='large'
            onChange={(date) => hanldeSetDate(date)}
          />
        </Row>
      </Col>

      <Col
        span={6}
        className={styles['item-container']}
        style={{ border: 'none' }}
      >
        <Row className={styles['title-wrapper']}>
          <Text className={styles['title']}>Guest</Text>
        </Row>
        <Popover
          className={`${styles['select-guest']} ${
            styles[visible ? 'actived' : '']
          }`}
          content={
            <PopupNumberGuest
              adults={adults}
              rooms={rooms}
              child={children}
              handleSetAdults={hanldeSetAdults}
              handleSetRooms={hanldeSetRooms}
              handleSetChildren={hanldeSetChildren}
            />
          }
          trigger='click'
          visible={visible}
          onVisibleChange={handleVisibleChange}
          placement='bottomRight'
          style={{ top: '15px' }}
        >
          <Row className={styles['']} style={{ marginTop: 5 }}>
            <Text className={'guest-number'}>
              {rooms} room{isMany(rooms)}, {adults} adult{isMany(rooms)},{' '}
              {children} children
            </Text>
          </Row>
        </Popover>
      </Col>
      <Col
        span={2}
        className={styles['item-container']}
        style={{ border: 'none' }}
      >
        <Button
          className={styles['btn-search']}
          disabled={disSearch ? true : false}
        >
          <Image preview={false} src={Search} width={'35px'} height={'35px'} />
        </Button>
      </Col>
    </Row>
  );
};

export default HotelSearching;
