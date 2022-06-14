import { Typography } from 'antd';
import { FunctionComponent } from 'react';
import FlightCardMob from '../FlightCardMob/FlightCardMob';
import styles from './DiscoverMob.module.scss';
import Vietjet from '../../../assest/icons/VietjetAir_transpng.png';
import Bamboo from '../../../assest/icons/bamboo_airway.png';
import { flightInfo } from '../../../const/interface';

const { Title, Text } = Typography;
export const fligthInforA: flightInfo[] = [
  {
    airportFrom: 'Nội Bài',
    airportTo: 'Tân Sơn Nhất',
    depatureDate: '03/06/2022',
    icon: Bamboo,
    airline: 'Bamboo',
    discount: 2,
    firstPrice: 409000,
    price: 404000,
    finnalPrice: 1023720,
  },
  {
    airportFrom: 'Nội Bài',
    airportTo: 'Phú Quốc',
    depatureDate: '06/06/2022',
    icon: Vietjet,
    airline: 'Vietjet',
    discount: 2,
    firstPrice: 369000,
    price: 364000,
    finnalPrice: 999000,
  },
  {
    airportFrom: 'Nội Bài',
    airportTo: 'Đà Nẵng',
    depatureDate: '12/06/2022',
    icon: Bamboo,
    airline: 'Bamboo',
    discount: 2,
    firstPrice: 409000,
    price: 404000,
    finnalPrice: 1023720,
  },
  {
    airportFrom: 'Nội Bài',
    airportTo: 'Cam Ranh',
    depatureDate: '04/06/2022',
    icon: Vietjet,
    airline: 'Vietjet',
    discount: 2,
    firstPrice: 409000,
    price: 404000,
    finnalPrice: 1023720,
  },
];
interface DiscoverMobProps {}

const DiscoverMob: FunctionComponent<DiscoverMobProps> = () => {
  return (
    <div className={styles['discover-mob']}>
      <Title level={3} className={styles['title']}>
        Discover<Text className={styles['detail']}>Detail</Text>
      </Title>

      {fligthInforA.map((f, i) => (
        <FlightCardMob key={i} flightInfo={f} />
      ))}
    </div>
  );
};

export default DiscoverMob;
