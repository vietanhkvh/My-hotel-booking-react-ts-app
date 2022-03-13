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
export const setHotelSearchingCondition: (payload: any) => ActionInterface = (
  payload
) => ({
  type: ConstActions.setHotelSearchingCondition,
  payload,
});
export const setHotelManager: (payload: any) => ActionInterface = (
  payload
) => ({
  type: ConstActions.setHotelManager,
  payload,
});
export const setTypesRoom: (payload: any) => ActionInterface = (
  payload
) => ({
  type: ConstActions.setTypesRoom,
  payload,
});
