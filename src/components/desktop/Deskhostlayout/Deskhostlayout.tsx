import { FunctionComponent } from "react";
import styles from "./DeskHostLayout.module.scss";
interface DeskHostLayoutProps {
  
}
 
const DeskHostLayout: FunctionComponent<DeskHostLayoutProps> = () => {
  return <div className={styles['desk-host-layout']}>DeskHostLayout</div>;
}
 
export default DeskHostLayout;