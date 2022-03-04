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
  Street?:string;
  Ward?:string;
  District?:string;
  City?:string;
  Phone?:string;
  Min_Price?:number;
  Image?:any;
  Rating_Point?: number;
  Review_Number?:number;
}
export interface hotelRoom{
  ID_Room?:string,
  Room_Name?:string,
  ID_Hotel?:string,
  Bed_Number?:number,
  Bathroom_Number?:number,
  Coupon_Value?:number,
  Final_Price?:number,
  ID_Status?:number,
  Type_Room_Name?:string
}
export interface constInterface {
  hotelLocations?: hotelLocation[] | [];
}
export interface AxiosRequestConfig<D = any> {
  url?: string;
  method?: Method;
  baseURL?: string;
}
