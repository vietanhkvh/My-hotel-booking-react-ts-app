import UserInfor from '../../components/common/UserInfor/UserInfor';
import { FunctionComponent } from 'react';
import {  useParams } from 'react-router-dom';
import styles from './User.module.scss';
interface UserProps {
  /**
   * user
   */
  users?: any[];
}

const User: FunctionComponent<UserProps> = (props) => {
  const { idUser } = useParams();
  return (
    <div className={styles['user']}>
      <UserInfor/>
    </div>
  );
};

export default User;
