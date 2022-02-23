import { combineReducers } from 'redux';
import articleReducer from '../reducer/articleReducer'
import TestReducer from './testReducer';
import userReducer from './userReducer';

// COMBINED REDUCERS
const reducers = {
  articles: articleReducer,
  tests: TestReducer,
  user: userReducer
};

export default combineReducers(reducers);
// export type RootState = ReturnType<typeof reducers>;