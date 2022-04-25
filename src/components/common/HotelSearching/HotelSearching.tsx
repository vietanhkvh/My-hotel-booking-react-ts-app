import {
  Button,
  Col,
  DatePicker,
  Image,
  Input,
  Popover,
  Row,
  Tabs,
  Typography,
} from 'antd';
import {
  Dispatch,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import styles from './HotelSearching.module.scss';
import LocationInputSearch from '../LocationInputSearch/LocationInputSearch';
import Search from '../../../assest/icons/icons8-search.svg';
import moment from 'moment';
import PopupNumberGuest from '../PopupNumberGuest/PopupNumberGuest';
import { DATE_FORMAT, DATE_FORMAT_BACK_END, some, SUCCESS_CODE } from '../../constants';
import {
  getSearchingResultLocation,
  getSearchingResultName,
} from '../../../services/hotel.service';
import {
  setHotelSearchingByLocation,
  setHotelSearchingCondition,
} from '../../../store/actions/constAction';
import HotelNameInputSearch from '../HotelNameInputSearch/HotelNameInputSearch';

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

interface HotelSearchingProps {}

const HotelSearching: FunctionComponent<HotelSearchingProps> = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [params] = useState<any>({
    location: searchParams.get('location'),
    dateIn: searchParams.get('dateIn'),
    dateOut: searchParams.get('dateOut'),
    adults: searchParams.get('adults'),
    children: searchParams.get('children'),
    type: searchParams.get('type'),
  });
  ////////////////////////////state
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [location, setLocation] = useState<string>('');
  //tab search
  const [tab, setTab] = useState<string>('location');
  const [strSearch, setStrSearch] = useState<string>();
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
  const hanldeSetDateDiff = (dateIn: any, dateOut: any, params: any) => {
    if (params?.dateIn)
      setDateDiff(moment(params?.dateOut).diff(moment(params?.dateIn), 'days'));
    else {
      const daygap = dateOut?.diff(dateIn, 'days');
      daygap === undefined ? setDateDiff(0) : setDateDiff(daygap);
    }
  };
  const hanldeSetAdults = (num: number) => {
    setAdults(num);
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

  const handleSubmitSearch = useCallback(
    async (
      location: string,
      dateIn: any,
      dateOut: any,
      adults: number,
      children: number,
      type: string,
      strSearch: string
    ) => {
      const payload: some = {
        location: location,
        name: strSearch,
        dateIn: dateIn?.format(DATE_FORMAT_BACK_END),
        dateOut: dateOut?.format(DATE_FORMAT_BACK_END),
        guestNum: adults + children,
      };
      const respond = await (type === 'location'
        ? getSearchingResultLocation(payload)
        : getSearchingResultName(payload));
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
          const params: some = {
            location: location,
            dateIn: dateIn,
            dateOut: dateOut,
            adults: adults,
            children: children,
            type: type,
          };

          dispatch(setHotelSearchingByLocation(res?.data?.data));
          dispatch(setHotelSearchingCondition(params));
          navigate({
            pathname: '/searching',
            search: `?${createSearchParams(params)}`,
          });
        }
      } catch (err: any) {
        alert("Server doesn't respond");
      }
    },
    [dispatch, navigate]
  );
  const callback = (key: any) => {
    setTab(key);
  };

  /////////////////////useEffect
  useEffect(() => {
    hanldeSetDateDiff(dateIn, dateOut, params);
    hanldeDisSearch(location, dateDiff);
  }, [dateDiff, dateIn, dateOut, hanldeDisSearch, location, params]);
  return (
    <Row
      className={styles['hotel-searching']}
      gutter={28}
      style={{ margin: '0' }}
    >
      <Col span={8} className={styles['item-container']}>
        <Tabs defaultActiveKey={params?.type !== ''? params?.type : 'location'} onChange={callback}>
          <TabPane tab='Location' key='location'>
            <LocationInputSearch
              placeholder={'City you want to go...'}
              handleSetLocation={hanldeSetLocation}
              location={params?.location !== '' ? params?.location : ''}
            />
          </TabPane>
          <TabPane tab='Hotel' key='hotelName'>
            <HotelNameInputSearch
              placeholder={'Hotel name...'}
              handleSetLocation={hanldeSetLocation}
              location={params?.location !== '' ? params?.location : ''}
              setStrSearch={setStrSearch}
            />
          </TabPane>
        </Tabs>
      </Col>

      <Col span={8} className={styles['item-container']}>
        <Row className={styles['title-wrapper']}>
          <Text className={styles['title']}>Check In/Out</Text>
          <Text className={styles['count-date']}>
            {dateDiff} day{isMany(dateDiff)}
          </Text>
        </Row>
        <Row>
          <RangePicker
            allowEmpty={[false, false]}
            defaultValue={
              params?.dateIn
                ? [moment(params?.dateIn), moment(params?.dateOut)]
                : [moment(), moment().add('1', 'days')]
            }
            defaultPickerValue={
              params?.dateIn
                ? [moment(params?.dateIn), moment(params?.dateOut)]
                : [moment(), moment().add('1', 'days')]
            }
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
          className={clsx(
            styles['select-guest'],
            styles[visible ? 'actived' : '']
          )}
          content={
            <PopupNumberGuest
              adults={adults}
              child={children}
              handleSetAdults={hanldeSetAdults}
              handleSetChildren={hanldeSetChildren}
            />
          }
          trigger='click'
          visible={visible}
          onVisibleChange={handleVisibleChange}
          placement='bottomRight'
          style={{ top: '15px' }}
        >
          <Row style={{ marginTop: 5 }}>
            <Text className={'guest-number'} style={{ fontSize: 16 }}>
              {adults} adult{isMany(adults)}, {children} children
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
          onClick={() =>
            handleSubmitSearch(
              location,
              dateIn,
              dateOut,
              adults,
              children,
              tab!,
              strSearch!
            )
          }
        >
          <Image preview={false} src={Search} width={'35px'} height={'35px'} />
        </Button>
      </Col>
    </Row>
  );
};

export default HotelSearching;
