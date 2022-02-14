import { Col, Row, Select } from "antd";
import { FunctionComponent } from "react";
import LocationInputSearch from "../LocationInputSearch/LocationInputSearch";
import styles from "./HotelSearching.module.scss";
const { Option } = Select;
interface HotelSearchingProps {
  
}
 
const HotelSearching: FunctionComponent<HotelSearchingProps> = () => {
  return <Row className={styles['hotel-searching']}>
    <Col>
    <LocationInputSearch/>
    </Col>
  </Row>;
}
 
export default HotelSearching;