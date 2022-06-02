import { Button, Col, Input, Row, Typography } from 'antd';
import { FunctionComponent } from 'react';
import styles from './FlightCity.module.scss';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { city } from '../../../pages/mobile/FlightMobile/dataRaw';

const { Text } = Typography;
interface FlightCityProps {
  /**
   * close popup
   */
  handleClose: () => void;
  /**
   * set city selection
   */
  setCity: (par: any) => void;
}

const FlightCity: FunctionComponent<FlightCityProps> = (props) => {
  const { handleClose, setCity } = props;
  const hanldeSelectCity = (val: any) => {
    setCity && setCity(val);
    handleClose();
  };
  return (
    <div className={styles['flight-city']}>
      <Row className={styles['header']}>
        <Col span={2} className={styles['item-header']}>
          <Button
            className={clsx(styles['btn-close'], styles['item'])}
            icon={<CloseOutlined />}
            onClick={handleClose}
          />
        </Col>
        <Col span={21} className={styles['item-header']}>
          <Input
            className={clsx(styles['input'], styles['item'])}
            size='large'
            prefix={<SearchOutlined />}
            placeholder='Enter the city or airport name'
            // onChange={onSearch}
          />
        </Col>
      </Row>
      <Row className={styles['content']}>
        <Text className={clsx(styles['txt'], styles['title'])}>Popular</Text>

        {city.map((c) => (
          <Text
            key={c.id}
            className={clsx(styles['txt'], styles['city'])}
            onClick={() => hanldeSelectCity(c)}
          >
            {c.text}
          </Text>
        ))}
      </Row>
    </div>
  );
};

export default FlightCity;
