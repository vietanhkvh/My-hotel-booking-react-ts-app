import { useEffect, useState } from 'react';
import { isMobileAndTabletCheck } from '../utils/helpers';
import { Route, RouteObject, Routes } from 'react-router-dom';
import { routerConfig } from './routerConfig';
import MobileLayout from '../components/mobile/layout/MobileLayout';
import DesktopLayout from '../components/desktop/layout/DesktopLayout/DesktopLayout';
import Home from '../pages/Home/Home';
import Hotel from '../pages/Hotel/Hotel';
import Users from '../pages/Users/Users';
import User from '../pages/User/User';
import Searching from '../pages/Searching/Searching';
import HotelId from '../pages/Hotel/HotelId/HotelId';
import Restaurant from '../pages/Restaurant/Restaurant';
import Nopage from '../pages/Nopage/Nopage';
import ConfirmPay from '../pages/ConfirmPay/ConfirmPay';
import Success from '../pages/Success/Success';

const MyRoutes = (props) => {
  const { isMobile } = props;
  const [Update, setUpdate] = useState(Date.now());
  //   const isMobileDisplay = useRef(isMobileAndTabletCheck());
  //   const isMobile = isMobileAndTabletCheck();
  useEffect(() => {
    const check = () => {
      // setTimeout(checkDisplayType, 0);
      setUpdate(Date.now());
      setTimeout(() => setUpdate(Date.now()), 0);
    };
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('resize', check);
    };
  }, []);

  return (
    <Routes>
      <Route
        path={'/'}
        element={isMobile ? <MobileLayout /> : <DesktopLayout />}
      >
        <Route path={''} element={<Home />} />

        <Route path='hotel' element={<Hotel />}>
          <Route path=':hotelId' element={<HotelId />} />
        </Route>

        <Route path={'/restaurant'} element={<Restaurant />} />

        <Route path={'/searching'} element={<Searching />} />

        <Route path='users' element={<Users />}>
          <Route path=':userId' element={<User />} />
        </Route>

        <Route path={'*'} element={<Nopage />} />
        {/* {routerConfig.map((r: any) => {
        const { component, needAuthor, grantPermision, ...rest } = r;
        const mode = isMobileAndTabletCheck() ? 'mobile' : 'desktop';

        const Component =
          r?.component?.[mode]?.page || r?.component?.[mode] || r?.component;

        const ChildComponent =
          r?.componentChild?.[mode]?.page ||
          r?.componentChild?.[mode] ||
          r?.componentChild;
        const PublicLayout = isMobileAndTabletCheck()
          ? MobileLayout
          : DesktopLayout;

        const Layout =
          r?.component?.[mode]?.layout || r?.['layout'] || PublicLayout;
        return (
          // <Route key={r?.path} path={'/'} element={<Layout />}>
            !r?.childPath ? (
              <Route path={r?.path} element={<Component />}>
                <Route
                  path={r?.childPath}
                  element={<ChildComponent />}
                />
              </Route>
            ) : (
              <>
                {console.log('r childPath 2')}
                <Route path={r?.path} element={<Component {...rest} />} />
              </>
            )
          // </Route>
        );
      })} */}
      </Route>
          <Route path='book' element={<ConfirmPay />} />
          <Route path='book-success' element={<Success />} /> 
    </Routes>
  );
};
export default MyRoutes;
