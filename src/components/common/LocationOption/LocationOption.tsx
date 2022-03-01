import { Row, Image, Typography } from 'antd';
import { FunctionComponent } from 'react';
import Hotel from '../../../assest/icons/hotel_location-32.png';
import styles from './LocationOption.module.scss';
const { Text } = Typography;
interface LocationOptionProps {
  /**
   * name location
   */
  name?: string;
  /**
   * hotel quanity
   */
  quanity?: number;
}

const LocationOption: FunctionComponent<LocationOptionProps> = (props) => {
  const { name, quanity } = props;
  return (
    <Row className={styles['location-option']}>
        <Text className={styles['text']}>{name}</Text>
        <Row className={styles['quantity']}>
          <Text className={styles['text']}>{quanity}</Text>
          <Image preview={false} src={Hotel} width={20} height={20}/>
        </Row>
    </Row>
  );
};

export default LocationOption;
