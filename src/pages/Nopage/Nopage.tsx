import { FunctionComponent } from "react";
import styles from "./Nopage.module.scss";
interface NopageProps {
  
}
 
const Nopage: FunctionComponent<NopageProps> = () => {
  return <div className={styles['nopage']}>404: Not Found</div>;
}
 
export default Nopage;