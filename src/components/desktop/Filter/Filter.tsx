import { FunctionComponent } from "react";
import styles from "./Filter.module.scss";
interface FilterProps {
  
}
 
const Filter: FunctionComponent<FilterProps> = () => {
  return <div className={styles['filter']} style={{background:'yellow'}}>Filter</div>;
}
 
export default Filter;