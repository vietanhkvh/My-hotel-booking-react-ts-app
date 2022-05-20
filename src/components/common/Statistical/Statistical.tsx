import { Card, DatePicker, Row, Select, Statistic, Typography } from 'antd';
import clsx from 'clsx';
import moment from 'moment';
import { FunctionComponent, ReactNode, useEffect } from 'react';

import styles from './Statistical.module.scss';
const { Title } = Typography;
const { Option } = Select;
interface StatisticalProps {
  title?: string;
  value?: number;
  prefix?: any;
  suffix?: any;
  precision?: number;
  Chart?: () => ReactNode;
  dataSelect?: any;
  yearSelect?: boolean;
  styleYear?:any;
  setDataOption?: (val: any) => void;
  setYearOption?: (val: any) => void;
  heightContent?: number;
  footer?: boolean;
}

const Statistical: FunctionComponent<StatisticalProps> = (props) => {
  const {
    title,
    value,
    prefix,
    suffix,
    precision,
    Chart,
    dataSelect,
    yearSelect,
    styleYear,
    setDataOption,
    setYearOption,
    heightContent,
    footer,
  } = props;

  ////////////////////event
  const onChange = (value) => {
    setDataOption && setDataOption(value);
  };
  const onChangeYear = (date:any, dateString:string) => {
    setYearOption && setYearOption(dateString);
  };
  const onSearch = (val) => {
    console.log('search:', val);
  };
  useEffect(() => {
    setDataOption && setDataOption(dataSelect?.[0]?.ID_Hotel);
  }, [dataSelect, setDataOption]);
  //////////////////////func
  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current && current < moment('01-01-2022').add('-1', 'days').endOf('day');
  };
  return (
    <div className={styles['statistical']}>
      <Card className={styles['container']}>
        {dataSelect ? (
          <Row className={styles['select']}>
            <Select
              className={clsx(styles['select-data'], styles['item'])}
              showSearch
              defaultValue={dataSelect?.[0]?.ID_Hotel}
              placeholder='Select a hotel'
              optionFilterProp='children'
              onChange={onChange}
              onSearch={onSearch}
            >
              {dataSelect?.map((h) => (
                <Option key={h?.ID_Hotel} value={h?.ID_Hotel}>
                  {h?.Hotel_Name}
                </Option>
              ))}
            </Select>
          </Row>
        ) : (
          <></>
        )}
        {yearSelect ? (
          <Row className={clsx(styles['select'], styles['year'])} style={styleYear}>
            <DatePicker
              className={clsx(styles['select-data'], styles['item'])}
              onChange={onChangeYear}
              picker='year'
              defaultValue={moment()}
              disabledDate={disabledDate}
            />
          </Row>
        ) : (
          <></>
        )}
        <Statistic
          className={styles['statistic']}
          title={title}
          value={value}
          prefix={prefix}
          suffix={suffix}
          precision={precision}
        />
        <Row className={styles['content']} style={{ height: heightContent }}>
          {Chart && Chart()}
        </Row>
        <Row
          className={styles['footer']}
          style={{ display: footer ? '' : 'none' }}
        >
          footer
        </Row>
      </Card>
    </div>
  );
};

export default Statistical;
