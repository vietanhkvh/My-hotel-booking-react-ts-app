import { FunctionComponent } from "react";
import styles from "./RestaurantCard.module.scss";
interface RestaurantCardProps {
  
}
 
const RestaurantCard: FunctionComponent<RestaurantCardProps> = () => {
  return <div className={styles['restaurant-card']}>RestaurantCard</div>;
}
 
export default RestaurantCard;