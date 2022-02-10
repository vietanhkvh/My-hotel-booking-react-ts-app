import A from '../components/desktop/a';
import B from '../components/mobile/b';
import DesktopLayout from '../components/desktop/layout/DesktopLayout/DesktopLayout';
import MobileLayout  from '../components/mobile/layout/MobileLayout';
export const routesPath = {
  HOME: '',
};
const DesktopHome =
  () => import('../components/desktop/home/DesktopHomePage')
;
const MobileHome =
  () => import('../components/mobile/home/MobileHomePage')

/**
 *? There are 2 type of component values:
    //? type 1
    component: {
      desktop: {
        page: DesktopHome,
        layout: DesktopLayout_1, //? if you need to defined individual layout for desktop component
      },
      mobile: MobileHome,
    }
    //? type 2
    component: {
      desktop: DesktopHome, //? use default desktop layout : src/components/desktop/layout/DesktopLayout.tsx
      mobile: MobileHome,
    }
 */
export const routerConfig = {
  [routesPath.HOME]: {
    component: {
      desktop: {
        page: A,
        layout: DesktopLayout,
      },
      mobile: { page: B, layout: MobileLayout },
    },
    needAuthor: true,
    grantPermision: [],
  },
};
