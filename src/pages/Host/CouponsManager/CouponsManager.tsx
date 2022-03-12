import { FunctionComponent } from "react";
import styles from "./CouponsManager.module.scss";
interface CouponsManagerProps {
  
}
 
const CouponsManager: FunctionComponent<CouponsManagerProps> = () => {
  return <div className={styles['coupons-manager']}>CouponsManager</div>;
}
 
export default CouponsManager;