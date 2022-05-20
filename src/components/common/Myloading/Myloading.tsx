import { FunctionComponent } from "react";
import styles from "./Myloading.module.scss";
interface MyloadingProps {
  /**
   * color
   */
  color?:string
}
 
const Myloading: FunctionComponent<MyloadingProps> = (props) => {
  return <div className={styles['loader']}>loading...</div>;
}
 
export default Myloading;