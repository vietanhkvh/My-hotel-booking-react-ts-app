import { Method } from 'axios';
import { some } from './keyString';

export interface ActionInterface {
  [key: string]: any;
  payload?: any;
}
export interface userInfoInterface {
  // userInfor: {
  ID_Account?: string;
  ID_Role?: string;
  UserName?: string;
  Password?: string;
  FullName?: string;
  Email?: string;
  Status?: number;
  // };
}
//const static interface for guest login | not login
export interface hotelLocation {
  city?: string;
  quantity?: number;
}
export interface hotelSearching {
  id_hotel?: string;
  hotel_name?: string;
  district?:string;
  phone?:string;
  min_price?:number;
  image?:any;
  rating_point?: number;
  review_Number?:number;
}
export interface constInterface {
  hotelLocations?: hotelLocation[] | [];
}
export interface AxiosRequestConfig<D = any> {
  url?: string;
  method?: Method;
  baseURL?: string;
}
