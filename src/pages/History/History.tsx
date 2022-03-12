import { FunctionComponent } from "react";
import styles from "./History.module.scss";
interface HistoryProps {
  
}
 
const History: FunctionComponent<HistoryProps> = () => {
  return <div className={styles['history']}>History</div>;
}
 
export default History;