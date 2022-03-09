import {
  CSSProperties,
  Dispatch,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styles from './LocationInputSearch.module.scss';
import { Select } from 'antd';
import { some } from '../../../const/keyString';
// import { dataRaw } from './rawData';
import { getLocationHotel } from '../../../services/hotel.service';
import { SUCCESS_CODE } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setHotelLocationAction } from '../../../store/actions/constAction';
import { hotelLocation } from '../../../const/interface';
import { constState } from '../../../store/reducer/constReducer';
import LocationOption from '../LocationOption/LocationOption';
const { Option } = Select;

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
}

const LocationInputSearch: FunctionComponent<LocationInputSearchProps> = (
  props
) => {
  const { placeholder, style, handleSetLocation } = props;
  const dispatch: Dispatch<any> = useDispatch();
  const hotelLocation = useSelector(
    (state: { const: constState }) => state?.const?.hotelLocation
  );
  //////////////////state
  const [data, setData] = useState<hotelLocation[] | undefined>(hotelLocation);
  const options = data?.map((d: hotelLocation) => (
    <Option key={d?.city}>
      <LocationOption name={d?.city} quanity={d?.quantity} />
    </Option>
  ));
  //////////////////event
  const getHotelLocation = useCallback(async () => {
    const respone: any = await getLocationHotel();

    let data: hotelLocation[] = [];
    try {
      const res: any = await respone;
      if (res?.data?.code === SUCCESS_CODE) {
        data = res?.data?.data;
        dispatch(setHotelLocationAction(data));
      }
    } catch (err) {}
    return data;
  }, [dispatch]);
  const callApi = async (value: any, callback: (data: any) => void) => {
    //call api here, return a array, then replace dataRaw
    const dataRaw = hotelLocation;
    const data: hotelLocation[] = [];
    value = new RegExp(value);
    // const value1= new RegExp('/'+value+'/');
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
  };
  const handleChange = (value: any) => {
    handleSetLocation && handleSetLocation(value);
  };

  useEffect(() => {
    getHotelLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles['location-input-search']}>
      <Select
        className={styles['input']}
        showSearch
        placeholder={placeholder}
        style={style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
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

export default LocationInputSearch;
