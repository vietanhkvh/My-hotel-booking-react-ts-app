import { Button, Col, Row, Typography } from 'antd';
import { FunctionComponent, useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { IPassengerOp } from '../FlightSearching/FlightSearching';
import styles from './PassengerSelection.module.scss';
import clsx from 'clsx';
const { Text } = Typography;
interface PassengerSelectionProps {
  /**
   * array data show
   */
  array: Array<IPassengerOp>;
  /**
   * set Data Array
   */
  setDataArray: (par: Array<any>) => void;
  /**
   * close popup outer
   */
  setIsPopupPassenger: (par: boolean) => void;
}

const PassengerSelection: FunctionComponent<PassengerSelectionProps> = (
  props
) => {
  const { array, setDataArray, setIsPopupPassenger } = props;
  ////////////////states

  ///////////////events
  const handleClickIncrease = (max: number, title: string) => {
    // setValue((preval) => (preval === max ? preval : preval + 1));
    const temp = array.map((a) => {
      if (a.title === title && a.value < max) {
        a.value = a.value + 1;
        return a;
      } else {
        return a;
      }
    });
    setDataArray(temp);
  };
  const handleClickDecrease = (min: number, title: string) => {
    // setValue((preval) => (preval === min ? preval : preval - 1));
    const temp = array.map((a) => {
      if (a.title === title && a.value > min) {
        a.value = a.value - 1;
        return a;
      } else {
        return a;
      }
    });
    setDataArray(temp);
  };
  return (
    <Row
      className={styles['passenger-selection']}
      onClick={(e) => e.stopPropagation()}
    >
      {array.map((a) => (
        <Row className={styles['item-container']} key={a.title}>
          <Col className={styles['item']} span={16}>
            <Text className={styles['text-normal']}>{a.title}</Text>
            {a?.note ? (
              <Text className={clsx(styles['text-normal'], styles['note'])}>
                {' '}
                ({a?.note})
              </Text>
            ) : (
              ''
            )}
          </Col>
          <Col span={8} className={clsx(styles['item'], styles['in-decrease'])}>
            <Button
              className={styles['btn']}
              shape='circle'
              icon={<MinusOutlined />}
              onClick={() => handleClickDecrease(a.minVal, a.title)}
            />
            <Text className={styles['text-normal']}>{a?.value}</Text>
            <Button
              className={styles['btn']}
              shape='circle'
              icon={<PlusOutlined />}
              onClick={() => handleClickIncrease(a.maxVal, a.title)}
            />
          </Col>
        </Row>
      ))}
      <Row className={styles['footer-btn']}>
        <Button className={styles['btn-footer']}>
          <Text
            className={styles['text']}
            onClick={() => setIsPopupPassenger(false)}
          >
            Cancel
          </Text>
        </Button>
        <Button className={clsx(styles['btn-footer'], styles['selector'])}>
          <Text className={clsx(styles['text'], styles['select'])}>Select</Text>
        </Button>
      </Row>
    </Row>
  );
};

export default PassengerSelection;
