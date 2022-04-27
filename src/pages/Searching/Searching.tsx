import HotelCard from '../../components/common/HotelCard/HotelCard';
import { FunctionComponent, useEffect, useState } from 'react';
import styles from './Searching.module.scss';
// import Filter from '../../components/desktop/Filter/Filter';
import { Col, Row, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { constState } from '../../store/reducer/constReducer';
import { isMany } from '../../utils/helpers';
import { useSearchParams } from 'react-router-dom';
import NotFound from '../../components/common/NotFound/NotFound';
import { hotelSearching } from '@const/interface';
import TabsFilter from '../../components/common/TabsFilter/TabsFilter';
const { Text } = Typography;
const tabArr = [
  {
    title: 'Best Match',
    key: 'best-match',
  },
  {
    title: 'Low price first',
    key: 'low-price',
  },
  {
    title: 'High price first',
    key: 'high-price',
  },
  {
    title: 'Top Rating',
    key: 'top-rate',
  },
];
interface SearchingProps {}

const Searching: FunctionComponent<SearchingProps> = () => {
  //////////////state
  const hotelSearchingByLocation = useSelector(
    (state: { const: constState }) => state?.const?.hotelSearchingByLocation
  );

  const [tabKey, setTabKey] = useState<string>('best-match');
  const [dataArr, setDataArr] = useState<hotelSearching[]>(
    hotelSearchingByLocation!
  );
  const [searchParams] = useSearchParams();
  const params = {
    location: searchParams.get('location'),
    dateIn: searchParams.get('dateIn'),
    dateOut: searchParams.get('dateOut'),
    adults: searchParams.get('adults'),
    children: searchParams.get('children'),
  };
  ///////////////////event
  const handleChangeTab = (tabKey: string) => {
    setTabKey(tabKey);
  };
  useEffect(() => {
    setDataArr(hotelSearchingByLocation!);
  }, [hotelSearchingByLocation]);
  //////////////////function
  const setDataByTabKey = (data: hotelSearching[], tab: string) => {
    let dataN: hotelSearching[] = [];
    switch (tab) {
      case 'best-match':
        return data;
      case 'low-price':
        dataN = data?.sort(
          (a: hotelSearching, b: hotelSearching) =>
            a?.Min_Price! - b?.Min_Price!
        );
        setDataArr(dataN);
        break;
      case 'high-price':
        dataN = data?.sort(
          (a: hotelSearching, b: hotelSearching) =>
            b?.Min_Price! - a?.Min_Price!
        );
        setDataArr(dataN);
        break;
      case 'top-rate':
        dataN = data?.sort(
          (a: hotelSearching, b: hotelSearching) =>
            b?.Rating_Point! - a?.Rating_Point!
        );
        setDataArr(dataN);
        break;
      default:
        setDataArr(data);
        break;
    }
  };
  ///////////////////component
  const result = (data: hotelSearching[], tab: string) => {
    setDataByTabKey(data, tabKey);

    return dataArr?.length ? (
      <>
        <Row className={styles['results-title']}>
          <Text className={styles['title']}>
            {dataArr?.length} hotel
            {isMany(data?.length ? data?.length : 0)}
          </Text>
        </Row>
        <Row>
          {/* <Col className={styles['filter']} span={4}>
          <Filter />
        </Col> */}
          <Col className={styles['hotel-card']} span={24}>
            {dataArr?.map((h: hotelSearching) => {
              return (
                <HotelCard
                  key={h?.ID_Hotel}
                  idHotel={h?.ID_Hotel!}
                  name={h?.Hotel_Name}
                  district={h?.District}
                  phone={h?.Phone}
                  minPrice={h?.Min_Price}
                  couponVal={h?.Coupon_Value}
                  image={h?.Imgs}
                  reviewNumber={h?.Review_Number}
                  rating={h?.Rating_Point!}
                  params={params}
                />
              );
            })}
          </Col>
        </Row>
      </>
    ) : (
      <Col className={styles['hotel-card']} span={24}>
        <NotFound text={'Oop... No hotel is found'} />
      </Col>
    );
  };
  return (
    <div className={styles['searching']}>
      <TabsFilter
        arrayTab={tabArr}
        dataComponent={() => result(dataArr, tabKey)}
        handleChangeTab={handleChangeTab}
      />
    </div>
  );
};

export default Searching;
