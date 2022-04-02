import { Image, Typography } from "antd";
import { FunctionComponent } from "react";
import styles from "./NotFound.module.scss";
import NotFoundImg from "../../../assest/images/not-found.png"
const {Title} = Typography;
interface NotFoundProps {
  /**
   * text display
   */
  text?:string;
}
 
const NotFound: FunctionComponent<NotFoundProps> = (props) => {
  const{text}=props
  return <div className={styles['not-found']}>
    <Image src={NotFoundImg} preview={false} width={200} height={200}/>
    <Title level={4}>{text}</Title>
  </div>;
}
 
export default NotFound;