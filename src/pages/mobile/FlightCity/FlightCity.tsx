import { Button, Col, Input, Row } from 'antd';
import { FunctionComponent } from 'react';
import styles from './FlightCity.module.scss';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import clsx from 'clsx';

interface FlightCityProps {
  /**
   * close popup
   */
  handleClose: () => void;
}

const FlightCity: FunctionComponent<FlightCityProps> = (props) => {
  const { handleClose } = props;
  return (
    <div className={styles['flight-city']}>
      <Row className={styles['header']}>
        <Col span={4} className={styles['item-header']}>
          <Button
            className={clsx(styles['btn-close'], styles['item'])}
            icon={<CloseOutlined />}
            onClick={handleClose}
          />
        </Col>
        <Col span={20} className={styles['item-header']}>
          <Input
            className={clsx(styles['input'], styles['item'])}
            size='large'
            prefix={<SearchOutlined />}
            // onChange={onSearch}
          />
        </Col>
      </Row>
    </div>
  );
};

export default FlightCity;
