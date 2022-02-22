import Restaurant from '../pages/Restaurant/Restaurant';
import Home from '../pages/Home/Home';
import { IRoute } from '../interfaces';
import RestaurantIc from '../assest/icons/restaurant-mob-32.png';
import HotelIc from '../assest/icons/bed-mob-32.png';
// import HomeIc from '../assest/icons/home-mob-16.png';
// import UserIc from '../assest/icons/user-mob-16.png';
// import PhoneIc from '../assest/icons/phone-mob-16.png';
import Hotel from '../pages/Hotel/Hotel';
import { UserOutlined, HomeOutlined, PhoneOutlined } from '@ant-design/icons';

export const routes: IRoute[] = [
  {
    title: 'hotel',
    path: 'hotel',
    exact: true,
    component: Hotel,
    icon: HotelIc,
  },
  {
    title: 'restaurant',
    path: 'restaurant',
    exact: true,
    component: Restaurant,
    icon: RestaurantIc,
  },
];
export const routesAppLeft: IRoute[] = [
  {
    title: 'home',
    path: '',
    exact: true,
    component: Home,
  },
  {
    title: 'hotel',
    path: 'hotel',
    exact: true,
    component: Hotel,
    icon: HotelIc,
  },
  {
    title: 'restaurant',
    path: 'restaurant',
    exact: true,
    component: Restaurant,
    icon: RestaurantIc,
  },
];
export const routesMenu: IRoute[] = [
  {
    title: 'home',
    path: '',
    exact: true,
    component: Home,
    icon: HomeOutlined,
  },
  {
    title: 'account',
    path: 'account',
    exact: true,
    component: Restaurant,
    icon: UserOutlined,
  },
  {
    title: 'contact',
    path: 'contact',
    exact: true,
    component: Restaurant,
    icon: PhoneOutlined,
  },
];

