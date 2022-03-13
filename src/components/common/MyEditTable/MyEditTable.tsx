// import { room } from '../../../const/interface';
import { Button, Form, Input, InputNumber, Select, Table } from 'antd';
import { FunctionComponent } from 'react';
import styles from './MyEditTable.module.scss';


interface MyEditTableProps {
  mergedColumns?: any;
  data?: any[];
  cancel?: () => void;
  form?: any;
  EditableCell?: any;
}

const MyEditTable: FunctionComponent<MyEditTableProps> = (props) => {
  const { mergedColumns, data, cancel, form , EditableCell} = props;

  return (
    <div className={styles['my-edit-table']}>
      {console.log('data',data)}
      <Form form={form} component={false}>
        <Table
          columns={mergedColumns}
          dataSource={data}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          rowClassName={styles['editable-row']}
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
};

export default MyEditTable;
