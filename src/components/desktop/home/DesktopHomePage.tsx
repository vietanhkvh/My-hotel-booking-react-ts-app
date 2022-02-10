import { FunctionComponent } from "react";
import styles from "./DesktopHomePage.module.scss";
interface DesktopHomePageProps {
  
}
 
const DesktopHomePage: FunctionComponent<DesktopHomePageProps> = () => {
  return <div className={styles['desktop-home-page']}>DesktopHomePage</div>;
}
 
export default DesktopHomePage;