// import A from '../components/desktop/a';
// import B from '../components/mobile/b';
import DesktopLayout from '../components/desktop/layout/DesktopLayout/DesktopLayout';
import MobileLayout from '../components/mobile/layout/MobileLayout';
import Hotel from '../pages/Hotel/Hotel';
import Restaurant from '../pages/Restaurant/Restaurant';
// import DesktopHomePage from '../components/desktop/home/DesktopHomePage';
import MobileHomePage from '../components/mobile/home/MobileHomePage';
import Home from '../pages/Home/Home';
import Searching from '../pages/Searching/Searching';
export const routesPath = {
  HOME: '',
  HOTEL: '/hotel',
  HOTELCHILD: '/hotel/:id',
  RESTAURANT: '/restaurant',
  SEARCHING: '/seaching',
};

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
export const routerConfig = [
  // DEFAULT
  // {
  //   path: routesPath.HOME,
  //   component: {
  //     desktop: {
  //       page: A,
  //       layout: DesktopLayout,
  //     },
  //     mobile: {
  //       page: B,
  //       layout: MobileLayout
  //     },
  //   },
  //   needAuthor: false,
  //   grantPermision: [],
  // },
  {
    path: routesPath.HOME,
    component: {
      desktop: {
        page: Home,
        layout: DesktopLayout,
      },
      mobile: {
        page: MobileHomePage,
        layout: MobileLayout,
      },
    },
    needAuthor: false,
    grantPermision: [],
  },
  {
    path: routesPath.HOTEL,
    component: {
      desktop: {
        page: Hotel,
        layout: DesktopLayout,
      },
      mobile: Hotel,
    },
    needAuthor: false,
    grantPermision: [],
  },
  {
    path: routesPath.RESTAURANT,
    component: {
      desktop: {
        page: Restaurant,
        layout: DesktopLayout,
      },
      mobile: Restaurant,
    },
    needAuthor: false,
    grantPermision: [],
  },
  {
    path: routesPath.SEARCHING,
    component: {
      desktop: {
        page: Searching,
        layout: DesktopLayout,
      },
      mobile: Searching,
    },
    needAuthor: false,
    grantPermision: [],
  },
];
