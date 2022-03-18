import { FunctionComponent } from "react";
import styles from "./EditableFormRow.module.scss";
interface EditableFormRowProps {
  
}
 
const EditableFormRow: FunctionComponent<EditableFormRowProps> = () => {
  return <div className={styles['editable-form-row']}>EditableFormRow</div>;
}
 
export default EditableFormRow;