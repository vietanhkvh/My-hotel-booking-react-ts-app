import { Col, Row, Typography, Image } from 'antd';
import clsx from 'clsx';
import { FunctionComponent } from 'react';
import Vietjet from '../../../assest/icons/VietjetAir_transpng.png';
import styles from './FlightCardMob.module.scss';
import { flightInfo } from '../../../const/interface';
import Into from '../../../assest/icons/into';
import { convertVND } from '../../../utils/helpers';
const { Text, Title } = Typography;
interface FlightCardMobProps {
  flightInfo: flightInfo;
}

const FlightCardMob: FunctionComponent<FlightCardMobProps> = (props) => {
  const { flightInfo } = props;
  return (
    <Row className={styles['flight-card-mob']}>
      <Col span={18} className={styles['location']}>
        <Row className={styles['airport']}>
          <Text className={styles['name']}>{flightInfo.airportFrom}</Text>
          <Into className={styles['into-ic']} />
          <Text className={styles['name']}>{flightInfo.airportTo}</Text>
        </Row>
        <Row className={styles['date']}>
          <Text className={styles['text']}>
            Depature: {flightInfo.depatureDate}
          </Text>
        </Row>
        <Row className={styles['airline']}>
          <Image
            className={styles['icon']}
            src={flightInfo.icon}
            preview={false}
          />
          <Text className={styles['name']}>{flightInfo.airline}</Text>
        </Row>
      </Col>
      <Col span={6} className={styles['price']}>
        <div className={clsx(styles['circel'], styles['top'])} />
        <Row className={styles['info']}>
          {flightInfo?.discount && (
            <Text
              className={clsx(
                styles['text'],
                styles['discount'],
                styles['line-sm']
              )}
            >
              -{flightInfo?.discount}%
            </Text>
          )}
          {flightInfo?.firstPrice && (
            <Text className={clsx(styles['text'], styles['first-price'])}>
              {convertVND('sufix', '.', 0, 'đ', flightInfo?.firstPrice!)}
            </Text>
          )}
          <Text
            className={clsx(styles['text'], styles['line-sm'], styles['price'])}
          >
            {convertVND('sufix', '.', 0, 'đ', flightInfo.price)}
          </Text>
          <Text className={clsx(styles['text'], styles['line-sm'])}>
            After taxes:
          </Text>
          <Text className={clsx(styles['text'], styles['line-sm'])}>
            {convertVND('sufix', '.', 0, 'đ', flightInfo.finnalPrice)}
          </Text>
        </Row>
        <div className={clsx(styles['circel'], styles['bottom'])} />
      </Col>
    </Row>
  );
};

export default FlightCardMob;
