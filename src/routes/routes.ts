import Restaurant from '../pages/Restaurant/Restaurant';
import Home from '../pages/Home/Home';
import { IRoute } from '../interfaces';

export const routes:IRoute[] = [
  {
    title: 'home',
    path: '',
    exact:true,
    component: Home
  },
  {
    title: 'restaurant',
    path: 'restaurant',
    exact:true,
    component: Restaurant
  },
];
