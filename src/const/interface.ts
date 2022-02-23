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
export interface AxiosRequestConfig<D = any> {
  url?: string;
  method?: Method;
  baseURL?: string;
}
