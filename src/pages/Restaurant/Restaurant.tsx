import HorizontalBoxes from "../../components/common/HorizontalBoxes/HorizontalBoxes";
import SlickImages from "../../components/common/SlickImages/SlickImages";
import HotelCardMobile from "../../components/mobile/HotelCardMobile/HotelCardMobile";
import { Typography } from "antd";
import { FunctionComponent } from "react";
import styles from "./Restaurant.module.scss";
import {
  restaurant,
} from "../../components/common/SlickImages/dataRaw";
const { Title } = Typography;

interface RoomProps {
  isMobile: boolean;
}
 
const Restaurant: FunctionComponent<RoomProps> = (props) => {
  const { isMobile } = props;

  return <div className={styles['restaurant']}>
    <SlickImages images={[]} type="banner" isMobile={isMobile} />
     <Title
        level={isMobile ? 5 : 4}
      >
        Restaurant
      </Title>
      <HorizontalBoxes>
        {[...Array(6)].map((a, i) => {
          return (
            <HotelCardMobile
              key={i}
              images={restaurant}
              nameHotel={'World Luxury Hotel Awards'}
              hotelAddress={'Asssss, Bbbbbbbbbb'}
              price={120}
              ratingP={5}
            />
          );
        })}
        </HorizontalBoxes>
  </div>;
}
 
export default Restaurant;