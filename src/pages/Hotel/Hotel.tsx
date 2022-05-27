import { FunctionComponent } from "react";
import styles from "./Hotel.module.scss";
import { Link, Outlet } from "react-router-dom";
import SlickImages from "../../components/common/SlickImages/SlickImages";
import LocationHotel from "../../components/common/LocationHotel/LocationHotel";
import { Typography } from "antd";
import clsx from "clsx";
const { Title } = Typography;

interface HotelProps {
  isMobile: boolean;
}

const Hotel: FunctionComponent<HotelProps> = (props) => {
  const { isMobile } = props;
  return (
    <div className={styles["hotel"]}>
      <Title
        className={clsx(
          styles["item-container"],
          styles["text"],
          styles["title-item"],
          styles["text-mobile"]
        )}
        level={isMobile ? 5 : 4}
      >
        Hotel
      </Title>
      {/* {hotelSearchingByLocation?.map((hotel:some) => (
            <Link to={`/hotel/${hotel.ID_Hotel}`}>{hotel.Hotel_Name}</Link>
        ))} */}
      <SlickImages images={[]} type="banner" isMobile={isMobile} />
      {/* <LocationHotel/> */}
      <Outlet />
    </div>
  );
};

export default Hotel;
