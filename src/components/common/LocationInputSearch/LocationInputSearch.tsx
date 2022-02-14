import { CSSProperties, FunctionComponent, useState } from 'react';
import styles from './LocationInputSearch.module.scss';
import { Select } from 'antd';
import axios from 'axios';
const { Option } = Select;
let timeout;
let currentValue;
function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    // const str = qs.stringify({
    //   code: 'utf-8',
    //   q: value,
    // });
    // fetch(`https://suggest.taobao.com/sug?${str}`)
    //   .then(response => response.json())
    //   .then(d => {
    //     if (currentValue === value) {
    //       const { result } = d;
    //       const data = [];
    //       result.forEach(r => {
    //         data.push({
    //           value: r[0],
    //           text: r[0],
    //         });
    //       });
    //       callback(data);
    //     }
    //   });
  }

  timeout = setTimeout(fake, 300);
}
interface LocationInputSearchProps {
  /**
   * place holder
   */
  placeholder?: string;
  /**
   * style css/scss object
   */
  style?: CSSProperties;

}

const LocationInputSearch: FunctionComponent<LocationInputSearchProps> = (props) => {
  const {placeholder, style} = props
  //state
  const [data, setData] = useState([]);
  const [value, setValue] = useState();
  //event
  const handleSearch = (value) => {
    if (value) {
      fetch(value, (data) => setData(data));
    } else {
      setData(data);
    }
  };
  const handleChange = (value) => {
    setValue(value);
  };
  const options = data.map((d, index) => <Option key={index}>33</Option>);
  return (
    <div className={styles['location-input-search']}>
      <Select
        showSearch
        value={value}
        placeholder={placeholder}
        style={style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
      >
        {options}
      </Select>
    </div>
  );
};

export default LocationInputSearch;
