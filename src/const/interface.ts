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
  ID_Hotel?: string;
  Hotel_Name?: string;
  Street?: string;
  Ward?: string;
  District?: string;
  City?: string;
  Phone?: string;
  Coupon_Value?: number;
  Min_Price?: number;
  Final_Price?: number;
  Rating_Point?: number;
  Review_Number?: number;
  ID_IMG?: number;
  Image?: any;
}
export interface hotelRoom {
  ID_Room?: string;
  Room_Name?: string;
  ID_Hotel?: string;
  Bed_Number?: number;
  Bathroom_Number?: number;
  Price: number;
  Coupon_Value?: number;
  Final_Price: number;
  ID_Status?: number;
  ID_Type_Room?: string;
}
export interface hotelSeachingCondition {
  location?: string;
  dateIn?: any;
  dateOut?: any;
  rooms?: number;
  adults?: number;
  children?: number;
}
export interface constInterface {
  hotelLocations?: hotelLocation[] | [];
}
export interface AxiosRequestConfig<D = any> {
  url?: string;
  method?: Method;
  baseURL?: string;
}
