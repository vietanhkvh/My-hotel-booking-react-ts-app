import {
  constInterface,
  hotelLocation,
  ActionInterface,
  hotelSearching,
  hotelSeachingCondition,
} from '../../const/interface';
import { ConstActions } from '../actions/actionTypes';
export interface constState {
  readonly hotelLocation?: [] | hotelLocation[];
  readonly hotelSearchingByLocation?: [] | hotelSearching[];
  readonly hotelSeachingCondition?: hotelSeachingCondition;
}
const initialState: constState = {
  hotelLocation: [],
  hotelSearchingByLocation: [],
  hotelSeachingCondition: {},
};
const constReducer: (
  state: constState | undefined,
  action: ActionInterface
) => constState = (
  state: constState = initialState,
  action: ActionInterface
) => {
  switch (action.type) {
    case ConstActions.setHotelLocation:
      return { ...state, hotelLocation: action.payload };
    case ConstActions.setHotelSearching:
      return { ...state, hotelSearchingByLocation: action.payload };
    case ConstActions.setHotelSearchingCondition:
      console.log('action.payload', action.payload);
      return { ...state, hotelSeachingCondition: action.payload };
    default:
      return state;
  }
};

export default constReducer;
