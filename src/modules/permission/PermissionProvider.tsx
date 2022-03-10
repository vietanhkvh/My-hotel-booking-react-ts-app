import DesktopLayout from '../../components/desktop/layout/DesktopLayout/DesktopLayout';
import MobileLayout from '../../components/mobile/layout/MobileLayout';
import {
  checkIsMobile,
  isMobileAndTabletCheck,
  isServer,
} from '../../utils/helpers';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { routerConfig } from '../../routes/routerConfig';
// import useNotification from '@hooks/useNotification';
// import useCheckAuthor from './hook/useCheckAuthor';

const tag = "PermissionProvider";
function PermissionProvider(props) {
  const { route, children, ...pageProps } = props;
  //! check permission here
  // useCheckAuthorize();
  const isMobile = isMobileAndTabletCheck(); 
  //?------- get use infor from redux store -------//

  //?--------- get token from url and check with local storage ------//

  //?---------- on client site : show or not show desktop version ----------------------//
  const [showDesktop, setShowDesktop] = useState<boolean | undefined>();

  //?---------------- rendering desktop or mobile content function  -------------------//
  const generatePage = useCallback(
    (mobileRender) => {
      //?--------- Get component need render base on route path -------//
      const Component: any =
        routerConfig?.[route]?.component?.[mobileRender ? "mobile" : "desktop"];
        console.log('Component', Component)
      //?--------- Check component has individual layout or not ----//
      const DefaultLayout = mobileRender ? MobileLayout : DesktopLayout;
      const Layout = Component?.layout ? Component?.layout : DefaultLayout;
      const Content = Component?.page ? Component?.page : Component;
      if (
        (mobileRender && isMobile === false) ||
        (!mobileRender && isMobile === true)
      ) {
        return null;
      }

      return (
        <Layout route={route}>
          {Content ? <Content {...pageProps} /> : ""}
        </Layout>
      );
    },
    [isMobile, pageProps, route]
  );

  //?---------- desktop content --------------//
  const desktopPage = useMemo(() => {
    return generatePage(false);
  }, [generatePage]);

  //?----------- mobile content --------------//
  const mobilePage = useMemo(() => {
    return generatePage(true);
  }, [generatePage]);

  //?-------------- if static rendering then check is mobile or desktop mode on client site --------------//
  useEffect(() => {
    if (props?.isMobile === undefined) {
      setShowDesktop(!isMobile);
    }
  }, [isMobile, props?.isMobile]);

  //?--------- If component is not in config router then return root component in pages folder  ----//
  if (!routerConfig?.[route]) {
    return children;
  }

  if (props?.isMobile === undefined) {
    return (
      <>
        <main style={{ display: showDesktop === true ? "block" : "none" }}>
          {desktopPage}
        </main>
        <main style={{ display: showDesktop === false ? "block" : "none" }}>
          {mobilePage}
        </main>
      </>
    );
  }
  return <main>{props?.isMobile ? mobilePage : desktopPage}</main>;
}


export default PermissionProvider;
