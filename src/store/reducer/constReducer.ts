import {
  hotelLocation,
  ActionInterface,
  hotelSearching,
  hotelSeachingCondition,
  hotel,
  typeRooms,
  cartItem,
} from '../../const/interface';
import { ConstActions } from '../actions/actionTypes';
export interface constState {
  readonly hotelLocation?: [] | hotelLocation[];
  readonly hotelName?: [] | any[];
  readonly hotelSearchingByLocation?: [] | hotelSearching[];
  readonly hotelSeachingCondition?: hotelSeachingCondition;
  readonly hotelManager?: hotel[];
  readonly typesRoom?: typeRooms[];
  readonly carts?: cartItem[];
}
const initialState: constState = {
  hotelLocation: [],
  hotelName: [],
  hotelSearchingByLocation: [],
  hotelSeachingCondition: {},
  hotelManager: [],
  typesRoom: [],
  carts: [],
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
    case ConstActions.setHotelName:
      return { ...state, hotelName: action.payload };
    case ConstActions.setHotelSearching:
      return { ...state, hotelSearchingByLocation: action.payload };
    case ConstActions.setHotelSearchingCondition:
      return { ...state, hotelSeachingCondition: action.payload };
    case ConstActions.setHotelManager:
      return { ...state, hotelManager: action.payload };
    case ConstActions.setTypesRoom:
      return { ...state, typesRoom: action.payload };
    case ConstActions.setCart:
      return { ...state, carts: [...action.payload] };
    default:
      return state;
  }
};

export default constReducer;
