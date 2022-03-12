import { hotel } from "../../../const/interface";
import { FunctionComponent } from "react";
import styles from "./EditableCell.module.scss";
import { Form, Input, InputNumber } from "antd";
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: hotel;
  index: number;
  children: React.ReactNode;
}
const EditableCell: FunctionComponent<EditableCellProps> = (props) => {
  const {editing,dataIndex,title,inputType,record,index,children} =props
  ///////////////////////////states
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  //////////////////////////event
  return <div className={styles['editable-cell']}>
    <td {...props}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  </div>;
}
 
export default EditableCell;