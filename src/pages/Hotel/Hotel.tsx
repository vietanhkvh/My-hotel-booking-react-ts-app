import { FunctionComponent } from 'react';
import styles from './Hotel.module.scss';
import { Link, Outlet } from 'react-router-dom';
import SlickImages from '../../components/common/SlickImages/SlickImages';
import LocationHotel from '../../components/common/LocationHotel/LocationHotel';
interface HotelProps {}

const Hotel: FunctionComponent<HotelProps> = () => {
  return (
    <div className={styles['hotel']}>
      <h2>Hotel</h2>
        {/* {hotelSearchingByLocation?.map((hotel:some) => (
            <Link to={`/hotel/${hotel.ID_Hotel}`}>{hotel.Hotel_Name}</Link>
        ))} */}
        <SlickImages images={[]} type='hotel' />
        {/* <LocationHotel/> */}
      <Outlet />
    </div>
  );
};

export default Hotel;
