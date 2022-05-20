import {
  CSSProperties,
  Dispatch,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styles from './HotelNameInputSearch.module.scss';
import { Row, Select, Typography } from 'antd';
import { some } from '../../../const/keyString';
// import { dataRaw } from './rawData';
import {
  getLocationHotel,
  getNameHotel,
} from '../../../services/hotel.service';
import { SUCCESS_CODE } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  setHotelName,
} from '../../../store/actions/constAction';
import { hotelLocation } from '../../../const/interface';
import { constState } from '../../../store/reducer/constReducer';
const { Option } = Select;
const { Text } = Typography;
interface LocationInputSearchProps {
  /**
   * place holder
   */
  placeholder?: string;
  /**
   * style css/scss object
   */
  style?: CSSProperties;
  /**
   * location string
   */
  location?: string;
  /**
   * set location
   */
  handleSetLocation?: (val: any) => void;
  /**
   * set seaching str
   */
  setStrSearch?: (val: string) => void;
}

const HotelNameInputSearch: FunctionComponent<LocationInputSearchProps> = (
  props
) => {
  const { placeholder, style, handleSetLocation, location, setStrSearch } =
    props;
  const dispatch: Dispatch<any> = useDispatch();
  const hotelName = useSelector(
    (state: { const: constState }) => state?.const?.hotelName
  );
  //////////////////state
  const [data, setData] = useState<any[] | undefined>(hotelName);
  const [str, setStr] = useState<string>();
  const options = hotelName?.map((d: any) => (
    <Option key={d?.Hotel_Name}>
      <Row className={styles['location-option']}>
        <Text className={styles['text']}>{d?.Hotel_Name}</Text>
      </Row>
    </Option>
  ));
  //////////////////event
  const getHotelName = useCallback(
    async (value: any) => {
      const payload = {
        name: value,
      };
      const respone: any = await getNameHotel(payload);

      let data: hotelLocation[] = [];
      try {
        const res: any = await respone;
        if (res?.data?.code === SUCCESS_CODE && res?.data?.data !== []) {
          data = res?.data?.data;
          dispatch(setHotelName(data));
        }
      } catch (err) {}
      return data;
    },
    [dispatch]
  );
  const callApi = async (value: any, callback: (data: any) => void) => {
    //call api here, return a array, then replace dataRaw
    getHotelName(value);
    const dataRaw = hotelName;
    const data: hotelLocation[] = [];
    value = new RegExp(value);
    dataRaw?.forEach((d: hotelLocation) => {
      if (value.test(d?.city)) {
        data.push({
          city: d?.city,
          quantity: d?.quantity,
        });
      }
    });
    callback(data);
  };
  const fetch = (value: any, callback: (data: any) => void) => {
    callApi(value, callback);
  };
  const handleSearch = (value: any) => {
    fetch(value, (data: any) => setData(data));
    setStr(value);
    setStrSearch && setStrSearch(value);
    handleSetLocation && handleSetLocation(value);
  };
  const handleChange = (value: any) => {
    handleSetLocation && handleSetLocation(value);
    setStrSearch && setStrSearch(value);

  };

  // useEffect(() => {
  //   getHotelName(str);
  // }, [getHotelName, str]);

  return (
    <div className={styles['location-input-search']}>
      <Select
        className={styles['input']}
        showSearch
        placeholder={placeholder}
        style={style}
        defaultValue={location && location}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={true}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        size={'large'}
      >
        {options}
      </Select>
    </div>
  );
};

export default HotelNameInputSearch;
