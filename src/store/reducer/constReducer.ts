import {
  constInterface,
  hotelLocation,
  ActionInterface,
  hotelSearching,
  hotelSeachingCondition,
  hotel,
  typeRooms,
} from '../../const/interface';
import { ConstActions } from '../actions/actionTypes';
export interface constState {
  readonly hotelLocation?: [] | hotelLocation[];
  readonly hotelSearchingByLocation?: [] | hotelSearching[];
  readonly hotelSeachingCondition?: hotelSeachingCondition;
  readonly hotelManager?: hotel[];
  readonly typesRoom?: typeRooms[]
}
const initialState: constState = {
  hotelLocation: [],
  hotelSearchingByLocation: [],
  hotelSeachingCondition: {},
  hotelManager:[],
  typesRoom:[]
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
      return { ...state, hotelSeachingCondition: action.payload };
    case ConstActions.setHotelManager:
      return {...state, hotelManager: action.payload}
    case ConstActions.setTypesRoom:
      return {...state, typesRoom: action.payload}
    default:
      return state;
  }
};

export default constReducer;
