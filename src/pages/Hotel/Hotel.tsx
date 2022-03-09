import { FunctionComponent } from 'react';
import styles from './Hotel.module.scss';
import { Link, Outlet } from 'react-router-dom';
interface HotelProps {}

const Hotel: FunctionComponent<HotelProps> = () => {
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
