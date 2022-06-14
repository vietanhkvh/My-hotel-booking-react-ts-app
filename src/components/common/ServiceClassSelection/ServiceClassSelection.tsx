import { Col, Row, Typography } from 'antd';
import { FunctionComponent } from 'react';
import styles from './ServiceClassSelection.module.scss';
import Stick from '../../../assest/icons/stick-checked';
import clsx from 'clsx';
import { IServiceOp } from '../FlightSearching/FlightSearching';

const { Text } = Typography;

interface ServiceClassSelectionProps {
  /**
   * array data show
   */
  array: Array<IServiceOp>;
  /**
   * set Data Array
   */
  setDataArray: (par: Array<IServiceOp>) => void;
  /**
   * setServiceStr
   */
  setServiceStr: (par: Array<IServiceOp>) => void;
}

const ServiceClassSelection: FunctionComponent<ServiceClassSelectionProps> = (
  props
) => {
  const { array, setDataArray, setServiceStr } = props;
  const handleSelectSer = (title: string) => {
    const temp = array.map((a) => {
      if (a.title === title) {
        a.selected = !a.selected;
        return a;
      } else {
        return a;
      }
    });
    setDataArray(temp);
    setServiceStr(temp);
  };
  return (
    <Row
      className={styles['service-class-selection']}
      onClick={(e) => e.stopPropagation()}
    >
      {array.map((a) => (
        <Row className={styles['item-container']} key={a.title}>
          <Col span={22} className={styles['item']}>
            <Text
              className={clsx(
                styles['font'],
                styles['title'],
                a.selected && styles['selected']
              )}
              onClick={() => handleSelectSer(a.title)}
            >
              {a.title}
            </Text>
            <Text className={styles['font']}>{a.detail}</Text>
          </Col>
          <Col span={2} className={styles['item']}>
            {a.selected ? (
              <Stick className={clsx(styles['font'], styles['selected'])} />
            ) : (
              ''
            )}
          </Col>
        </Row>
      ))}
    </Row>
  );
};

export default ServiceClassSelection;
