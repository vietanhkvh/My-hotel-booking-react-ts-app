import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { isMobileAndTabletCheck } from '../utils/helpers';
import 'antd/dist/antd.min.css';
import MyRoutes from '../routes/MyRoutes';

export default function App() {
  const [isMobile, setIsMobile] = React.useState(isMobileAndTabletCheck());
  const getWindowSize = () =>
    isMobileAndTabletCheck() ? setIsMobile(true) : setIsMobile(false);

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
      <MyRoutes />
      {/* <Routes>
        <Route
          path='/'
          element={isMobile ? <MobileLayout /> : <DesktopLayout />}
        >
          {routesAppLeft?.map((i, index) => {
            const key = index + 1;
            return <Route key={key} path={i?.path} element={<i.component />} />;
          })}
          <Route path='*' element={<Nopage />} />
        </Route>
      </Routes> */}
    </Router>
  );
}
