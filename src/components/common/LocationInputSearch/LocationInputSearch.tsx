import { CSSProperties, FunctionComponent, useState } from 'react';
import styles from './LocationInputSearch.module.scss';
import { Select } from 'antd';
import axios from 'axios';
import { some } from '@const/keyString';
import { dataRaw } from './rawData';
const { Option } = Select;

interface LocationInputSearchProps {
  /**
   * place holder
   */
  placeholder?: string;
  /**
   * style css/scss object
   */
  style?: CSSProperties;
  /**
   * location string
   */
  location?: string;
  /**
   * set location
   */
  handleSetLocation?: (val:any) => void;
}

const LocationInputSearch: FunctionComponent<LocationInputSearchProps> = (
  props
) => {
  const { placeholder, style, handleSetLocation } = props;

  //state
  const [data, setData] = useState<some[]>(dataRaw);
  const options = data.map((d:some, index) => <Option key={d?.value}>{d?.text}</Option>);
  //event
  const callApi = (value: any, callback: (data: any) => void) => {
    //call api here, return a array, then replace dataRaw

    if (currentValue === value) {
      const data: some[] = [];
      dataRaw.forEach((r:some) => {
        data.push({
          value: r?.value,
          text: r?.text,
        });
      });
      callback(data);
    }
  };
  let currentValue: any;
  const fetch = (value: any, callback: (data: any) => void) => {
    currentValue = value;
    callApi(value, callback);
  };
  const handleSearch = (value: any) => {
    if (value) {
      fetch(value, (data: any) => setData(data));
    } else {
      setData([]);
    }
  };
  const handleChange = (value: any) => {
    handleSetLocation && handleSetLocation(value);
  };
  return (
    <div className={styles['location-input-search']}>
      <Select
        className={styles['input']}
        showSearch
        placeholder={placeholder}
        style={style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        size={'large'}
      >
        {options}
      </Select>
    </div>
  );
};

export default LocationInputSearch;
