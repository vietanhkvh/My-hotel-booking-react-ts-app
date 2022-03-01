import { ConstActions } from './actionTypes';
import { ActionInterface } from '../../const/interface';
export const setHotelLocationAction: (payload: any) => ActionInterface = (
  payload
) => ({
  type: ConstActions.setHotelLocation,
  payload,
});
export const setHotelSearchingByLocation: (payload: any) => ActionInterface = (
  payload
) => ({
  type: ConstActions.setHotelSearching,
  payload,
});
