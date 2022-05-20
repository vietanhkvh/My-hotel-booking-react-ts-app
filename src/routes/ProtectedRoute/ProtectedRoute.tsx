import { FunctionComponent } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import styles from './ProtectedRoute.module.scss';
interface ProtectedRouteProps {
  isAllowed?: boolean;
  redirectPath?: string;
  children?: any;
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = (props) => {
  const { isAllowed, redirectPath = '/home', children } = props;
  return (
    <div className={styles['protected-route']}>
      {!isAllowed ? (
        <Navigate to={redirectPath} replace/>
      ) : children ? (
        children
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default ProtectedRoute;
