import HotelCard from '../../components/common/HotelCard/HotelCard';
import { FunctionComponent } from 'react';
import styles from './Searching.module.scss';
import Filter from '../../components/desktop/Filter/Filter';
import { Col, Row, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { constState } from '../../store/reducer/constReducer';
import { isMany } from '../../utils/helpers';
const { Text } = Typography;
interface SearchingProps {}

const Searching: FunctionComponent<SearchingProps> = () => {
  //////////////state
  const hotelSearchingByLocation = useSelector(
    (state: { const: constState }) => state?.const?.hotelSearchingByLocation
  );
  console.log('hotelSearchingByLocation', hotelSearchingByLocation);
  return (
    <div className={styles['searching']}>
      <Row className={styles['results-title']}>
        <Text className={styles['title']}>
          {hotelSearchingByLocation?.length} hotel{isMany(hotelSearchingByLocation?.length ? hotelSearchingByLocation?.length : 0 )}
        </Text>
      </Row>
      <Row>
        <Col className={styles['filter']} span={4}>
          <Filter />
        </Col>
        <Col className={styles['hotel-card']} span={20}>
          {hotelSearchingByLocation?.map((h: any) => {
            return (
              <HotelCard
                key={h?.ID_Hotel}
                idHotel={h?.ID_Hotel}
                name={h?.Hotel_Name}
                district={h?.District}
                phone={h?.Phone}
                minPrice={h?.Min_Price}
                image={h?.Image}
                reviewNumber={h?.Review_Number}
                rating={h?.Rating_Point}
              />
            );
          })}
        </Col>
      </Row>
    </div>
  );
};

export default Searching;
