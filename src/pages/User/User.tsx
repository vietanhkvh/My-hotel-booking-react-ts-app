import { FunctionComponent } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './User.module.scss';
interface UserProps {
  /**
   * user
   */
  users?: any[];
}

const User: FunctionComponent<UserProps> = (props) => {
  const { userId } = useParams();
  return (
    <div className={styles['user']}>
      <h2>User: {userId}</h2>

      <Link to='/users'>Back to Users</Link>
    </div>
  );
};

export default User;
