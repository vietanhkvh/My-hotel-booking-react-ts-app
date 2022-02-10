import { FunctionComponent } from "react";
import styles from "./Restaurant.module.scss";
interface RoomProps {
  
}
 
const Restaurant: FunctionComponent<RoomProps> = () => {
  return <div className={styles['Restaurant']}>Restaurant</div>;
}
 
export default Restaurant;