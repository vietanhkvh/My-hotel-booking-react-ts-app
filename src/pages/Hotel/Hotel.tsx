import { constState } from '../../store/reducer/constReducer';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import styles from './Hotel.module.scss';
import { Link, Outlet } from 'react-router-dom';
import { some } from '../../const/keyString';
interface HotelProps {}

const Hotel: FunctionComponent<HotelProps> = () => {
  const hotelSearchingByLocation = useSelector(
    (state: { const: constState }) => state?.const?.hotelSearchingByLocation
  );
  return (
    <div className={styles['hotel']}>
      <h2>Hotel</h2>
        {/* {hotelSearchingByLocation?.map((hotel:some) => (
            <Link to={`/hotel/${hotel.ID_Hotel}`}>{hotel.Hotel_Name}</Link>
        ))} */}
      <Outlet />
    </div>
  );
};

export default Hotel;
