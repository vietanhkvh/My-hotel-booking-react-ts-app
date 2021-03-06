import { combineReducers } from 'redux';
import articleReducer from '../reducer/articleReducer'
import constReducer from './constReducer';
import TestReducer from './testReducer';
import userReducer from './userReducer';

// COMBINED REDUCERS
const reducers = {
  articles: articleReducer,
  tests: TestReducer,
  user: userReducer,
  const: constReducer
};

export default combineReducers(reducers);
// export type RootState = ReturnType<typeof reducers>;