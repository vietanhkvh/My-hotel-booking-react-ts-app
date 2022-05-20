import { UserActions } from './actionTypes';
import { ActionInterface } from '../../const/interface';
export const setUserInforAction: (payload: any) => ActionInterface = (
    payload
  ) => ({
    type: UserActions.setUserInfor,
    payload,
  });