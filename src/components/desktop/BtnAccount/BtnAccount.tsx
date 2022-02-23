import { Row, Typography } from 'antd';
import { FunctionComponent } from 'react';
import styles from './BtnAccount.module.scss';
const { Text } = Typography;
interface BtnAccountProps {
  /**
   * isMobile
   */
  isMobile?: boolean;
  /**
   * handleOpen
   */
  handleOpen?: (val: string) => void;
}

const BtnAccount: FunctionComponent<BtnAccountProps> = (props) => {
  const { isMobile, handleOpen } = props;
  return (
    <div className={styles['btn-account']}>
      <Row
        className={styles['container']}
        onClick={() =>
          isMobile
            ? 'router.push(routesPath.login)'
            : handleOpen && handleOpen('LOGIN')
        }
      >
        <Text className={styles['text']}>Log in</Text>
      </Row>
      <Row className={styles['container']}>
        <Text className={styles['text']}>Sign up</Text>
      </Row>
    </div>
  );
};

export default BtnAccount;
