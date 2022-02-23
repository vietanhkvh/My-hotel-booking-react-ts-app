import { userInfoInterface, ActionInterface } from '../../const/interface';
import * as actionTypes from '../actions/actionTypes';
import { UserActions } from '../actions/actionTypes';
export interface userState {
  readonly userInfor?: null | undefined | userInfoInterface;
}
const initialState: userState = {
  userInfor: null,
};
const userReducer: (
  state: userState | undefined,
  action: ActionInterface
) => userState = (state: userState = initialState, action: ActionInterface) => {
  switch (action.type) {
    case UserActions.setUserInfor:
      return { ...state, userInfor: action.payload };
    case UserActions.removeUserInfor:
      return { ...state, userInfor: [] };
    default:
      return state;
  }
};

export default userReducer;
