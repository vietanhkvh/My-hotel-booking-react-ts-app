import { Col, Typography } from "antd";
import { FunctionComponent } from "react";
import styles from "./MyAvatar.module.scss";
interface MyAvatarProps {
  /**
   * width
   */
  width?: number | string;
  /**
   * height
   */
  height?: number | string;
  /**
   *font size
   */
  fontSize?: number | string;
  /**
   * userName
   */
  userName?: string;
}
const { Text } = Typography;
const MyAvatar: FunctionComponent<MyAvatarProps> = (props) => {
  const { width, height, fontSize, userName } = props;

  return (
    <Col className={styles['avatar']} style={{ width: width, height: height }}>
      <Text className={styles['avatar-letters']} style={{ fontSize: fontSize }}>
        {userName?.[0]}
      </Text>
    </Col>
  );
};
 
export default MyAvatar;