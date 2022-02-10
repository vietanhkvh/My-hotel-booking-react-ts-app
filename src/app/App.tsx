import * as React from 'react';
import './App.css';
import PermissionProvider from '../modules/permission/PermissionProvider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  checkIsMobile,
  isMobileAndTabletCheck,
  isServer,
} from '../utils/helpers';
import 'antd/dist/antd.min.css';
import { routesAppLeft } from '../routes/routes';
import Nopage from '../pages/Nopage/Nopage';
import DesktopLayout from '../components/desktop/layout/DesktopLayout/DesktopLayout';
import MobileLayout from '../components/mobile/layout/MobileLayout';
export default function App() {
  const [isMobile, setIsMobile] = React.useState(isMobileAndTabletCheck());
  const getWindowSize = () => (window.innerWidth < 768) ? setIsMobile(true) : setIsMobile(false);

  React.useEffect(() => {
      window.addEventListener('resize', getWindowSize);
      getWindowSize();
  }, []);
  console.log('isMobile', isMobile);
  return (
    // <PermissionProvider {...pageProps} route={router?.route}>
    //   <Component {...pageProps} />
    // </PermissionProvider>
    <Router>
      <Routes>
        <Route path='/' element={isMobile ? <MobileLayout/> : <DesktopLayout />}>
          {routesAppLeft?.map((i, index) => {
            const key = index + 1;
            return <Route key={key} path={i?.path} element={<i.component />} />;
          })}
          <Route path='*' element={<Nopage />} />
        </Route>
      </Routes>
    </Router>
  );
}
