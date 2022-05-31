import SlickImageMobile from "../../../components/mobile/SlickImageMobile/SlickImageMobile";
import { Col, Row } from "antd";
import { FunctionComponent } from "react";
import { StarFilled } from "@ant-design/icons";

import styles from "./RestaurantCard.module.scss";
interface RestaurantCardProps {
  /**
   * list image
   */
   images: any[];
   /**
    * name of hotel
    */
   resName: string;
   /**
    * hotel address
    */
   resAddress: string;
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
 
const RestaurantCard: FunctionComponent<RestaurantCardProps> = (props) => {
  const {
    images,
    resName,
    resAddress,
    couponVal,
    price = 120,
    ratingP = 5,
  } = props;
  return <div className={styles['restaurant-card']}>
    <div className={styles["item-container"]}>
        <SlickImageMobile
          images={images}
          classes={{ container: styles["slick-container"] }}
        />
      </div>
      <Row className={styles["item-container"]}>
        <Row gutter={[4, 4]} className={styles["item"]}>
          <Col span={20} className={styles["address"]}>
            {resAddress}
          </Col>
          <Col span={4}>
            {ratingP.toFixed(1)}
            <StarFilled />
          </Col>
        </Row>
        <Row gutter={[4, 4]} className={styles["item"]}>
          <Col span={20} className={styles["name"]}>
            {resName}
          </Col>
          <Col span={4}></Col>
        </Row>
        <Row gutter={[4, 4]} className={styles["item"]}>
          <Col span={20} className={styles["name"]}>
            From {price}$ night
          </Col>
          <Col span={4}></Col>
        </Row>
      </Row>
  </div>;
}
 
export default RestaurantCard;