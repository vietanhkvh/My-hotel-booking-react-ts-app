import { Row, Typography } from 'antd';
import { FunctionComponent } from 'react';
import styles from './BtnAccount.module.scss';
const { Text } = Typography;
interface BtnAccountProps {}

const BtnAccount: FunctionComponent<BtnAccountProps> = () => {
  return (
    <div className={styles['btn-account']}>
      <Row className={styles['container']}>
        <Text className={styles['text']}>Đăng nhập</Text>
      </Row>
      <Row className={styles['container']}>
        <Text className={styles['text']}>Đăng ký</Text>
      </Row>
    </div>
  );
};

export default BtnAccount;
