import { FunctionComponent,useState } from "react";
import FlightMobile from "../mobile/FlightMobile/FlightMobile";
import styles from "./Flight.module.scss";
interface FlightProps {
  /**
   * mobile ver
   */
  isMobile?:boolean;
}
 
const Flight: FunctionComponent<FlightProps> = (props) => {
  const {isMobile} =props;
  ///////////////states
  const [isFlightActive, setIsFlightActive]= useState<boolean>(false);
  return isMobile ? <FlightMobile/>
  :<div className={styles['flight']}>
    flight
  </div>
}
 
export default Flight;