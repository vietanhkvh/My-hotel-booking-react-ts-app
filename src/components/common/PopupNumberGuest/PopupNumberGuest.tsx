import { Divider, InputNumber, Row, Typography } from 'antd';
import { FunctionComponent } from 'react';
import styles from './PopupNumberGuest.module.scss';
const { Text } = Typography;
interface PopupNumberGuestProps {
  /**
   * adults num
   */
  adults?: number;
  /**
   * rooms num;
   */
  rooms?: number;
  /**
   * child num
   */
  child?: number;
  /**
   * set adults num
   */
  handleSetAdults?: (num: number) => void;
  /**
   * set rooms num
   */
  handleSetRooms?: (num: number) => void;
  /**
   * set child num
   */
  handleSetChildren?: (num: number) => void;
}

const PopupNumberGuest: FunctionComponent<PopupNumberGuestProps> = (props) => {
  const {
    adults,
    rooms,
    child,
    handleSetAdults,
    handleSetRooms,
    handleSetChildren,
  } = props;
  return (
    <div className={styles['popup-number-guest']}>
      <Row className={styles['wrapper']}>
        {/* <Text className={styles['title']}>Room</Text> */}
        <InputNumber
          className={styles['input-number']}
          addonBefore={<Text className={styles['title']}>Room</Text>}
          min={1}
          defaultValue={1}
          value={rooms}
          onChange={(value) => handleSetRooms && handleSetRooms(value)}
        />
      </Row>
      <Divider type='horizontal' />
      <Row className={styles['wrapper']}>
        {/* <Text className={styles['title']}>Adult</Text> */}
        <InputNumber
          className={styles['input-number']}
          addonBefore={<Text className={styles['title']}>Adult</Text>}
          min={1}
          defaultValue={2}
          value={adults}
          onChange={(value) => handleSetAdults && handleSetAdults(value)}
        />
      </Row>
      <Divider type='horizontal' />
      <Row className={styles['wrapper']}>
        {/* <Text className={styles['title']}>Children</Text> */}
        <InputNumber
          className={styles['input-number']}
          addonBefore={<Text className={styles['title']}>Children</Text>}
          min={0}
          defaultValue={0}
          value={child}
          onChange={(value) => handleSetChildren && handleSetChildren(value)}
        />
      </Row>
    </div>
  );
};

export default PopupNumberGuest;
