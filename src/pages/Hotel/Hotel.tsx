import { FunctionComponent } from "react";
import styles from "./Hotel.module.scss";
import {  Outlet } from "react-router-dom";
import SlickImages from "../../components/common/SlickImages/SlickImages";
import SlickImageMobile from "../../components/mobile/SlickImageMobile/SlickImageMobile";
import { Typography } from "antd";
import clsx from "clsx";
import HorizontalBoxes from "../../components/common/HorizontalBoxes/HorizontalBoxes";
import HotelCardMobile from "../../components/mobile/HotelCardMobile/HotelCardMobile";
import {
  hotel,
  hotel1,
} from "../../components/common/SlickImages/dataRaw";
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
      <SlickImages images={[]} type="banner" isMobile={isMobile} />
      <HorizontalBoxes>
        {[...Array(6)].map((a, i) => {
          return (
            <HotelCardMobile
              key={i}
              images={i % 2 === 0 ? hotel : hotel1}
              nameHotel={'World Luxury Hotel Awards'}
              hotelAddress={'Asssss, Bbbbbbbbbb'}
              price={120}
              ratingP={5}
            />
          );
        })}
        </HorizontalBoxes>
      
      {/* <div>
        <SlickImageMobile images={hotel} />
      </div> */}
      <Outlet />
    </div>
  );
};

export default Hotel;
