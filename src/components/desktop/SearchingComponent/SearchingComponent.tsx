import HotelSearching from '../../common/HotelSearching/HotelSearching';
import RestaurantSearching from '../../common/RestaurantSearching/RestaurantSearching';
import { Menu, Row, Typography } from 'antd';
import { FunctionComponent, useCallback, useState } from 'react';
import styles from './SearchingComponent.module.scss';
const { Text } = Typography;
interface SearchingComponentProps {}

const SearchingComponent: FunctionComponent<SearchingComponentProps> = () => {
  //state
  const [keySelected, setKeySelected] = useState('hotel');

  //event
  const handleClickMenu = useCallback((e: any) => {
    setKeySelected(e?.key);
  }, []);
  const handlerTab = () => {
    return keySelected === 'hotel' ? (
      <HotelSearching />
    ) : (
      <RestaurantSearching />
    );
  };
  return (
    <Row className={styles['searching-component']}>
      <Menu
        style={{
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
        }}
        mode='horizontal'
        defaultSelectedKeys={['hotel']}
        selectedKeys={[keySelected]}
        onClick={(e) => handleClickMenu(e)}
      >
        <Menu.Item key={'hotel'}>
          <Text>Hotel</Text>
        </Menu.Item>
        <Menu.Item key={'restaurant'}>
          <Text>Restaurant</Text>
        </Menu.Item>
      </Menu>
      <Row className={styles['content']}>{handlerTab()}</Row>
    </Row>
  );
};

export default SearchingComponent;
