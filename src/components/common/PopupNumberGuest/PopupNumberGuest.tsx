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
   * set child num
   */
  handleSetChildren?: (num: number) => void;
}

const PopupNumberGuest: FunctionComponent<PopupNumberGuestProps> = (props) => {
  const {
    adults,
    child,
    handleSetAdults,
    handleSetChildren,
  } = props;
  return (
    <div className={styles['popup-number-guest']}>
      <Row className={styles['wrapper']}>
        <InputNumber
          className={styles['input-number']}
          addonBefore={<Text className={styles['title']}>Adult</Text>}
          min={1}
          max={50}
          defaultValue={2}
          value={adults}
          onChange={(value) => handleSetAdults && handleSetAdults(value)}
        />
      </Row>
      <Divider type='horizontal' />
      <Row className={styles['wrapper']}>
        <InputNumber
          className={styles['input-number']}
          addonBefore={<Text className={styles['title']}>Children</Text>}
          min={0}
          max={50}
          defaultValue={0}
          value={child}
          onChange={(value) => handleSetChildren && handleSetChildren(value)}
        />
      </Row>
    </div>
  );
};

export default PopupNumberGuest;
