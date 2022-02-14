import { FunctionComponent } from "react";
import styles from "./RestaurantSearching.module.scss";
interface RestaurantSearchingProps {
  
}
 
const RestaurantSearching: FunctionComponent<RestaurantSearchingProps> = () => {
  return <div className={styles['restaurant-searching']}>RestaurantSearching</div>;
}
 
export default RestaurantSearching;