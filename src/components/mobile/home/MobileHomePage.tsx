import { FunctionComponent } from "react";
import styles from "./MobileHomePage.module.scss";
interface MobileHomePageProps {
  
}
 
const MobileHomePage: FunctionComponent<MobileHomePageProps> = () => {
  return <div className={styles['mobile-home-page']}>MobileHomePage</div>;
}
 
export default MobileHomePage;