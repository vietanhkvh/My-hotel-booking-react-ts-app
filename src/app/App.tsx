import * as React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { isMobileAndTabletCheck } from '../utils/helpers';
import 'antd/dist/antd.min.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import MyRoutes from '../routes/MyRoutes';
import '../styles/globals.scss';
// import Nopage from '../pages/Nopage/Nopage';
// import Home from '../pages/Home/Home';
// import Users from '../pages/Users/Users';
// import User from '../pages/User/User';
// import MobileLayout from '../components/mobile/layout/MobileLayout';
// import DesktopLayout from '../components/desktop/layout/DesktopLayout/DesktopLayout';
// import Hotel from '../pages/Hotel/Hotel';
// import HotelId from '../pages/Hotel/HotelId/HotelId';
// import Restaurant from '../pages/Restaurant/Restaurant';

export default function App() {
  const [isMobile, setIsMobile] = React.useState(isMobileAndTabletCheck());
  const getWindowSize = () =>
    isMobileAndTabletCheck() ? setIsMobile(true) : setIsMobile(false);

  React.useEffect(() => {
    window.addEventListener('resize', getWindowSize);
    getWindowSize();
  }, []);
  console.log('isMobile', isMobile);
  //router object
  // const routerConfigV6: RouteObject[] = [
  //   {
  //     path: '/',
  //     element: isMobile ? <MobileLayout /> : <DesktopLayout />,
  //     children: [
  //       { index: true, element: <Home /> },
  //       {
  //         path: '/hotel',
  //         element: <Hotel />,
  //         children: [
  //           { index: true, element: <Hotel /> },
  //           { path: '/hotel/:hotelId', element: <HotelId /> },
  //         ],
  //       },
  //       {
  //         path: '/restaurant',
  //         element: <Restaurant />,
  //       },
  //       {
  //         path: '/searching',
  //         element: <Hotel />,
  //       },
  //       { path: '*', element: <Nopage /> },
  //     ],
  //   },
  // ];
  // const element= useRoutes(routerConfigV6);
  return (
    // <Router>
    //   <Routes>
    //   <Route >
    //       <Route index element={<Home />} />
    //       <Route path='home' element={<Home />} />
    //       <Route path='users' element={<Users users={users} />}>
    //         <Route path=':userId' element={<User />} />
    //       </Route>
    //       <Route path='*' element={<Nopage />} />
    //     </Route>
    //   </Routes>
    // </Router>

    // <PermissionProvider {...pageProps} route={router?.route}>
    //   <Component {...pageProps} />
    // </PermissionProvider>

    //<Router>
    //  <Routes>
    //   <Route
    //     path='/'
    //     element={isMobile ? <MobileLayout /> : <DesktopLayout />}
    //   >
    //     {routesAppLeft?.map((i, index) => {
    //       const key = index + 1;
    //       return <Route key={key} path={i?.path} element={<i.component />} />;
    //     })}
    //     <Route path='*' element={<Nopage />} />
    //   </Route>
    // </Routes>
    //</Router>

    <Router>
      <MyRoutes isMobile={isMobile} />
    </Router>
  );
}
