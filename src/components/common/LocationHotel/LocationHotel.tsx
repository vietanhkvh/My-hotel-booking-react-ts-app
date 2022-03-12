import { Typography, Image, Row } from "antd";
import { FunctionComponent } from "react";
import Slider from "react-slick";
import SlickImages from "../SlickImages/SlickImages";
import { banner } from '../SlickImages/dataRaw';
import styles from "./LocationHotel.module.scss";
import { some } from "../../constants";
import Banner1 from '../../../assest/images/banner1.jpg';

const {Title}=Typography
interface LocationHotelProps {
  
}
 
const LocationHotel: FunctionComponent<LocationHotelProps> = () => {
  const settings = {
    dots: false,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoplay: true,
    speed: 1500,
    autoplaySpeed: 1000,
    cssEase: 'linear',
  };
  var bg=require('../../../assest/images/banner1.jpg')
  return <div className={styles['location-hotel']}>
    <Title level={4}>Hotel by location</Title>
    <Slider {...settings} className={styles['slider']}>
    <Row style={{borderRadius:'50%', backgroundImage: `url(${bg})`}}>
            1234
            </Row>
      {/* {
        banner?.map((d: some) => (
          <Row key={d?.id} style={{borderRadius:'50%', backgroundImage: `url(${d?.image})`}}>
            1234
            </Row>
        ))
      } */}
    </Slider>
    </div>;
}
 
export default LocationHotel;