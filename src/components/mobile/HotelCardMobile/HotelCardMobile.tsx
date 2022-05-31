import { Col, Row } from "antd";
import { FunctionComponent } from "react";
import styles from "./HotelCardMobile.module.scss";
import { StarFilled } from "@ant-design/icons";
import SlickImageMobile from "../SlickImageMobile/SlickImageMobile";
import { banner, hotel, room } from "../../common/SlickImages/dataRaw";

interface HotelCardMobileProps {
  /**
   * list image
   */
  images: any[];
  /**
   * name of hotel
   */
  nameHotel: string;
  /**
   * hotel address
   */
  hotelAddress: string;
  /**
   * coupon value
   */
  couponVal?: number;
  /**
   * price
   */
  price: number;
  /**
   * rating point
   */
  ratingP: number;
  /**
   * link
   */
  link?: string;
}

const HotelCardMobile: FunctionComponent<HotelCardMobileProps> = (props) => {
  const {
    images,
    nameHotel,
    hotelAddress,
    couponVal,
    price = 120,
    ratingP = 5,
  } = props;
  return (
    <div className={styles["hotel-card-mobile"]}>
      <div className={styles["item-container"]}>
        <SlickImageMobile
          images={images}
          classes={{ container: styles["slick-container"] }}
        />
      </div>
      <Row className={styles["item-container"]}>
        <Row gutter={[4, 4]} className={styles["item"]}>
          <Col span={20} className={styles["address"]}>
            {hotelAddress}
          </Col>
          <Col span={4}>
            {ratingP.toFixed(1)}
            <StarFilled />
          </Col>
        </Row>
        <Row gutter={[4, 4]} className={styles["item"]}>
          <Col span={20} className={styles["name"]}>
            {nameHotel}
          </Col>
          <Col span={4}></Col>
        </Row>
        <Row gutter={[4, 4]} className={styles["item"]}>
          <Col span={20} className={styles["name"]}>
            {price}$ night
          </Col>
          <Col span={4}></Col>
        </Row>
      </Row>
    </div>
  );
};

export default HotelCardMobile;
