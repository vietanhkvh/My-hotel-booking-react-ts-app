import { FunctionComponent } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './Users.module.scss';
interface UsersProps {
}

const Users: FunctionComponent<UsersProps> = (props) => {
  const users = [
    { id: '1', fullName: 'Robin Wieruch' },
    { id: '2', fullName: 'Sarah Finnley' },
  ];
  return (
    <div className={styles['users']}>
      <h2>Users</h2>

      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.fullName}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};

export default Users;
