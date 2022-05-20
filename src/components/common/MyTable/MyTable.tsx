import { Table } from 'antd';
import { FunctionComponent, useEffect } from 'react';
import styles from './MyTable.module.scss';
interface MyTableProps {
  columns?: any;
  data?: any;
  setData?: (val: any) => void;
  param?: any | any[];
  getData?: (val: any | any[]) => void;
}

const MyTable: FunctionComponent<MyTableProps> = (props) => {
  /////////////////////states
  const { columns, data, getData, setData, param } = props;

  ////////////////////event
  useEffect(() => {
    getData && getData(param);
    return () => setData && setData([]);
  }, [getData, param, setData]);
  return (
    <div className={styles['my-table']}>
      {console.log('data',data)}
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default MyTable;
