import { Col, Image, Row, Typography } from 'antd';
import { FunctionComponent } from 'react';
import styles from './ButtonNav.module.scss';
const { Text } = Typography;
interface ButtonNavProps {
  /**
   * icon
   */
  icon: any;
  /**
   * text
   */
  text: string;
  /**
   * function click
   */
  handlerClick?: () => void;
}

const ButtonNav: FunctionComponent<ButtonNavProps> = (props) => {
  const { icon, text, handlerClick } = props;
  return (
    <Col
      className={styles['button-nav']}
      onClick={handlerClick && handlerClick}
    >
      <Row>
        <Image className={styles['icon']} preview={false} src={icon} />
        <Text className={styles['text']}>{text}</Text>
      </Row>
    </Col>
  );
};

export default ButtonNav;
