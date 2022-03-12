import { FunctionComponent } from "react";
import styles from "./RoomManager.module.scss";
interface RoomManagerProps {
  
}
 
const RoomManager: FunctionComponent<RoomManagerProps> = () => {
  return <div className={styles['room-manager']}>RoomManager</div>;
}
 
export default RoomManager;