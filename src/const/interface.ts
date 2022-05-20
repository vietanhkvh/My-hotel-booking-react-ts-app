import { Method } from 'axios';
import { some } from './keyString';

export interface ActionInterface {
  [key: string]: any;
  payload?: any;
}
export interface userInfoInterface {
  // userInfor: {
  ID_Account?: number;
  ID_Role?: string;
  UserName?: string;
  Password?: string;
  FullName?: string;
  Email?: string;
  Phone?: string;
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
  Imgs?: any;//array images string
  Image?:any;// one image
}
export interface hotelRoom {
  ID_Room?: string;
  Room_Name?: string;
  ID_Hotel?: string;
  Hotel_Name?: string;
  Bed_Number?: number;
  Bathroom_Number?: number;
  Price: number;
  ID_Coupon?: string;
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
export interface hotel {
  key?: string;
  ID_Hotel?: string;
  Hotel_Name?: string;
  City?: string;
  District?: string;
  Ward?: string;
  Street?: string;
  Phone?: string;
  ID_Status?: number;
  ID_Account?: number;
}
export interface room {
  ID_Room?: string;
  Room_Name?: string;
  ID_Hotel?: string;
  Bed_Number?: number;
  Bathroom_Number?: number;
  Price: number;
  ID_Status?: number;
  ID_Type_Room?: string;
  ID_Payment?: string;
}
export interface typeRooms {
  ID_Type_Room?: string;
  Type_Room_Name?: string;
}
export interface image {
  ID_Hotel?: string;
  ID_IMG?: number;
  ID_Room?: string;
  Image?: any;
}
export interface coupon {
  ID_Coupon?: number;
  ID_Hotel?: string;
  Name?: string;
  Value?: number;
  State_Date?: any;
  End_Date?: any;
  ID_Status?: number;
  ID_Type_Room?: string;
}
export interface payment {
  ID_Payment?: string;
  ID_Payment_D?: string;
  ID_Account?: string;
  Hotel_Name?: string;
  Room_Name?: string;
  Guest_Number?: number;
  First_Total?: number;
  ID_Coupon?: number;
  Final_Total?: number;
  Date_In?: any;
  Date_out?: any;
  Status?: number;
  ID_Room?: string;
  ID_Rating?: number;
  Rate_Counting?: number;
  Rate_Detail?: string;
}
export interface cartItem {
  ID_Hotel?: string;
  Hotel_Name?: string;
  ID_Room?: string;
  Room_Name?: string;
  Bed_Number?: number;
  ID_Coupon?: string;
  Coupon_Value?: number;
  Price?: number;
  Final_Price?: number;
  Rating_Point?: number;
  Review_Number?: number;
  ID_Type_Room?: string;
  Image_Room?: any;
  Image_Hotel?: any;
  Date_In?: any;
  Date_Out?: any;
}
export interface ratingInfor{
  ID_Rating?:number,
  Rate_Counting?:number,
  Rate_Detail?:string,
  FullName?:string,
  Date_Out?:any
}
