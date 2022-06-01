import { FunctionComponent } from "react";
import styles from "./ServiceClassSelection.module.scss";
interface ServiceClassSelectionProps {
  
}
 
const ServiceClassSelection: FunctionComponent<ServiceClassSelectionProps> = () => {
  return <div className={styles['service-class-selection']}>ServiceClassSelection</div>;
}
 
export default ServiceClassSelection;