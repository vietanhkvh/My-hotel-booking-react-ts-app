import { useEffect, useState } from 'react';
import { isMobileAndTabletCheck } from '../utils/helpers';
import { Route, Routes } from 'react-router-dom';
import { routerConfig } from './routerConfig';
import MobileLayout from '../components/mobile/layout/MobileLayout';
import DesktopLayout from '../components/desktop/layout/DesktopLayout/DesktopLayout';

const MyRoutes = () => {
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
      {routerConfig.map((r:any) => {
        const { component, needAuthor, grantPermision, ...rest } = r;
        const mode = isMobileAndTabletCheck() ? 'mobile' : 'desktop';

        const Component =
          r?.component?.[mode]?.page || r?.component?.[mode] || r?.component;

      const PublicLayout = isMobileAndTabletCheck()
          ? MobileLayout
          : DesktopLayout;

        const Layout =
          r?.component?.[mode]?.layout || r?.['layout'] || PublicLayout;
        return (
          <Route key={r.path} {...rest} path={'/'} element={<Layout/>}>
            <Route path={r?.path} element={<Component {...rest} />}/>
           </Route>
        );
      })}
    </Routes>
  );
};
export default MyRoutes;
