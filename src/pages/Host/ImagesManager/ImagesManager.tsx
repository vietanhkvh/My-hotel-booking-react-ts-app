import { FunctionComponent } from "react";
import styles from "./ImagesManager.module.scss";
interface ImagesManagerProps {
  
}
 
const ImagesManager: FunctionComponent<ImagesManagerProps> = () => {
  return <div className={styles['images-manager']}>ImagesManager</div>;
}
 
export default ImagesManager;