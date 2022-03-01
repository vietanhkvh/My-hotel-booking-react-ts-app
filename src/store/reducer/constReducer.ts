import { constInterface, hotelLocation, ActionInterface, hotelSearching } from '../../const/interface';
import { ConstActions } from '../actions/actionTypes';
export interface constState {
  readonly hotelLocation?: [] | hotelLocation[];
  readonly hotelSearchingByLocation?: [] | hotelSearching[]
}
const initialState: constState = {
    hotelLocation: [],
    hotelSearchingByLocation:[]
};
const constReducer: (
  state: constState | undefined,
  action: ActionInterface
) => constState = (state: constState = initialState, action: ActionInterface) => {
  switch (action.type) {
    case ConstActions.setHotelLocation:
      return { ...state, hotelLocation: action.payload };
    case ConstActions.setHotelSearching:
      return { ...state, hotelSearchingByLocation: action.payload };
    default:
      return state;
  }
};

export default constReducer;
