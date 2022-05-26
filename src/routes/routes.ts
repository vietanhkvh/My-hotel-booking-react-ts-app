import Restaurant from "../pages/Restaurant/Restaurant";
import Home from "../pages/Home/Home";
import { IRoute } from "../interfaces";
import RestaurantIc from "../assest/icons/restaurant-mob-32.png";
import HotelIc from "../assest/icons/bed-mob-32.png";
// import HomeIc from '../assest/icons/home-mob-16.png';
// import UserIc from '../assest/icons/user-mob-16.png';
// import PhoneIc from '../assest/icons/phone-mob-16.png';
import Hotel from "../pages/Hotel/Hotel";
import { UserOutlined, HomeOutlined, PhoneOutlined } from "@ant-design/icons";
import HotelRoomIC from "../assest/icons/hotel-room-100.png";
import HotelManager from "../pages/Host/HotelManager/HotelManager";
import RoomManager from "../pages/Host/RoomManager/RoomManager";
import ImagesManager from "../pages/Host/ImagesManager/ImagesManager";
import CouponsManager from "../pages/Host/CouponManager/CouponManager";

export const routes: IRoute[] = [
  {
    title: "hotel",
    path: "/hotel",
    exact: true,
    component: Hotel,
    icon: HotelIc,
    active: false,
  },
  {
    title: "restaurant",
    path: "/restaurant",
    exact: true,
    component: Restaurant,
    icon: RestaurantIc,
    active: false,
  },
];
export const routesAppLeft: IRoute[] = [
  {
    title: "home",
    path: "",
    exact: true,
    component: Home,
  },
  {
    title: "hotel",
    path: "hotel",
    exact: true,
    component: Hotel,
    icon: HotelIc,
  },
  {
    title: "restaurant",
    path: "restaurant",
    exact: true,
    component: Restaurant,
    icon: RestaurantIc,
  },
];
export const routesMenu: IRoute[] = [
  {
    title: "home",
    path: "",
    exact: true,
    component: Home,
    icon: HomeOutlined,
  },
  {
    title: "account",
    path: "account",
    exact: true,
    component: Restaurant,
    icon: UserOutlined,
  },
  {
    title: "contact",
    path: "contact",
    exact: true,
    component: Restaurant,
    icon: PhoneOutlined,
  },
];
export const routeGuest: IRoute[] = [
  {
    title: "Hotel",
    path: "hotel-manager",
    exact: true,
    component: HotelManager,
    icon: HomeOutlined,
  },
  {
    title: "Room",
    path: "room-manager",
    exact: true,
    component: RoomManager,
    icon: HotelRoomIC,
  },
  {
    title: "Images",
    path: "image-manager",
    exact: true,
    component: ImagesManager,
    icon: PhoneOutlined,
    child: [
      {
        title: "Hotel",
        path: "hotel-images",
        exact: true,
        component: ImagesManager,
        icon: PhoneOutlined,
      },
      {
        title: "Room",
        path: "room-images",
        exact: true,
        component: ImagesManager,
        icon: PhoneOutlined,
      },
    ],
  },
  {
    title: "Coupon",
    path: "coupon-manager",
    exact: true,
    component: CouponsManager,
    icon: PhoneOutlined,
  },
];
