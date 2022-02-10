import { FunctionComponent } from "react";
import styles from "./Hotel.module.scss";
interface HotelProps {
  
}
 
const Hotel: FunctionComponent<HotelProps> = () => {
  return <div className={styles['hotel']}>Hotel</div>;
}
 
export default Hotel;